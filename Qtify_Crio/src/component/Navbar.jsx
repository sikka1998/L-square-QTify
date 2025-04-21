import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  InputBase,
  IconButton,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import QtifyLogo from "../assets/Qtify_logo.png";
import FeedbackModal from "./FeedbackModal";

export default function Navbar() {
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

  const handleOpenFeedbackModal = () => {
    setOpenFeedbackModal(true);
  };

  const handleCloseFeedbackModal = () => {
    setOpenFeedbackModal(false);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ 
          backgroundColor: "#34C94B", 
          padding: 0, 
          height: "74px" 
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 0,
            minHeight: "74px",
            pl: 2,
            pr: 2
          }}
        >
          {/* Logo */}
          <Box display="flex" alignItems="center" ml={1}>
            <img
              src={QtifyLogo}
              alt="Qtify"
              style={{ 
                width: "85px", 
                height: "43px", 
                objectFit: "contain", 
                display: "block"
              }}
              data-testid="logo"
            />
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              border: "1px solid black",
              borderRadius: "8px",
              overflow: "hidden",
              width: { xs: "35%", sm: "40%", md: "50%" },
              maxWidth: "540px",
              backgroundColor: "#fff",
              height: "38px",
            }}
          >
            <InputBase
              placeholder="Search a album of your choice"
              sx={{ 
                px: 2, 
                flexGrow: 1,
                fontSize: "14px",
                '&::placeholder': {
                  fontSize: "14px",
                  color: "#121212"
                }
              }}
            />
            <IconButton 
              sx={{ 
                borderLeft: "1px solid black", 
                borderRadius: 0,
                backgroundColor: "#fff",
                '&:hover': {
                  backgroundColor: "#f8f8f8"
                }
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Button */}
          <Button
            variant="contained"
            onClick={handleOpenFeedbackModal}
            sx={{
              backgroundColor: "#121212",
              color: "#34C94B",
              fontWeight: 600,
              fontFamily: "Poppins, sans-serif",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#000",
              },
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "14px",
              height: "38px",
            }}
          >
            Give Feedback
          </Button>
        </Toolbar>
      </AppBar>

      {/* Feedback Modal */}
      <FeedbackModal open={openFeedbackModal} handleClose={handleCloseFeedbackModal} />
    </>
  );
}
