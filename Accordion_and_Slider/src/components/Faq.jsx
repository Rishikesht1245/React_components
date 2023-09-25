import { useState } from "react";
const Faq = ({ faqs }) => {
  const [open, setOpen] = useState(-1);

  return (
    <section>
      {faqs?.map((faq, index) => {
        return (
          <div className="faq-container" key={faq.id}>
            <div className="question-div">
              <h5 className="question">{faq?.question}</h5>
              {open === index ? (
                <button onClick={() => setOpen(-1)} className="icons">
                  -
                </button>
              ) : (
                <button onClick={() => setOpen(index)} className="icons">
                  +
                </button>
              )}
            </div>
            {open === index && (
              <div className="answer-div">
                <p className="answer">{faq?.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};
export default Faq;
