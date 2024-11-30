import { useEffect, useRef, useState } from "react";
import classes from "./DocumentReader.module.css";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axiosInstance from "../../http/axios-instance";

const DocumentReader = () => {
  const textFieldRef = useRef(null);
  const [pdfs, setPdfs] = useState<string[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string>("");

  const handlePdfSelect = (event: any) => {
    setSelectedPdf(event.target.value);
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
          Enter your questions to chat with your pdf document:
        </div>
        <TextField
          ref={textFieldRef}
          multiline
          rows={4}
          placeholder="Enter your questions here, with every question on a new line..."
          sx={{ width: "650px" }} // Adjust the width as needed
        />
      </div>
    </div>
  );
};

export default DocumentReader;
