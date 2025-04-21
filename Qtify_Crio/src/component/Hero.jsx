import { Avatar, Box, Typography } from "@mui/material";
import HeroImg from "../assets/Hero.png";

export default function Hero() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "270px",
        backgroundColor: "#121212",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
            fontSize: "3rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          100 thousand songs, ad-free
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: "#fff",
            fontSize: "3rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Over thousands podcast episodes
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", marginLeft: "20px" }}>
        <Avatar
          src={HeroImg}
          alt="Hero"
          sx={{ width: 180, height: 200 }}
        />
      </Box>
    </Box>
  );
}
