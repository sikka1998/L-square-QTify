import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Chip,
  Box,
} from "@mui/material";
import { PlaybackContext } from "../App";

export default function AlbumCard({ title, imageURL, followsOrLikes, isSong, id, artists }) {
  const navigate = useNavigate();
  const { setCurrentSong } = useContext(PlaybackContext);
  
  // Generate the chip label based on whether it's a song or album
  const chipLabel = followsOrLikes 
    ? `${followsOrLikes} ${isSong ? 'Likes' : 'Follows'}`
    : null;

  const handleCardClick = () => {
    if (isSong) {
      // Play the song
      setCurrentSong({
        title,
        image: imageURL,
        artist: artists ? artists.join(", ") : "Unknown Artist",
      });
    } else if (id) {
      // Navigate to album details
      navigate(`/album/${id}`);
    }
  };

  return (
    <Box className="album-card" data-testid="album-card">
      <Card 
        sx={{ 
          minWidth: 160, 
          maxWidth: 200, 
          margin: "10px", 
          cursor: "pointer",
          backgroundColor: "#121212",
          color: "#FFFFFF",
        }}
        onClick={handleCardClick}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={imageURL}
            alt={title}
          />
          <CardContent>
            {chipLabel && (
              <Chip
                label={chipLabel}
                variant="outlined"
                sx={{ backgroundColor: "#121212", color: "#fff" }}
              />
            )}
          </CardContent>
        </CardActionArea>
      </Card>
      <Typography
        variant="h6"
        component="div"
        className="album-title"
        data-testid="album-title"
        sx={{ 
          marginLeft: "20px", 
          marginTop: "-10px",
          color: "#FFFFFF",
          fontSize: "16px",
          fontWeight: "bold",
          width: "180px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
