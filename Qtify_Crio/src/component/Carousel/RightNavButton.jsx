import { Box } from "@mui/material";
import React from "react";

const RightNavButton = () => (
  <Box
    className="swiper-button-next"
    style={{
      position: "absolute",
      top: "40%",
      right: 0,
      zIndex: 10,
      width: "56px",
      height: "56px",
      backgroundColor: "#34C94B",
      borderRadius: "50%",
      color: "#fff",
    }}
  ></Box>
);

export default RightNavButton;
