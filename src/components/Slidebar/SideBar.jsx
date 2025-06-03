import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideSideBar } from './SideBarSlice';
import racchette from "../../../public/assets/racchetta.webp";
import maglia from "../../../public/assets/maglia.jpg";
import scarpa from "../../../public/assets/scarpa.jpg";
import borsone from "../../../public/assets/borsone.jpg";


function SideBar() {
    const dispatch = useDispatch();
    const slide = useSelector((state)=> state.sidebar.visibility)
return (
    <>
        {slide === false && null}
        {slide === true && (
                   <>
                   <button onClick={()=> dispatch(hideSideBar())}><svg
                        className="swap-on fill-current"
                         xmlns="http://www.w3.org/2000/svg"
                          width="32"
                           height="32"
                         viewBox="0 0 512 512">
                         <polygon
                            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                        </svg>
                        </button>
                        <div className='w-full text-black'><button className='flex justify-center w-11/12 mx-auto bg-white'><div></div> Accedi </button></div>
                  <div className='flex flex-wrap gap-5 mt-5 min-[471px]:mx-20 min-[632px]:mx-28 sm:mx-auto justify-center'>
                    <div className="card bg-base-100 w-36 sm:w-40 md:w-40 lg:w-52 xl:w-72 hover:scale-110 hover:opacity-75 transition-transform duration-300 ease-in-out shadow-sm cursor-pointer">
                      <div className="card-body p-0">
                        <h2 className="card-title p-2 border-2 border-b-0 rounded-t-lg border-cyan-500">Racchette</h2>
                      </div>
                      <figure>
                        <img src={racchette} alt="Shoes" />
                      </figure>
                    </div>
                    <div className="card bg-base-100 w-36 sm:w-40 md:w-40 lg:w-52 xl:w-72 hover:scale-110 hover:opacity-75 transition-transform duration-300 ease-in-out shadow-sm cursor-pointer">
                      <div className="card-body p-0">
                        <h2 className="card-title p-2 border-2 border-b-0 rounded-t-lg border-cyan-500">Abbigliamento</h2>
                      </div>
                      <figure>
                        <img src={maglia} alt="Shoes" />
                      </figure>
                    </div>
                    <div className="card bg-base-100 w-36 sm:w-40 md:w-40 lg:w-52 xl:w-72 hover:scale-110 hover:opacity-75 transition-transform duration-300 ease-in-out shadow-sm cursor-pointer">
                      <div className="card-body p-0">
                        <h2 className="card-title p-2 border-2 border-b-0 rounded-t-lg border-cyan-500">Scarpe</h2>
                      </div>
                      <figure>
                        <img src={scarpa} alt="Shoes" />
                      </figure>
                    </div>
                    <div className="card bg-base-100 w-36 sm:w-40 md:w-40 lg:w-52 xl:w-72 hover:scale-110 hover:opacity-75 transition-transform duration-300 ease-in-out shadow-sm cursor-pointer">
                      <div className="card-body p-0">
                        <h2 className="card-title p-2 border-2 border-b-0 rounded-t-lg border-cyan-500">Borsoni</h2>
                      </div>
                      <figure>
                        <img src={borsone} alt="Shoes" />
                      </figure>
                    </div>
                  </div>
                  </> 
        )}
    </>
);
}
export default SideBar;