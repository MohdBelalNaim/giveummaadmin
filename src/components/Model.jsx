import { FaTimes } from "react-icons/fa";
import Button from "./Button";

const Model = ({ children, controller, title, btnText, btnOnClick }) => {
  const [visible, toggleModel] = controller;
  return (
    <div
      className={`grid fixed inset-0 z-50 glass ${
        !visible && "hidden"
      } place-items-center`}
    >
      <div className="bg-white w-[min(500px,95%)] rounded-lg overflow-hidden animate__animated animate__bounceIn">
        <div className="p-6 flex border-b">
          <div className="flex text-xl gap-3 items-center mr-auto">{title}</div>
          <FaTimes onClick={toggleModel} className="text-xl cursor-pointer" />
        </div>
        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
        {btnText && (
          <div className="p-4 text-center border-t">
            <Button onClick={btnOnClick} type="primary">
              {btnText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Model;
