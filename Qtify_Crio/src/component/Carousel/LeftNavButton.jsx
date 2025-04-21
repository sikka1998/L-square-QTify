import { Box } from "@mui/material";
import React from "react";

const LeftNavButton = () => (
  <Box
    className="swiper-button-prev"
    style={{
      position: "absolute",
      top: "40%",
      left: 0,
      zIndex: 10,
      width: "56px",
      height: "56px",
      backgroundColor: "#34C94B",
      borderRadius: "50%",
      color: "#fff",
    }}
  ></Box>
);

export default LeftNavButton;
