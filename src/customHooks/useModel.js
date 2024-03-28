import { useState } from "react";

const useModel = () => {
  const [visible, setVisible] = useState(false);

  const toggleModel = () => {
    setVisible((current) => !current);
    document.body.classList.toggle("overflow-hidden");
  };

  return [visible, toggleModel];
};

export default useModel;
