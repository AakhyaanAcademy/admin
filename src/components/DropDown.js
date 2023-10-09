import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

function DropDown({ list, onSelectHandler }) {
  const [showDropDown, setShowDropDown] = useState(false);

  //   const courses = [
  //     "NEB preparation",
  //     "IOE preparation",
  //     "Bridge Course",
  //     "NEB preparation",
  //     "IOE preparation",
  //     "Bridge Course",
  //     "NEB preparation",
  //     "IOE preparation",
  //     "Bridge Course",
  //     "NEB preparation",
  //     "IOE preparation",
  //     "Bridge Course",
  //   ];

  const onClickHandler = (e) => {
    e.preventDefault();

    setShowDropDown(!showDropDown);
  };
  return (
    <>
      {/* Dropdown Button for selecting courses */}
      <div
        onClick={onClickHandler}
        className="w-[50%] flex items-center justify-center bg-blue-500 hover:bg-blue-700 rounded-md hover:cursor-pointer">
        <button className="flex items-center gap-2 font-sans text-md md:text-lg hover:translate-y-0.5 transition-all text-white py-2 px-1 md:px-4 focus:outline-none focus:shadow-outline">
          Select a Course
        </button>
        <IoChevronDown
          className="hover:translate-y-0.5"
          color="white"
          size={30}
        />
      </div>

      {/* Main dropdown with toggling functionality */}

      <div
        className={`${
          !showDropDown
            ? "hidden"
            : "flex flex-col items-center justify-center gap-1"
        } w-full mt-2 select-none`}>
        {list?.map((course, index) => (
          <div
            key={index}
            onClick={onSelectHandler}
            className="border w-[50%] flex items-center justify-center bg-red-300 hover:bg-red-400 rounded-md hover:cursor-pointer md:p-2">
            <span className="text-sans text-lg text-white hover:text-black">
              {course.title}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default DropDown;
