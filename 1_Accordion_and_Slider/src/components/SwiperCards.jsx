// SwipingCard.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SwipingCard = () => {
  //Documentation here : https://react-slick.neostack.com/docs/example/auto-play
  const settings = {
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
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
      style={{ maxWidth: "968px", margin: "auto", width: "100%" }}
    >
      {/* Your card components go here */}
      <div className="flex-col card-bg">
        <i class="fa-solid fa-house"></i>
        <p className="p-4 m-2">Card 1</p>
      </div>
      <div className="flex-col card-bg">
        <i class="fa-solid fa-house"></i>
        <p className="p-4 m-2">Card 2</p>
      </div>
      <div className="flex-col card-bg">
        <i class="fa-thin fa-house"></i>
        <p className="p-4 m-2">Card 3</p>
      </div>
      <div className="flex-col card-bg">
        <i class="fa-thin fa-house"></i>
        <p className="p-4 m-2">Card 4</p>
      </div>
      <div className="flex-col card-bg">
        <i class="fa-thin fa-house"></i>
        <p className="p-4 m-2">Card 5</p>
      </div>
      {/* Add more cards as needed */}
    </Slider>
  );
};

export default SwipingCard;
