import { useState } from "react";

export default function usePasswordVisiblity() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const handlePasswordVisibility = (e) => {
    e.preventDefault();
    setIsPasswordVisible((cond) => !cond);
  };

  return { isPasswordVisible, handlePasswordVisibility };
}
