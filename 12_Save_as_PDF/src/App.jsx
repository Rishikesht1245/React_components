import { Button, Container } from "react-bootstrap";
import Pdf from "./components/Pdf";
import { FaDownload } from "react-icons/fa";
function App() {
  return (
    <Container className="w-full d-flex flex-column py-5 my-5 border">
      <Pdf />
      <div className="mx-auto mt-5">
        <Button variant="danger">
          Save as PDF
          <FaDownload className="ms-2"/>
        </Button>
      </div>
    </Container>
  );
}

export default App;
