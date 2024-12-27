"use client";

import React, { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineLockOpen, MdOutlineLogin } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { IoMdVideocam } from "react-icons/io";
import CustomButton from "./CustomButton";
import mockData from "../lib/mock-data.json";
import { useModal } from "./ModalProvider";
import { limitText } from "../lib/utilFunctions";

const SearchInput = ({ isLoggedIn = false }) => {
  const { openModal } = useModal();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const searchInputRef = useRef(null);

  // Filter scripts based on the search query
  const filteredScripts = mockData.scripts.filter((script) =>
    script.title.toLowerCase().includes(search.toLowerCase())
  );

  // Close dropdown when the user clicks outside
  const closeDropdownOnOutsideClick = (event) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdownOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", closeDropdownOnOutsideClick);
    };
  }, []);

  // Handle search input change
  const handleInputChange = (e) => {
    setSearch(e.target.value);
    if (!open) setOpen(true); // Open dropdown when the user is typing
  };

  const handleItemClick = (title) => {
    setSearch(title);
    setOpen(false);
  };

  const handleLoginClick = () => {
    console.log("Login clicked");
  };

  const handleDemoClick = (demoVideoUrl) => {
    if (demoVideoUrl) {
      openModal(demoVideoUrl);
    } else {
      console.error("Demo video URL is missing");
    }
  };

  const handleSearchButtonClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative" ref={searchInputRef}>
      {/* Search Input */}
      <input
        type="search"
        placeholder="Search Here..."
        className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[0.5px] focus:ring-black focus:border-black"
        onClick={() => setOpen(true)} // Open dropdown on input click
        value={search}
        onChange={handleInputChange}
        aria-label="Search"
      />
      {/* Search Button */}
      <button
        className="absolute inset-y-0 right-0 flex items-center px-4 text-white bg-black rounded-r-md hover:bg-gray-900 focus:outline-none focus:ring-[0.5px] focus:ring-black focus:border-black"
        onClick={handleSearchButtonClick} // Toggle dropdown
        aria-label="Search Button"
      >
        <IoSearch />
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          className="absolute z-10 w-full mt-2 bg-white border rounded shadow-md max-h-96 overflow-y-auto"
          role="listbox"
        >
          {filteredScripts.length > 0 ? (
            filteredScripts.map((script, index) => (
              <li
                className="w-full text-gray-700 px-3 md:px-6 py-5 hover:bg-gray-100 cursor-pointer border-b"
                key={index}
                onClick={() => handleItemClick(script.title)}
                role="option"
                aria-selected={search === script.title}
              >
                <div className="flex items-center mx-auto ">
                  <div className="sm:w-36 w-24 md:aspect-video aspect-square sm:mr-10 mr-4 inline-flex items-center justify-center rounded-sm bg-gray-100 flex-shrink-0">
                    <img
                      src={script.imageUrl || "https://via.placeholder.com/150"}
                      alt={script.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-grow text-left sm:mt-0">
                    <h2 className="text-black md:text-lg  font-semibold">
                      {script.title}
                    </h2>
                    <p className="text-sm  mb-2">
                      {limitText(script.description, 100)}
                    </p>
                    {/* Buttons */}
                    <div className="flex items-center gap-2 mt-2">
                      {script.bought ? (
                        isLoggedIn ? (
                          <CustomButton
                            variant="primary"
                            size="medium"
                            icon={<MdOutlineLockOpen className="text-white" />}
                          >
                            Open
                          </CustomButton>
                        ) : (
                          <CustomButton
                            variant="primary"
                            size="medium"
                            onClick={handleLoginClick}
                            icon={<MdOutlineLogin className="text-white" />}
                          >
                            Login
                          </CustomButton>
                        )
                      ) : (
                        <CustomButton
                          variant="warning"
                          size="medium"
                          icon={<RiLock2Fill className="text-white" />}
                        >
                          Unlock
                        </CustomButton>
                      )}
                      <CustomButton
                        variant="outline"
                        size="medium"
                        onClick={() => handleDemoClick(script.demoVideoUrl)}
                        icon={<IoMdVideocam />}
                      >
                        Demo
                      </CustomButton>
                    </div>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="w-full text-gray-700 p-2 text-center">
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
