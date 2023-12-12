// SwipingCard.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { cards } from "../constants/faqs";
const SwipingCard = () => {
  //Documentation here : https://react-slick.neostack.com/docs/example/auto-play

  // const arrowStyles = {
  //   color: "blue", // Change this to the desired color
  //   fontSize: "24px", // Adjust the font size as needed
  //   background: "transparent",
  //   border: "none",
  //   outline: "none",
  // };
  // const NextArrow = ({ onClick, styles }) => (
  //   <button className="slick-next" onClick={onClick} style={styles}>
  //     <i className="fa-solid fa-arrow-right"></i>
  //   </button>
  // );

  // const PrevArrow = ({ onClick, styles }) => (
  //   <button className="slick-prev" onClick={onClick} style={styles}>
  //     <i className="fa-solid fa-arrow-left"></i>
  //   </button>
  // );
  const settings = {
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    // nextArrow: <NextArrow styles={arrowStyles} />,
    // prevArrow: <PrevArrow styles={arrowStyles} />,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider
      {...settings}
      style={{ maxWidth: "1460px", margin: "auto", width: "100%" }}
    >
      {/* Your card components go here */}
      {cards?.map((card) => (
        <div
          className="flex flex-col bg-white max-w-[200px] w-full p-3 rounded-lg"
          key={card?.id}
        >
          <i className={`${card?.icon} bg-white`}></i>
          <p className="m-2 bg-white text-black text-lg font-semibold">
            {card?.title}
          </p>
        </div>
      ))}
    </Slider>
  );
};

export default SwipingCard;
