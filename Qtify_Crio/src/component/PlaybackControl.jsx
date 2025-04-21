import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  CardMedia,
  Slider,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import defaultAlbumArt from '../assets/Qtify_logo.png';

const PlaybackControl = ({ currentSong = null }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (event, newValue) => {
    setProgress(newValue);
  };

  // Format time display (e.g., 1:45)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Calculate current and total time based on progress percentage
  const totalTime = 238; // 3:58 in seconds
  const currentTime = (progress / 100) * totalTime;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: '#000',
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        p: 2,
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 1000
      }}
    >
      {/* Currently playing track info */}
      <Box sx={{ display: 'flex', alignItems: 'center', width: '25%' }}>
        <CardMedia
          component="img"
          sx={{ width: 40, height: 40, borderRadius: 1, mr: 2 }}
          image={currentSong?.image || defaultAlbumArt}
          alt={currentSong?.title || 'No track playing'}
        />
        <Box>
          <Typography variant="body2" color="#fff" noWrap>
            {currentSong?.title || 'Song name'}
          </Typography>
          <Typography variant="caption" color="rgba(255, 255, 255, 0.5)" noWrap>
            {currentSong?.artist || 'Album name'}
          </Typography>
        </Box>
      </Box>
      
      {/* Playback controls and progress */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%' }}>
        <IconButton 
          onClick={handlePlayPause} 
          sx={{ 
            bgcolor: '#34C94B', 
            color: '#fff',
            '&:hover': { bgcolor: '#2ea13f' },
            mb: 1,
            width: 32,
            height: 32
          }}
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Typography variant="caption" color="rgba(255, 255, 255, 0.5)" sx={{ mr: 1 }}>
            {formatTime(currentTime)}
          </Typography>
          
          <Slider
            size="small"
            value={progress}
            onChange={handleProgressChange}
            sx={{
              color: '#34C94B',
              '& .MuiSlider-thumb': {
                width: 8,
                height: 8,
                '&:hover, &.Mui-active': {
                  boxShadow: '0 0 0 8px rgba(52, 201, 75, 0.16)',
                }
              },
              '& .MuiSlider-rail': {
                opacity: 0.28,
              },
            }}
          />
          
          <Typography variant="caption" color="rgba(255, 255, 255, 0.5)" sx={{ ml: 1 }}>
            {formatTime(totalTime)}
          </Typography>
        </Box>
      </Box>

      {/* Volume control (placeholder) */}
      <Box sx={{ width: '25%' }}></Box>
    </Box>
  );
};

export default PlaybackControl; 