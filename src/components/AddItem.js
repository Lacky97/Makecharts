
import { BlockPicker } from "react-color";
import React, { useState } from "react";

const AddItem = ({
    name,
    value,
    onChangeName,
    onChangeValue,
    onAdd,
    color,
    onChangeColor,
    border,
    setBorder,
    opacity,
    setOpacity,
    legend,
    setLegend,
    chartType,
    showColorPicker,
    setShowColorPicker
  }) => {
    const [showAdvanced, setShowAdvanced] = useState(false);
  
    return (
      <div className="pt-5 ">
        <div className={
            chartType !== "Line" || chartType !== "Radar" ? "grid grid-cols-11 gap-2 " : "grid grid-cols-12 gap-5 "}>
        {chartType !== 'Line' && chartType !== 'Radar' && <div
            className="relative flex items-end justify-end col-span-2 border-2 border-gray-400 rounded-md shadow-xl w-7 h-7"
            style={{ backgroundColor: color }}
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            {showColorPicker && (
              <div className="absolute flex items-center justify-center object-cover shadow-2xl top-full ">
                <BlockPicker color={color} onChangeComplete={onChangeColor} />
              </div>
            )}
          </div>}
          <input
            type="text"
            value={name}
            onChange={onChangeName}
            className={
              chartType !== "Line" || chartType !== "Radar" ? "w-full col-span-4 border-gray-300 rounded-md shadow-sm h-7 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" : "w-full col-span-5 border-gray-300 rounded-md shadow-sm h-7 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"}
            placeholder=""
          ></input>
          <input
            type="text"
            value={value}
            onChange={onChangeValue}
            className={
              chartType !== "Line" || chartType !== "Radar" ? "w-full col-span-3 border-gray-300 rounded-md shadow-sm h-7 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" : "w-full col-span-3 border-gray-300 rounded-md shadow-sm h-7 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"}
            placeholder=""
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                onAdd();
                e.preventDefault();
              }
            }}
          ></input>
          <div className="col-span-1"></div>
        </div>
        <div className="flex items-center justify-center w-full col-start-4 pt-4">
          <button type="button" onClick={onAdd} className="text-gray-400 ">
            + Add Element
          </button>
        </div>
        <div className="flex items-center justify-center w-full col-start-4 pt-4">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-gray-400 "
          >
            {showAdvanced ? "-" : "+"} Show Advanced
          </button>
        </div>
        {showAdvanced && (
          <AdvancedOption
            setBorder={setBorder}
            border={border}
            setOpacity={setOpacity}
            opacity={opacity}
            legend={legend}
            setLegend={setLegend}
          />
        )}
      </div>
    );
  };



const AdvancedOption = ({
    setBorder,
    border,
    setOpacity,
    opacity,
    legend,
    setLegend,
  }) => {
    return (
      <div>
        <div className="flex items-center justify-center p-5 form-check">
          <input
            className="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm appearance-none cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            onClick={() => {
              setBorder(!border);
            }}
          />
          <label
            className="inline-block text-gray-800 form-check-label "
            htmlFor="flexCheckChecked"
          >
            Border
          </label>
        </div>
        <div className="flex items-center justify-center form-check">
          <input
            className="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm appearance-none cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            onClick={() => {
              setLegend(!legend);
            }}
          />
          <label
            className="inline-block text-gray-800 form-check-label"
            htmlFor="flexCheckChecked"
          >
            Legend
          </label>
        </div>
        <div className="flex items-center justify-center p-5 grow form-check">
          <input
            className=""
            name="volume"
            type="range"
            value={opacity}
            min="10" max="100"
            id="flexCheckChecked"
            onChange={(event) => setOpacity(event.target.value)}
          />
          <label
            className="inline-block px-2 text-gray-800 form-check-label"
            htmlFor="volume"
          >
            Opacity
          </label>
        </div>
      </div>
    );
  };

export default AddItem;