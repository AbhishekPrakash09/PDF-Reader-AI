import { useEffect, useRef, useState } from "react";
import classes from "./DocumentReader.module.css";
import uploadImg from "../../assets/upload.png";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axiosInstance from "../../http/axios-instance";

const DocumentReader = () => {
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [pdfs, setPdfs] = useState<string[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string>("");
  const [textResponses, setTextResponses] = useState<string>("Hello");
  const [file, setFile] = useState<File | null>(null);

  const handlePdfSelect = (event: any) => {
    setSelectedPdf(event.target.value);
  };

  const handleClear = () => {
    setTextResponses("");
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("pdf_file_name", file.name);
      axiosInstance.post("/api/upload-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const droppedFile = event.dataTransfer.files[0];

    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      alert("Please select a PDF file.");
    }
  };

  const handleQuerySubmit = async () => {
    const query = textFieldRef.current?.value;
    if (!query || selectedPdf == "") {
      alert("Please select a PDF and enter a query");
      return;
    }
    if (query) {
      const response = await axiosInstance.post("/api/query", {
        pdf: selectedPdf,
        query: query,
      });
      console.log(response.data);
    }
  };

  const fetchPDFList = async () => {
    const response = await axiosInstance.get("/api/list-pdfs");
    setPdfs(response.data);
  };
  useEffect(() => {
    fetchPDFList();
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.appTitle}>PDF Reader Application</div>
      <div className={classes.dropDownContainer}>
        <FormControl variant="outlined" fullWidth sx={{ border: "black" }}>
          <InputLabel id="demo-simple-select-label">Select PDF</InputLabel>
          <Select onChange={handlePdfSelect}>
            {pdfs.map((pdf) => (
              <MenuItem
                key={pdf}
                value={pdf}
                sx={{ backgroundColor: "#D8DFE6" }}
              >
                {pdf}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div className={classes.appSubTitle}>
          Enter questions for your pdf document:
        </div>
        <TextField
          ref={textFieldRef}
          multiline
          rows={4}
          placeholder="Enter every question on a new line..."
          sx={{ width: "650px" }} // Adjust the width as needed
        />
      </div>
      <Button
        sx={{
          borderColor: "#01337C",
          border: "1px solid",
          width: "350px",
          "&:hover": {
            backgroundColor: "#01337C",
          },
          "&:active": {
            backgroundColor: "#01337C",
          },
        }}
        onClick={handleQuerySubmit}
      >
        Submit
      </Button>
      {textResponses !== "" && (
        <>
          <div className={classes.appSubTitle}>Answers:</div>
          <TextField
            value={textResponses}
            multiline
            rows={4}
            sx={{ width: "650px" }} // Adjust the width as needed
          />
          <Button
            sx={{
              borderColor: "#01337C",
              border: "1px solid",
              width: "350px",
              "&:hover": {
                backgroundColor: "#01337C",
              },
              "&:active": {
                backgroundColor: "#01337C",
              },
            }}
            onClick={handleClear}
          >
            Clear Responses
          </Button>
        </>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginTop: "32px",
        }}
      >
        <div className={classes.appSubTitle}>Upload pdf here:</div>
        <Button
          sx={{
            width: "650px",
            border: "2px dashed var(--Shades-0, #4c4a4a)",
            flexDirection: "column",
            gap: "8px",
            justifyContent: "center",
            alignItems: "center",
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          {!file && (
            <>
              <img
                src={uploadImg}
                alt="upload"
                style={{ width: "50px", height: "50px" }}
              />
              Drop your PDF here
            </>
          )}
          {file && <>Click to Upload</>}
        </Button>
      </div>
    </div>
  );
};

export default DocumentReader;
