import React from "react";
import Navbar from "./Navbar";
import pro from "../assets/proimage.png";

import axios from "axios";




function Hotel_list() {
  return (
    <div>
      <Navbar />

      {/* search feature */}
      <div className="relative bg-white rounded-lg mt-16 py-5 h-18 flex flex-row justify-around">
        <div className="flex gap-24">
          <form className="max-w-sm">
            <label htmlFor="underline_select" className="sr-only">
              Underline select
            </label>
            <select
              id="underline_select"
              className="block py-2 w-full text-sm text-black bg-transparent "
            >
              <option selected>Location</option>
            </select>
            <p className="text-xs pl-1 font-thin">Where are you going</p>
          </form>

          <form className=" max-w-sm">
            <label htmlFor="underline_select" className="sr-only">
              Underline select
            </label>
            <select
              id="underline_select"
              className="block py-2 w-full text-sm text-black bg-transparent"
            >
              <option selected>Month</option>
            </select>
            <p
              className="text-xs pl-1 font-thin
              "
            >
              Expected month to visit
            </p>
          </form>
        </div>
        <button
          type="button"
          className="py-2.5 px-10 me-2 mb-2 text-sm font-medium text-white  bg-yellow-500 hover:bg-slate-500 rounded-lg border border-gray-200 "
        >
          Search
        </button>
      </div>

      {/* Search feature ---- list hotel */}

      <div className="grid grid-rows-1 sm:grid-rows-2 lg:grid-rows-3 gap-4 px-20 py-8 bg-red-50">
        <div className="grid grid-cols-3 bg-white">
          <img src={pro} alt="" className="h-32 col-span-1" />
          <div className="col-span-2 px-6">
            <h1 className="py-1 font-semibold">Bosphorus Waqf</h1>
            <p>Madinah</p>
            <div className="grid grid-cols-3 gap-2 pt-4">
              <div className="grid grid-cols-2">
                <h1 className="bg-slate-100">
                  Double Suit <br />
                  <span className="">Starting from</span>
                </h1>
                <h1 className="pt-6 bg-slate-100">$20/night</h1>
              </div>

              <div className="grid grid-cols-2">
                <h1 className="bg-slate-100">
                  Triple Suit <br />
                  <span className="">Starting from</span>
                </h1>
                <h1 className="pt-6 bg-slate-100">$40/night</h1>
              </div>

              <div className="grid grid-cols-2">
                <h1 className="bg-slate-100">
                  Quad Suit <br />
                  <span className="">Starting from</span>
                </h1>
                <h1 className="pt-6 bg-slate-100">$60/night</h1>
              </div>
            </div>

            <div className="grid grid-cols-3 pt-8">
              <p className="text-xs">
                Prices are showing in the month of December
              </p>
              <button type="button">View more </button>
              <button type="button">Enquire to book now</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 bg-white">
          <img src={pro} alt="" className="h-32 col-span-1" />
          <div className="col-span-2 px-6">
            <h1 className="py-1 font-semibold">Bosphorus Waqf</h1>
            <p>Madinah</p>
            <div className="grid grid-cols-3 gap-2 pt-4">
              <div className="grid grid-cols-2">
                <h1 className="bg-slate-100">
                  Double Suit <br />
                  <span className="">Starting from</span>
                </h1>
                <h1 className="pt-6 bg-slate-100">$20/night</h1>
              </div>

              <div className="grid grid-cols-2">
                <h1 className="bg-slate-100">
                  Triple Suit <br />
                  <span className="">Starting from</span>
                </h1>
                <h1 className="pt-6 bg-slate-100">$40/night</h1>
              </div>

              <div className="grid grid-cols-2">
                <h1 className="bg-slate-100">
                  Quad Suit <br />
                  <span className="">Starting from</span>
                </h1>
                <h1 className="pt-6 bg-slate-100">$60/night</h1>
              </div>
            </div>

            <div className="grid grid-cols-3 pt-8">
              <p className="text-xs">
                Prices are showing in the month of December
              </p>
              <button type="button">View more </button>
              <button type="button">Enquire to book now</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 bg-white">
          <img src={pro} alt="" className="h-32 col-span-1" />
          <div className="col-span-2 px-6">
            <h1 className="py-1 font-semibold">Bosphorus Waqf</h1>
            <p>Madinah</p>
            <div className="grid grid-cols-3 gap-2 pt-4">
              <div className="grid grid-cols-2">
                <h1 className="bg-slate-100">
                  Double Suit <br />
                  <span className="">Starting from</span>
                </h1>
                <h1 className="pt-6 bg-slate-100">$20/night</h1>
              </div>

              <div className="grid grid-cols-2">
                <h1 className="bg-slate-100">
                  Triple Suit <br />
                  <span className="">Starting from</span>
                </h1>
                <h1 className="pt-6 bg-slate-100">$40/night</h1>
              </div>

              <div className="grid grid-cols-2">
                <h1 className="bg-slate-100">
                  Quad Suit <br />
                  <span className="">Starting from</span>
                </h1>
                <h1 className="pt-6 bg-slate-100">$60/night</h1>
              </div>
            </div>

            <div className="grid grid-cols-3 pt-8">
              <p className="text-xs">
                Prices are showing in the month of December
              </p>
              <button type="button">View more </button>
              <button type="button">Enquire to book now</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 bg-white">
          <img src={pro} alt="" className="h-32 col-span-1" />
          <div className="col-span-2 px-6">
            <h1 className="py-1 font-semibold">Bosphorus Waqf</h1>
            <p>Madinah</p>
            <div className="grid grid-cols-3 gap-2 pt-4">
              <div className="grid grid-cols-2">
                <h1 className="bg-slate-100">
                  Double Suit <br />
                  <span className="">Starting from</span>
                </h1>
                <h1 className="pt-6 bg-slate-100">$20/night</h1>
              </div>

              <div className="grid grid-cols-2">
                <h1 className="bg-slate-100">
                  Triple Suit <br />
                  <span className="">Starting from</span>
                </h1>
                <h1 className="pt-6 bg-slate-100">$40/night</h1>
              </div>

              <div className="grid grid-cols-2">
                <h1 className="bg-slate-100">
                  Quad Suit <br />
                  <span className="">Starting from</span>
                </h1>
                <h1 className="pt-6 bg-slate-100">$60/night</h1>
              </div>
            </div>

            <div className="grid grid-cols-3 pt-8">
              <p className="text-xs">
                Prices are showing in the month of December
              </p>
              <button type="button">View more </button>
              <button type="button">Enquire to book now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotel_list;
