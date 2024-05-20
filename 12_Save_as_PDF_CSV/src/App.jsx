import { Button, Container } from "react-bootstrap";
import Pdf from "./components/Pdf";
import { FaDownload } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa";
import { usePDF } from "react-to-pdf";
import CsvDownloadButton from 'react-json-to-csv'

function App() {
  const { toPDF, targetRef } = usePDF({ filename: "invoice.pdf" });

  const csvData = [
    {
      Amount: "$100000",
      Place: "United Arab Emirates",
      "Last Date": "19-May-2024",
    },
    {
      Amount: "$100000",
      Place: "United Arab Emirates",
      "Last Date": "19-May-2024",
    },
  ];

  return (
    <>
      <Container className="d-flex flex-column w-100 py-5 my-5 border">
        <div
          ref={targetRef}
          className="w-full h-full flex items-center justify-center p-10"
        >
          <Pdf />
        </div>

        <div className="mt-5 d-flex align-items-center justify-content-center gap-5 w-full">
          <Button variant="danger" onClick={() => toPDF()}>
            Save as PDF <FaDownload />
          </Button>
          <CsvDownloadButton 
          className="btn btn-success" data={csvData} delimiter="," filename="invoice_report">
            Save as CSV <FaFileCsv />
          </CsvDownloadButton>
        </div>
      </Container>
    </>
  );
}

export default App;
