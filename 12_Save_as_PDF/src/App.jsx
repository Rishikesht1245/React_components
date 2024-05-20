import { Button, Container } from "react-bootstrap";
import Pdf from "./components/Pdf";
import { FaDownload } from "react-icons/fa";
import { usePDF } from "react-to-pdf";

function App() {
  const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" });

  return (
    <>
      <Container className="d-flex flex-column w-100 py-5 my-5 border">
        <div ref={targetRef} className="w-full h-full flex items-center justify-center p-10">
          <Pdf />
        </div>

        <div className="mt-5 mx-auto">
          <Button variant="danger" onClick={() => toPDF()}>
            Save as PDF <FaDownload />
          </Button>
        </div>
      </Container>
    </>
  );
}

export default App;
