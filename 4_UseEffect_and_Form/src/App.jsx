import "./App.css";
import Form from "./components/Form";
import Title from "./components/Title";

function App() {
  return (
    <section>
      <div className="section">
        <h1 className="heading">Toggling Title</h1>
        <Title />
      </div>
      <div className="section">
        <h1 className="heading">Form 1</h1>
        <Form />
      </div>
    </section>
  );
}

export default App;
