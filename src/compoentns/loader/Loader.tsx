import React from "react";
import "./Loader.css";
const Loader: React.FC = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-white">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
