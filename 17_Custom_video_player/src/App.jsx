import React, { useEffect, useMemo, useState } from "react";

import VideoPlayer from "./VideoPlayer";
import OtherVideos from "./OtherVideos";
import * as videoPaths from "./assets";
import {
  tollPreview1,
  tollPreview3,
  tollPreview4,
  tollPreview5,
  tollPreview6,
  tollPreview7,
  tollPreview8,
  tollPreview9,
  tollPreview10,
  tollPreview11,
  tollPreview12,
  tollPreview2,
} from "./assets/previewImgs";

import "./app.css";
const App = () => {
  const videos = useMemo(
    () => [
      {
        id: 0,
        url: videoPaths.Video1,
        title: "Trips",
      },
      {
        id: 1,
        url: videoPaths.Video2,
        title: "Task Manager",
      },
      {
        id: 2,
        url: videoPaths.Video3,
        title: "Reports",
      },
      {
        id: 3,
        url: videoPaths?.Video4,
        title: "Live",
      },
      {
        id: 4,
        url: videoPaths?.Tolls,
        title: "Tolls",
      },
    ],
    []
  );
  const [activeVideoIndex, setActiveVidoeIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(videos[activeVideoIndex]);

  const preveiewImgs = [];

  useEffect(() => {
    setCurrentVideo(videos[activeVideoIndex]);
  }, [activeVideoIndex]);

  return (
    <div className="main-container">
      <VideoPlayer
        video={currentVideo}
        setActiveVidoeIndex={setActiveVidoeIndex}
        length={videos?.length}
      />
      <OtherVideos
        videos={videos?.filter((video) => video?.id !== activeVideoIndex)}
        setActiveVidoeIndex={setActiveVidoeIndex}
      />
    </div>
  );
};

export default App;
