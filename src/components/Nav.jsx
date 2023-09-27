import React from "react";
import { AiOutlineArrowLeft } from 'react-icons/ai';


const Nav = () => {
  return (
      <div className=" flex items-center m-3">
        <AiOutlineArrowLeft className="text-2xl mx-4"/>
        <h1 className="text-2xl font-inter font-semibold leading-[49px] break-words">Submit form</h1>
      </div>
  );
};

export default Nav;
