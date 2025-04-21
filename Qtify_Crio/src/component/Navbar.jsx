import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  InputBase,
  IconButton,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import QtifyLogo from '../assets/Qtify_logo.png';

export default function Navbar() {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#34C94B", padding: "8px 16px", height: "74px" }}
      elevation={0}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box display="flex" alignItems="center" justifyContent="center" gap={1} marginLeft={2}>
          <Avatar
            src={QtifyLogo}
            alt="Logo"
            sx={{ width: 100, height: 60 }}
          />
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            border: "1px solid black",
            borderRadius: "8px",
            overflow: "hidden",
            width: "40%",
            backgroundColor: "#fff",
          }}
        >
          <InputBase
            placeholder="Search an album of your choice"
            sx={{ px: 2, flexGrow: 1 }}
          />
          <IconButton sx={{ borderLeft: "1px solid black", borderRadius: 0 }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Button */}
        <Button
          variant="contained"
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
            px: 3,
          }}
        >
          Give Feedback
        </Button>
      </Toolbar>
    </AppBar>
  );
}
