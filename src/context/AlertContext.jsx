import { createContext, useContext, useEffect, useState } from "react";

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    type: "",
    duration: 3000,
  });

  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
      }, alert.duration);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const showAlert = (msg, type, duration = 3000) => {
    setAlert({
      visible: true,
      message: msg,
      type: type,
      duration: duration,
    });
  };

  const hideAlert = () => {
    setAlert({
      visible: false,
      message: "",
      type: "",
      duration: 3000,
    });
  };

  return (
    <AlertContext.Provider value={{ alert, setAlert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const ctx = useContext(AlertContext);

  if (!ctx) {
    throw new Error("useAlert must be used with AlertProvider");
  }

  return ctx;
}
