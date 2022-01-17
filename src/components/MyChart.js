import React, { useState, useEffect } from "react";
import AddItem from "./AddItem";
import { useSearchParams } from "react-router-dom";
import {
  Chart as ChartJS,
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import ChartComponent from "./Charts";
import { MdDelete } from "react-icons/md";
import "../index.css";
import { convertHexToRGBA, saveImage } from "../api/Utils";
import { BlockPicker } from "react-color";

const initialList = [];

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

ChartJS.register(ArcElement, Legend);

const MyChart = () => {
  const [searchParams] = useSearchParams();
  const [list, setList] = useState(initialList);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [color, setColor] = useState(
    "#" + String(Math.floor(Math.random() * 16777215).toString(16))
  );
  const [border, setBorder] = useState(false);
  const [opacity, setOpacity] = useState(100);
  const [legend, setLegend] = useState(false);
  const [chartType, setChartType] = useState("Pie");
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    setChartType(searchParams.get("type"));
  }, [searchParams]);

  useEffect(() => {
    list.map((item) => {
      item.colorOpacity = convertHexToRGBA(item.color, opacity);
    });
  }, [opacity, list]);

  const data = {
    labels: list.map((item) => item.name),
    datasets: [
      {
        label: list.map((item) => item.name),
        data: list.map((item) => item.value),
        backgroundColor: opacity
          ? list.map((item) => item.colorOpacity)
          : list.map((item) => item.color),
        borderColor: list.map((item) => item.color),
        borderWidth: border ? 2 : 0,
      },
    ],
  };

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeValue(event) {
    if (!Number(event.target.value)) return;
    setValue(event.target.value);
  }

  function handleChangeColor(event) {
    setColor(event.hex);
  }

  function handleAdd() {
    const newList = list.concat({
      name: name,
      color: color,
      colorOpacity: convertHexToRGBA(color, opacity),
      value: value,
    });

    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    setList(newList);
    setName("");
    setValue("");
    if (chartType !== "Line" && chartType !== "Radar")
      setColor("#" + randomColor);
  }

  const handleRemove = (index) => {
    setList([...list.slice(0, index), ...list.slice(index + 1)]);
  };

  return (
    <div className="grid w-full h-full px-4 pt-16 justify-items-center">
      <div className="p-8 bg-white border-2 rounded-lg shadow-lg">
        <div className="flex items-center justify-center pb-5 text-4xl font-black">
          {chartType}
        </div>
        {(chartType === "Line" || chartType === "Radar") && (
          <div className="flex justify-center pb-5">
            <div
              className="relative flex items-end justify-end w-12 h-12 col-span-2 border-2 border-gray-400 rounded-md shadow-xl "
              style={{ backgroundColor: color }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            >
              {showColorPicker && (
                <div className="absolute top-0 flex m-2 shadow-2xl">
                  <BlockPicker
                    color={color}
                    onChangeComplete={handleChangeColor}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        <ListOfValue
          list={list}
          removeElement={handleRemove}
          chartType={chartType}
        />
        <AddItem
          onAdd={handleAdd}
          name={name}
          onChangeName={handleChangeName}
          value={value}
          onChangeValue={handleChangeValue}
          color={color}
          onChangeColor={handleChangeColor}
          border={border}
          setBorder={setBorder}
          opacity={opacity}
          setOpacity={setOpacity}
          legend={legend}
          setLegend={setLegend}
          chartType={chartType}
          showColorPicker={showColorPicker}
          setShowColorPicker={setShowColorPicker}
        />
        <div className="flex justify-center w-full pt-4 sm:justify-end">
          <button
            className="inline-flex items-center px-4 py-2 font-bold duration-500 transform bg-gray-300 rounded hover:bg-blue-600 hover:text-white "
            onClick={() => saveImage("ciao")}
          >
            <svg
              className="w-4 h-4 mr-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Download</span>
          </button>
        </div>
      </div>
      {list.length > 0 && (
      <div className="container w-full py-10 md:w-1/2">
        <ChartComponent
          type={chartType}
          data={data}
          id={"ciao"}
          legend={legend}
          color={convertHexToRGBA(color, opacity)}
        />
      </div>)}
    </div>
  );
};

const ListOfValue = ({ list, removeElement, chartType }) => {
  return (
    <div>
      <div className={
            chartType !== "Line" || chartType !== "Radar" ? "grid justify-center grid-cols-11 gap-2 " : "grid justify-center grid-cols-12 gap-5 "} >
        {chartType !== "Line" && chartType !== "Radar" && (
          <div className="col-span-2 font-bold">Color</div>
        )}
        <div
          className={
            chartType !== "Line" || chartType !== "Radar"
              ? "col-span-4 font-bold"
              : "col-span-5 font-bold"
          }
        >
          Name
        </div>
        <div
          className={
            chartType !== "Line" || chartType !== "Radar"
              ? "col-span-3 font-bold"
              : "col-span-5 font-bold"
          }
        >
          Value
        </div>
        <div className="col-span-1 font-bold">Delete</div>
      </div>
      {list.map((item, index) => {
        return (
          <div key={index} className="grid grid-cols-11 gap-5 pt-5 ">
            {chartType !== "Line" && chartType !== "Radar" && (
              <div
                className="relative flex items-end justify-end h-full col-span-2 border-2 border-gray-400 rounded-md shadow-xl w-7"
                style={{ backgroundColor: item.color }}
              ></div>
            )}
            <div className={
            chartType !== "Line" || chartType !== "Radar" ? "w-full col-span-4 h-7" : "w-full col-span-5 h-7"}>
              {item.name.length >= 30
                ? item.name.substring(0, 25) + "..."
                : item.name}
            </div>
            <div className={
            chartType !== "Line" || chartType !== "Radar" ? "w-full col-span-3" : "w-full col-span-5 "}>{item.value}</div>
            <div className="col-span-1">
              <MdDelete
                className="duration-500 transform hover:scale-125 hover:text-red-500"
                size="24"
                onClick={() => removeElement(index)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyChart;
