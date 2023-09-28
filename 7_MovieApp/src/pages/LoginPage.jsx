import { Footer } from "../components/Footer";
import { Form } from "../components/Form";
import { Header } from "../components/Header";

export const LoginPage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-20 justify-between relative">
      <Header />
      <Form />
      <Footer />
      <div className="absolute inset-0 z-[-1]">
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
    </div>
  );
};
