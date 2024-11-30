import React, { useState } from "react";
import classes from "./DocumentReader.module.css";
import { Button, InputAdornment, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { clearCredentials } from "../../http/auth";
import axiosInstance from "../../http/axios-instance";

const DocumentReader = () => {
  const [startLocation, setStartLocation] = useState<string>("");
  const [endLocation, setEndLocation] = useState<string>("");
  const [calculatedDistance, setCalculatedDistance] = useState<string>("");

  const handleCalculation = async () => {
    if (!startLocation || !endLocation) {
      alert("Please enter both start and end locations");
      return;
    }

    const params = {
      start_location: startLocation,
      destination_location: endLocation,
    };

    try {
      const response = await axiosInstance.get("/api/calc-distance", {
        params: params,
      });

      const data = response.data;
      setStartLocation(data.start_location.formatted_address);
      setEndLocation(data.destination_location.formatted_address);
      setCalculatedDistance(response.data.distance);
    } catch (error) {
      console.error(error);
    }
  };
  return <div className={classes.container}></div>;
};

export default DocumentReader;
