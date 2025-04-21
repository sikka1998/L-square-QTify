import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";

export default function AlbumCard({ title, imageURL, follows }) {
  return (
    <>
      <Card sx={{ minWidth: 200, margin: "20px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={imageURL}
            alt={title}
          />
          <CardContent>
            <Chip
              label={follows + " Follows"}
              variant="outlined"
              sx={{ backgroundColor: "#121212", color: "#fff" }}
              value={follows}
            />
          </CardContent>
        </CardActionArea>
      </Card>
      <Typography variant="h6" component="div" sx={{ marginLeft: "20px" }}>
        {title}
      </Typography>
    </>
  );
}
