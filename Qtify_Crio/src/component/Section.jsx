import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";
import axios from "axios";
import AlbumCard from "./AlbumCard";
import Carousel from "./Carousel/Carousel";

const Section = ({ title, fetchUrl }) => {
  // State to store albums
  const [albums, setAlbums] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Toggle collapse/expand
  const [collapsed, setCollapsed] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const getAlbums = async () => {
      setLoading(true);
      try {
        const res = await axios.get(fetchUrl);
        setAlbums(res.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    getAlbums();
  }, [fetchUrl]);

  // Show fewer albums if collapsed
  const visibleAlbums = collapsed ? albums.slice(0, 6) : albums;

  return (
    <Box style={{ marginTop: "2rem" }}>
      {/* === Header Section === */}
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Grid item>
          <Typography variant="h5" fontWeight={600}>
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="text"
            color="primary"
            onClick={() => setCollapsed(!collapsed)}
            sx={{ textTransform: "none" }}
          >
            {collapsed ? "Show All" : "Collapse"}
          </Button>
        </Grid>
      </Grid>

      {/* === Grid Section === */}
      {loading ? (
        // === While loading, show spinner + skeletons ===
        <Grid container spacing={2}>
          {Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <Card sx={{ borderRadius: 2, minWidth: 200, margin: "20px" }}>
                <Skeleton variant="rectangular" width="100%" height={160} />
                <CardContent sx={{ padding: 1 }}>
                  <Skeleton width="80%" />
                  <Skeleton width="60%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : collapsed ? (
        // === Carousel view ===
        <Carousel
          data={visibleAlbums}
          renderComponent={(album) => (
            <AlbumCard
              title={album.title}
              imageURL={album.image}
              follows={album.follows}
            />
          )}
        />
      ) : (
        // === Grid view ===
        <Grid container spacing={2}>
          {visibleAlbums.map((album) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={album.id}>
              <AlbumCard
                title={album.title}
                imageURL={album.image}
                follows={album.follows}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Section;
