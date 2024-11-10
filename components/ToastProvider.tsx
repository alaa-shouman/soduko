import React, { createContext, useContext, useState } from "react";
import * as Toast from "@radix-ui/react-toast";

interface ToastContextType {
  showToast: (message: string, variant?: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState<"success" | "error">("success");

  const showToast = (
    msg: string,
    variantType: "success" | "error" = "success"
  ) => {
    setMessage(msg);
    setVariant(variantType);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast.Provider>
        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className={`fixed bottom-5 right-5 p-4 rounded-md shadow-lg ${
            variant === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          <Toast.Title>{message}</Toast.Title>
          <Toast.Close />
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0 m-4 z-50" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};
