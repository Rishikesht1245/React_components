import Faq from "./components/Faq";
import Sliders from "./components/Sliders";
import faqs from "./constants/faqs";

import "./App.css";
import SwipingCard from "./components/SwiperCards";

function App() {
  return (
    <>
      <Sliders />
      <h1 className="heading">Frequently Asked Questions</h1>
      <Faq faqs={faqs} />
      <h1 className="heading">Frequently Asked Questions</h1>
      <SwipingCard />
    </>
  );
}

export default App;
