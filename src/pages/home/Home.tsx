import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen p-10 flex flex-col  bg-black justify-center items-center ">
      <h1 className="text-white mb-5 text-3xl">welcome to learn React Query</h1>
      <div className="p-5  flex flex-wrap gap-3  border">
        <Link
          to={"/"}
          className="border text-2xl text-white hover:text-black  hover:bg-white p-2 px-4"
        >
          Home
        </Link>


        <Link
          to={"/product1"}
          className="border text-2xl text-white hover:text-black  hover:bg-white p-2 px-4"
        >
          Product1
        </Link>
      </div>
    </div>
  );
};

export default Home;
