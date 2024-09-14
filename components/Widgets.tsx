import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";

const Widgets = () => {
  return (
    <div
      className="p-3 hidden lg:flex flex-col space-y-4 w-[400px]"
    >
      <div
        className="bg-[#EFF3F4] text-[#89959D] flex h-[44px] items-center space-x-3 rounded-full pl-5"
      >
        <MagnifyingGlassIcon className="w-[20px] h-[20px]" />
        <input
          type="text"
          className="bg-transparent outline-none"
          placeholder="Search Busy Bee"
        />
      </div>
      <div
        className="bg-[#EFF3F4] rounded-xl p-3"
      >
        <h1 className="text-xl font-bold mb-2">What's Happening?</h1>
        
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={index}
            className="flex flex-col py-3 justify-between text-[#536471] space-y-0.5"
          >
            <div className="flex justify-between">
              <span>Trending in United Arab Emirates</span>
              <EllipsisHorizontalIcon className="w-[20px]" />
            </div>
            
            <span className="font-bold text-sm">#Munting</span>
            <span className="text-[#536471] text-xs">240k Bumbles</span>
          </div>
        ))}
      </div>
      <div
        className="bg-[#EFF3F4] rounded-xl p-3"
      >
        <h1 className="text-xl font-bold mb-2">Who to follow?</h1>
        <div className="flex  justify-between items-center py-3">
          <div className="flex space-x-3 items-center">
            <Image
              src={"/assets/elon.jpg"}
              width={56}
              height={56}
              alt="Profile picture"
              className="rounded-full w-15 h-14"
            />
            <div className="flex flex-col text-sm">
              <span className="font-bold block">Mahran Hassan</span>
              <span className="text-gray-500">@hoorah</span>
            </div>
          </div>
          <button className="bg-[#0F1419] text-white rounded-full  w-[72px] h-[40px]">
            Follow
          </button>
        </div>
        <div className="flex  justify-between items-center py-3">
          <div className="flex space-x-3 items-center">
            <Image
              src={"/assets/elon.jpg"}
              width={56}
              height={56}
              alt="Profile picture"
              className="rounded-full w-15 h-14"
            />
            <div className="flex flex-col text-sm">
              <span className="font-bold block">Mahran Hassan</span>
              <span className="text-gray-500">@hoorah</span>
            </div>
          </div>
          <button className="bg-[#0F1419] text-white rounded-full  w-[72px] h-[40px]">
            Follow
          </button>
        </div>
        <div className="flex  justify-between items-center py-3">
          <div className="flex space-x-3 items-center">
            <Image
              src={"/assets/elon.jpg"}
              width={56}
              height={56}
              alt="Profile picture"
              className="rounded-full w-15 h-14"
            />
            <div className="flex flex-col text-sm">
              <span className="font-bold block">Mahran Hassan</span>
              <span className="text-gray-500">@hoorah</span>
            </div>
          </div>
          <button className="bg-[#0F1419] text-white rounded-full  w-[72px] h-[40px]">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Widgets;