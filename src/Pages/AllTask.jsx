import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Card from "../Component/Card";
import InputData from "../Component/InputData";

export default function AllTask() {
  const [inputdev, setInputdev] = useState("hidden");
  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => setInputdev("fixed")}>
            <IoIosAddCircle className="text-4xl text-gray-400 hover:text-gray-500 cursor-pointer" />
          </button>
        </div>
        <Card setInputdev={setInputdev}></Card>
      </div>
      <InputData inputdev={inputdev} setInputdev={setInputdev}></InputData>
    </>
  );
}
