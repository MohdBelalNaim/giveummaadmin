import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  MDXEditor,
  UndoRedo,
  headingsPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import React, { useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "@mdxeditor/editor/style.css";
import { FaTimes } from "react-icons/fa";
import { database, storage } from "../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import Loader from "../components/Loader"
const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [story, setStory] = useState("");
  const [image, setImage] = useState(null);
  const [loading,setLoading] = useState(false)
  const mdxRef = useRef();

  function handleMdx() {
    setStory(mdxRef.current.getMarkdown());
  }
  async function savePhoto() {
    const storageRef = ref(storage, `blogs/${image.name}`);
    try {
      const uploadTask = await uploadBytes(storageRef, image);
      const url = getDownloadURL(storageRef);
      return url;
    } catch (e) {
      console.log(e);
      return "";
    }
  }

  async function saveBlog() {
    if (title == "" || category == "" || story == "" || image == "") {
      alert("All fields are required");
    } else {
      setLoading(true)
      let url = await savePhoto();
      const data = {
        title,
        category,
        story,
        image: url,
        date: new Date(),
      };
      const blogRef = collection(database, "blogs");
      try {
        await addDoc(blogRef, data);
        alert("Blog saved");
        setLoading(false)
      } catch (e) {
        console.log(e);
        alert("Something went wrong");
        setLoading(false);

      }
    }
  }

  return (
    
    <div className="px-6">
      {
        loading && <Loader/>
      }
      <div className="text-xl font-bold">Create a blog </div>
      <div className="w-[min(480px,96%)]">
        <input
          type="text"
          className="border w-full p-2 rounded mt-2"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="border w-full p-2 rounded mt-2"
          placeholder="Blog category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {image ? (
          <div className="relative">
            <div className="absolute top-2 p-1 left-2 bg-gray-100 rounded-full">
              <FaTimes
                className="text-xs cursor-pointer"
                onClick={() => setImage("")}
              />
            </div>
            <img
              src={URL.createObjectURL(image)}
              className="w-full h-[300px] object-cover rounded-md mt-2"
              alt=""
            />
          </div>
        ) : (
          <div class="flex items-center justify-center w-full mt-2">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                class="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>
        )}

        <div className="h-[300px] bg-white rounded mt-2">
          <MDXEditor
            ref={mdxRef}
            onChange={handleMdx}
            markdown="Write blog story here"
            plugins={[
              headingsPlugin,
              toolbarPlugin({
                toolbarContents: () => (
                  <>
                    <BlockTypeSelect />
                    <UndoRedo />
                    <BoldItalicUnderlineToggles />
                  </>
                ),
              }),
            ]}
          />
        </div>
        <button
          onClick={saveBlog}
          className="mb-12 mt-4 primary px-4 py-1.5 rounded-md"
        >
          Create blog
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
