import { Footer } from "../components/Footer";
import { Form } from "../components/Form";
import { Header } from "../components/Header";
import Home from "../components/Home";

export const HomePage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-20 justify-between relative">
      <Header />
      <Home />
      <Footer />

      <img
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          filter: "brightness(0.4)",
        }}
        src="https://res.cloudinary.com/djcn6luvw/image/upload/v1695904698/bgimg_wvfdww.jpg"
        alt=""
        className="absolute inset-0 z-[-1]"
      />
    </div>
  );
};
