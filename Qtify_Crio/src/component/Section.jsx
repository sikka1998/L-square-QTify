import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Skeleton,
  Tabs,
  Tab,
} from "@mui/material";
import axios from "axios";
import AlbumCard from "./AlbumCard";
import Carousel from "./Carousel/Carousel";

const Section = ({
  title,
  fetchUrl,
  showTabs = false,
  disableCollapse = false,
  contentType = "album",
}) => {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [mainRes, genreRes] = await Promise.all([
          axios.get(fetchUrl),
          showTabs
            ? axios.get("https://qtify-backend-labs.crio.do/genres")
            : Promise.resolve({ data: { data: [] } }),
        ]);

        setData(Array.isArray(mainRes.data) ? mainRes.data : []);
        
        if (showTabs && genreRes.data && genreRes.data.data) {
          setGenres(["All", ...genreRes.data.data.map((g) => g.label)]);
        }
      } catch (err) {
        console.error("Failed to fetch:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchUrl, showTabs]);

  const filteredData =
    selectedGenre === "All"
      ? data
      : data.filter((item) => item.genre && item.genre.label === selectedGenre);

  const visibleItems = 
    (disableCollapse || !collapsed) ? filteredData : filteredData;

  return (
    <Box mt={4} className={`${title.toLowerCase().replace(/\s+/g, '-')}-section`}>
      <Grid container justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={600}>
          {title}
        </Typography>
        {!disableCollapse && (
          <Button
            onClick={() => setCollapsed(!collapsed)}
            sx={{ textTransform: "none" }}
          >
            {collapsed ? "Show All" : "Collapse"}
          </Button>
        )}
      </Grid>

      {showTabs && (
        <Box mb={2}>
          <Tabs
            value={selectedGenre}
            onChange={(e, val) => setSelectedGenre(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": { textTransform: "none", fontWeight: 500 },
              "& .Mui-selected": { color: "#fff" },
              "& .MuiTabs-indicator": { backgroundColor: "#fff" },
            }}
          >
            {genres.map((genre) => (
              <Tab key={genre} label={genre} value={genre} />
            ))}
          </Tabs>
        </Box>
      )}

      {loading ? (
        <Grid container spacing={2}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
              <Card sx={{ borderRadius: 2 }}>
                <Skeleton variant="rectangular" height={160} />
                <CardContent>
                  <Skeleton width="80%" />
                  <Skeleton width="60%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : collapsed ? (
        <Box sx={{ backgroundColor: "#121212", p: 1, borderRadius: 2 }}>
          <Carousel
            data={visibleItems}
            renderComponent={(item) => (
              <AlbumCard
                key={item.id}
                id={item.id}
                title={item.title}
                imageURL={item.image}
                followsOrLikes={
                  contentType === "song" ? item.likes : item.follows
                }
                isSong={contentType === "song"}
                artists={item.artists}
              />
            )}
          />
        </Box>
      ) : (
        <Grid container spacing={2} sx={{ backgroundColor: "#121212", p: 1, borderRadius: 2 }}>
          {visibleItems.map((item) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={item.id}>
              <AlbumCard
                id={item.id}
                title={item.title}
                imageURL={item.image}
                followsOrLikes={
                  contentType === "song" ? item.likes : item.follows
                }
                isSong={contentType === "song"}
                artists={item.artists}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Section;
