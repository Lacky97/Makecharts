import type from "../dati/chartsType";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { FiPieChart } from "react-icons/fi";

const Navbar = ({ toggle, isOpen }) => {
  const [hover, setHover] = useState(false);
  const [elem, setElem] = useState(4);

  return (
    <header className="flex flex-wrap items-center px-6 pt-6 bg-white lg:px-96 ">
      <div className="flex items-center justify-between flex-1">
        <span className="flex">
          <Link to="/">
            <FiPieChart size='32'/>
          </Link>
          <Link to="/">
            <label className="flex items-center justify-center px-4 pt-2 font-bold special_text">
              MakeCharts
            </label>
          </Link>
        </span>
      </div>
      <label htmlFor="menu-toggle" className="block pointer-cursor lg:hidden">
        <svg
          className="text-gray-900 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </label>
      <input className="hidden" type="checkbox" id="menu-toggle" />

      <div
        className="hidden w-full lg:flex lg:items-center lg:w-auto "
        id="menu"
      >
        <nav>
          <div className="flex justify-around w-full md:mt-10 lg:mt-5 lg:w-1/2 lg:justify-between">
            {type.map((item, index) => {
              return (
                <ul className="items-center justify-between px-2 pt-4 text-base text-gray-700 slide lg:flex lg:pt-0 ">
                  <li>
                    <Link
                      key={index}
                      onMouseEnter={() => {
                        setHover(true);
                        setElem(index);
                      }}
                      onMouseLeave={() => {
                        setHover(false);
                      }}
                      to={`/chart?type=${item.name}`}
                    >
                      <div
                        className={
                          hover && elem === index
                            ? "flex justify-center lg:transition lg:fade-in lg:duration-500 lg:transform lg:scale-110 lg:-translate-y-2"
                            : "flex justify-center lg:transition lg:ease-in-out lg:duration-500 "
                        }
                      >
                        <item.Icon size={32} />
                      </div>
                      <p
                        className={
                          hover && elem === index
                            ? "flex justify-center lg:visible lg:-translate-y-3 lg:font-bold lg:transition lg:duration-500 lg:ease-in-out"
                            : "flex justify-center lg:invisible lg-translate-y-3 font-bold lg:transition lg:ease-in lg:duration-500  lg:transform"
                        }
                      >
                        {item.name}
                      </p>
                    </Link>
                  </li>
                </ul>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

/* 


    <div className="absolute flex w-full p-2 px-10 md:px-32 xl:px-96">
      <Link to="/" className="flex">
        <img
          src={logo}
          alt="logo"
          width="40"
          height="10"
          className="absolute flex items-center justify-center pt-4"
        />
        <h1 className="flex items-center justify-center px-12 font-bold mt-7 lg:mt-0 special_text">
          MakeCharts
        </h1>
      </Link>
      <label htmlFor="menu-toggle" className="flex justify-end mt-7 pointer-cursor lg:hidden">
          <svg
            className="text-gray-900 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>

      <div className="flex justify-end w-screen mr-5">
   
        <div
          className="hidden w-full lg:flex lg:items-center lg:w-auto "
          id="menu"
        >
          <nav>
            <div className="flex justify-between w-1/2 mt-5">
              {type.map((item, index) => {
                return (
                  <ul className="items-center justify-between pt-4 text-base text-gray-700 slide lg:flex lg:pt-0 ">
                    <li>
                      <Link
                        key={index}
                        onMouseEnter={() => {
                          setHover(true);
                          setElem(index);
                        }}
                        onMouseLeave={() => {
                          setHover(false);
                        }}
                        to={`/chart?type=${item.name}`}
                      >
                        <div
                          className={
                            hover && elem === index
                              ? "flex justify-center transition fade-in duration-500 transform scale-110 -translate-y-2"
                              : "flex justify-center transition ease-in-out duration-500 "
                          }
                        >
                          <item.Icon size={32} />
                        </div>
                        <p
                          className={
                            hover && elem === index
                              ? "flex justify-center visible -translate-y-3 font-bold transition duration-500 ease-in-out"
                              : "flex justify-center invisible -translate-y-3 font-bold transition ease-in duration-500  transform"
                          }
                        >
                          {item.name}
                        </p>
                      </Link>
                    </li>
                  </ul>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>


    */
