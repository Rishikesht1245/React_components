import { useEffect, useState } from "react";
import images from "../assets";

const Sliders = () => {
  const [active, setActive] = useState(0);
  const [sliderStyle, setSliderStyle] = useState({});

  const nextImage = () =>
    setActive((prev) => (prev < images.length - 1 ? prev + 1 : 0));

  const prevImage = () =>
    setActive((prev) => (prev > 0 ? prev - 1 : images.length - 1));

  useEffect(() => {
    setSliderStyle({ opacity: 0.1 });
    setTimeout(() => {
      setSliderStyle({ opacity: 1 });
    }, 1000);
  }, [active]);
  return (
    <div className="slider">
      {images.map(
        (image, index) =>
          index === active && (
            <img
              style={sliderStyle}
              className="image"
              src={image}
              key={index}
            />
          )
      )}
      <button className="btn prev-btn" onClick={prevImage}>
        &lt;
      </button>
      <button className="btn next-btn" onClick={nextImage}>
        &gt;
      </button>
      <div className="indicators">
        {images.map((image, index) => (
          <div
            onClick={() => setActive(index)}
            className={`${index === active && "active"} indicator`}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Sliders;
