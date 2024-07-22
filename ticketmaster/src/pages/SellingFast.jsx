import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const CustomArrow = ({ className, style, onClick, direction }) => {
  const arrowPath = direction === "left"
    ? "M15.75 19.5L8.25 12l7.5-7.5"
    : "M8.25 4.5L15.75 12l-7.5 7.5";

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        ...style,
        display: "block",
        background: "transparent",
        color: "black",
        zIndex: 1,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
        className="h-6 w-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={arrowPath} />
      </svg>
    </div>
  );
};

const Discount = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://sportstest-cce07-default-rtdb.firebaseio.com/events.json")
      .then((response) => {
        const fetchedEvents = Object.keys(response.data).map((key) => ({
          id: key,
          ...response.data[key],
        }));
        setEvents(fetchedEvents);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleButtonClick = (event) => {
    navigate("/eventdetails", { state: { event } });
  };

  return (
    <div className="bg-white min-h-screen text-black">
      <h1 className="text-4xl text-center py-8">Special Discount</h1>
      <div className="container mx-auto px-4 mb-8">
        <Slider {...settings} className="relative">
          {events.map((event) => (
            <div key={event.id} className="px-2">
              <div className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <div className="relative mx-4 h-40 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                  {event.Url ? (
                    <img
                      src={event.Url}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-600 flex items-center justify-center">
                      Image not available
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h5 className="mb-2 text-xl font-semibold text-gray-900">{event.title}</h5>
                  <p className="text-base font-light text-gray-700">
                    {event.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleButtonClick(event)}
                    className="bg-green-600 py-3 px-6 text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-85 active:opacity-85"
                  >
                    Show more details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Discount;
