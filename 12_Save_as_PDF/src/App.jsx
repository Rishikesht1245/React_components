import { Button, Container } from "react-bootstrap"
import Pdf from "./components/Pdf"
import { FaDownload } from "react-icons/fa";

function App() {

  return (
    <>
      <Container className="d-flex flex-column w-100 py-5 my-5 border">
        <Pdf/>
        <div className="mt-5 mx-auto">
          <Button variant="danger">Save as PDF <FaDownload/></Button>
        </div>
      </Container>
    </>
  )
}

export default App
