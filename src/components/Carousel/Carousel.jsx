import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { moveToTwo } from '../Navbar/NavbarSlice';
import { bannerImages } from '../../data/images';
import { DEFAULTS } from '../../config/constants';

const Carousel = () => {
    const [currentSlide, setCurrentSlide] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide % 4) + 1);
        }, DEFAULTS.CAROUSEL_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    const goToOfferte = () => {
        dispatch(moveToTwo());
        navigate("/Prodotti", { state: { promoOnly: true } });
    };

    return (
        <div className="w-full flex justify-center">
            <div className="carousel w-full relative">
                {Object.values(bannerImages).map((img, i) => (
                    <div
                        key={i}
                        className={`carousel-item relative w-full ${
                            currentSlide === i + 1 ? "block" : "hidden"
                        }`}
                    >
                        <img
                            src={img}
                            className="w-full sm:h-auto h-[300px] sm:min-h-[300px] object-cover"
                            alt={`Banner ${i + 1}`}
                            draggable="false"
                        />
                    </div>
                ))}

                {/* Navigation Buttons */}
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
                    <button
                        className="btn btn-circle hidden md:inline-flex border-none"
                        onClick={() => setCurrentSlide(currentSlide === 1 ? 4 : currentSlide - 1)}
                    >
                        ❮
                    </button>
                </div>
                <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                    <button
                        className="btn btn-circle hidden md:inline-flex border-none"
                        onClick={() => setCurrentSlide(currentSlide === 4 ? 1 : currentSlide + 1)}
                    >
                        ❯
                    </button>
                </div>

                {/* CTA Button */}
                <button 
                    onClick={goToOfferte}
                    className="glass bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 hover:from-yellow-600 hover:via-yellow-500 hover:to-yellow-600 text-white font-bold text-sm sm:text-base md:text-lg py-2 sm:py-3 px-3 sm:px-6 rounded-lg sm:rounded-xl w-32 sm:w-40 md:w-48 lg:w-56 absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 z-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-1 sm:gap-2 group backdrop-blur-sm"
                >
                    <span className="group-hover:translate-x-1 transition-transform duration-200 whitespace-nowrap">
                        Scopri Offerte
                    </span>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 group-hover:translate-x-2 transition-transform duration-200" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M13 7l5 5m0 0l-5 5m5-5H6" 
                        />
                    </svg>
                </button>
            </div>

            <style jsx>{`
                .carousel {
                    scroll-behavior: auto;
                    -webkit-overflow-scrolling: touch;
                }
                .carousel-item {
                    scroll-snap-align: start;
                    scroll-snap-stop: always;
                }
            `}</style>
        </div>
    );
};

export default Carousel; 