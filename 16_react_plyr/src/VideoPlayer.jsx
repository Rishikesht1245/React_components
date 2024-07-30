import React from 'react';
import Plyr from 'plyr-react';
import 'plyr-react/plyr.css';

import video from "./assets/video1.mp4"
import thumbnail from "./assets/thumbnail.jpg"

const VideoPlayer = () => {
  const videoOptions = {
    type: 'video', // Type of media (video or audio)
    sources: [
      {
        src: video, // Path to your video file
        type: 'video/mp4',
      },
      {
        src: video,
        type: 'video/mp4',
      },
    ],
    poster: thumbnail, // Poster image for the video
    tracks: [
      {
        kind: 'captions',
        label: 'English',
        srclang: 'en',
        src: 'path/to/captions.vtt',
        default: true,
      },
    ],
  };

  const playerOptions = {
    controls: [
      'play-large', // The large play button in the center
      'play', // Play/pause playback
      'progress', // The progress bar and scrubber for playback and buffering
      'current-time', // The current time of playback
      'mute', // Toggle mute
      'volume', // Volume control
      'captions', // Toggle captions
      'settings', // Settings menu
      'pip', // Picture-in-picture (for video only)
      'airplay', // Airplay (for Apple devices)
      'fullscreen', // Toggle fullscreen
    ],
    settings: ['captions', 'quality', 'speed'], // Settings to show in the menu
    quality: {
      default: 576,
      options: [432, 576, 720, 1080],
    },
    speed: {
      selected: 1,
      options: [0.5, 0.75, 1, 1.25, 1.5, 2],
    },
  };

  return <Plyr source={videoOptions} options={playerOptions} />;
};

export default VideoPlayer;
