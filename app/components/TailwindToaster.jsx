import { Toaster } from "react-hot-toast";

const TailwindToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: "transform p-4 flex bg-white rounded shadow-lg",
        duration: 5000,
      }}
    />
  );
};

export default TailwindToaster;
