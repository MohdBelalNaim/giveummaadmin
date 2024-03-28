import { doc, updateDoc } from "firebase/firestore";
import Input from "./Input";
import Model from "./Model";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import Avatar from "./Avatar";
import { database } from "../utils/firebase";
import Button from "./Button";

const UpdateFormModel = ({ data, controller, updateProfile, name }) => {
  const [state, toggleForm] = controller;
  const { register, setValue, handleSubmit } = useForm();
  const [isUpdating, setIsUpdating] = useState(false);

  const image = useRef();
  const email = data.find((d) => d.name == "email").data;
  const photo = data.find((d) => d.name == "photo").data;
  console.log(name);
  const updateProfilePic = (formData) => {
    formData.photo = photo;
    setIsUpdating(true);
    if (image.current) {
      const storageRef = ref(
        getStorage(),
        "/campaign-images/" + image.current.name
      );
      uploadBytes(storageRef, image.current).then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((downloadURL) => {
            formData.photo = downloadURL;
            image.current = "";
          })
          .then(() => updateData(formData));
      });
    } else {
      updateData(formData);
    }
  };

  function updateData(formData) {
    updateDoc(doc(database, "users", localStorage.getItem("user")), formData)
      .then((success) => {
        toast.success("Data updated successfully!");
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsUpdating(false);
        updateProfile();
        toggleForm();
      });
  }

  data = data.filter((d) => d.name != "email");

  const profilePreview = (e) => {
    const file = e.target.files[0];
    image.current = file;
    document.querySelector("#preview").src = URL.createObjectURL(file);
  };

  return (
    <Model title="Update details" controller={controller}>
      <form className="p-4 space-y-4" onSubmit={handleSubmit(updateProfilePic)}>
        {photo ? (
          <img
            id="preview"
            src={photo}
            className="w-40 aspect-square rounded-full mx-auto object-cover"
            alt="profile pic"
          />
        ) : (
          <div className="flex justify-center py-2">
            <Avatar name={name} size="xl" />
          </div>
        )}

        <input
          type="file"
          {...register("photo")}
          onChange={profilePreview}
          className="p-3 border w-full rounded capitalize"
        />
        {data.map((input, index) => {
          if (
            input.name == "email" ||
            input.name == "photo" ||
            input.name == "aadhar"
          )
            return;

          const label = input.label.split(" ");
          label.shift();

          if (input.data) setValue(input.name, input.data);

          return (
            <Input
              key={index}
              name={input.name}
              label={label.join(" ")}
              register={register}
            />
          );
        })}
        <Button type="primary" submit>
          {isUpdating ? "Updating...." : "Update"}
        </Button>
      </form>
      <Toaster />
    </Model>
  );
};

export default UpdateFormModel;
