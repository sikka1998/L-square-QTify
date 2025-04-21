import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Skeleton,
  IconButton,
  Button,
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { PlaybackContext } from "../App";

const AlbumDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { setCurrentSong } = useContext(PlaybackContext);
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const songsPerPage = 10;

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      setLoading(true);
      try {
        // First try to fetch from top albums
        let response = await axios.get(
          "https://qtify-backend-labs.crio.do/albums/top"
        );
        
        let foundAlbum = response.data.find((album) => album.id === slug);
        
        // If not found in top albums, try new albums
        if (!foundAlbum) {
          response = await axios.get(
            "https://qtify-backend-labs.crio.do/albums/new"
          );
          foundAlbum = response.data.find((album) => album.id === slug);
        }
        
        if (foundAlbum) {
          setAlbum(foundAlbum);
        } else {
          setError("Album not found");
        }
      } catch (error) {
        console.error("Error fetching album details:", error);
        setError("Failed to load album details");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchAlbumDetails();
    }
  }, [slug]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  const handleSongPlay = (song, index) => {
    setCurrentSong({
      title: song?.title || `Track ${index + 1}`,
      image: song?.image || album.image || "",
      artist: song?.artists?.join(", ") || album.title,
    });
  };

  const handleShuffleClick = () => {
    if (album.songs && album.songs.length > 0) {
      const randomIndex = Math.floor(Math.random() * album.songs.length);
      handleSongPlay(album.songs[randomIndex], randomIndex);
    }
  };

  if (loading) {
    return (
      <Box sx={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", p: 4 }}>
        <Skeleton variant="rectangular" height={300} width="100%" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
        <Skeleton variant="text" height={60} width="50%" sx={{ my: 2, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
        <Skeleton variant="text" height={30} width="30%" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
        <Skeleton variant="text" height={30} width="20%" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
        <Box mt={4}>
          <Skeleton variant="text" height={40} width="40%" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
          <Grid container spacing={2} mt={2}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} key={item}>
                <Skeleton variant="rectangular" height={50} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} textAlign="center" sx={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh" }}>
        <Typography variant="h4" color="error">
          {error}
        </Typography>
        <Typography variant="body1" mt={2}>
          Please try again or go back to the home page.
        </Typography>
      </Box>
    );
  }

  if (!album) {
    return null;
  }

  // Calculate pagination
  const totalSongs = album.songs?.length || 0;
  const totalPages = Math.ceil(totalSongs / songsPerPage);
  const displayedSongs = album.songs?.slice((page - 1) * songsPerPage, page * songsPerPage) || [];

  return (
    <Box sx={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", pb: 10 }}>
      {/* Back button */}
      <Box p={2}>
        <IconButton 
          onClick={handleBackClick} 
          sx={{ color: '#fff', bgcolor: 'rgba(255, 255, 255, 0.05)', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.1)' } }}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Box>

      {/* Album header */}
      <Box 
        sx={{ 
          display: 'flex', 
          p: { xs: 2, md: 4 }, 
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-start' },
          gap: 4
        }}
      >
        {/* Album Cover */}
        <Box sx={{ maxWidth: 300 }}>
          <Card elevation={3} sx={{ bgcolor: 'transparent', boxShadow: 'none' }}>
            <CardMedia
              component="img"
              height="300"
              image={album.image || ''}
              alt={album.title || 'Album Cover'}
              sx={{ borderRadius: 1 }}
            />
          </Card>
        </Box>

        {/* Album Info */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end',
          flexGrow: 1
        }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {album.title || 'Unknown Album'}
          </Typography>
          <Typography variant="body1" color="rgba(255, 255, 255, 0.7)" gutterBottom>
            {album.description || `Catch the most romantic punjabi tracks of 2022 #SpotifyWrapped 2022`}
          </Typography>
          <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ mb: 2 }}>
            {`${album.songs?.length || 0} songs • ${album.duration || '3 hr 45 min'} • ${album.follows || 0} Follows`}
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
            <Button 
              variant="contained" 
              startIcon={<ShuffleIcon />} 
              onClick={handleShuffleClick}
              sx={{ 
                bgcolor: '#34C94B', 
                color: 'white', 
                '&:hover': { bgcolor: '#2ea13f' }, 
                textTransform: 'none',
                px: 3,
                borderRadius: 2
              }}
            >
              Shuffle
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<PlaylistAddIcon />} 
              sx={{ 
                color: '#34C94B', 
                borderColor: '#34C94B',
                '&:hover': { borderColor: '#2ea13f' }, 
                textTransform: 'none',
                px: 3,
                borderRadius: 2
              }}
            >
              Add to library
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Column Headers */}
      <Box px={4} pt={4} display="flex" justifyContent="space-between">
        <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.5)" sx={{ width: '50px' }}>
          #
        </Typography>
        <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.5)" sx={{ flexGrow: 1 }}>
          Title
        </Typography>
        <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.5)" sx={{ width: '150px', textAlign: 'left' }}>
          Artist
        </Typography>
        <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.5)" sx={{ width: '80px', textAlign: 'right' }}>
          Duration
        </Typography>
      </Box>

      <Divider sx={{ mx: 4, my: 2, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />

      {/* Songs List */}
      <List sx={{ px: 2 }}>
        {displayedSongs.map((song, index) => {
          const actualIndex = (page - 1) * songsPerPage + index + 1;
          return (
            <ListItem 
              key={song?.id || index} 
              sx={{ 
                py: 1.5,
                px: 2,
                '&:hover': { 
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 1
                },
                cursor: 'pointer'
              }}
              onClick={() => handleSongPlay(song, index)}
            >
              <Typography sx={{ width: '30px', color: 'rgba(255, 255, 255, 0.7)' }}>
                {actualIndex}
              </Typography>
              <Box display="flex" alignItems="center" sx={{ flexGrow: 1, ml: 2 }}>
                <Box position="relative" sx={{ mr: 2 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 40, height: 40, borderRadius: 1 }}
                    image={song?.image || album.image || ""}
                    alt={song?.title || `Track ${index + 1}`}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      right: 0, 
                      bottom: 0, 
                      backgroundColor: 'rgba(0,0,0,0.5)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.2s',
                      '&:hover': {
                        opacity: 1
                      },
                      borderRadius: 1
                    }}
                  >
                    <PlayArrowIcon sx={{ color: '#fff' }} />
                  </Box>
                </Box>
                <Typography variant="body1">
                  {song?.title || `Song name`}
                </Typography>
              </Box>
              <Typography sx={{ width: '150px', color: 'rgba(255, 255, 255, 0.7)' }}>
                {song?.artists?.join(", ") || "Artist name"}
              </Typography>
              <Typography sx={{ width: '80px', textAlign: 'right', color: 'rgba(255, 255, 255, 0.7)' }}>
                {song?.duration || "1:59"}
              </Typography>
            </ListItem>
          );
        })}
      </List>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Stack spacing={2}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  sx={{ color: '#fff', '&.Mui-selected': { bgcolor: '#34C94B' } }}
                />
              )}
            />
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default AlbumDetails; 