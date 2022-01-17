import Card from "./Card";
import React from "react";
import type from "../dati/chartsType";

function Home() {
  return (
    <div className="grid w-screen pt-5 md:content-center md:pt-16 justify-items-center">
      <div className="p-5">
        <div className="bg-yellow-500 rounded-xl">
          <h1 className="p-5 text-2xl font-bold uppercase sm:text-3xl md:text-4xl xl:text-7xl bold decoration-dashed special_text ">
            Create a chart
          </h1>
        </div>
      </div>
      <div className="grid items-center justify-center grid-cols-2 gap-5 p-5 sm:grid-cols-3">
        {type.map((item, index) => {
          return <Card item={item} index={index} />;
        })}
      </div>
    </div>
  );
}

export default Home;
