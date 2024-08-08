import React, { useRef, useState, useEffect } from "react";
import { IoMdPlay } from "react-icons/io";
import { FaPause } from "react-icons/fa";
import { MdFullscreenExit } from "react-icons/md";
import { CgMiniPlayer } from "react-icons/cg";
import { LuRectangleHorizontal } from "react-icons/lu";
import { ImNext2 } from "react-icons/im";
import { FaVolumeUp } from "react-icons/fa";
import { IoVolumeMute } from "react-icons/io5";
import { BiSolidVolumeLow } from "react-icons/bi";
import { BiCaptions } from "react-icons/bi";

const VideoPlayer = ({ video, setActiveVidoeIndex, length }) => {
  const [playing, setPlaying] = useState(false);
  const [playerMode, setPlayerMode] = useState("");

  const [volume, setVolume] = useState("high");
  const [volumeLevel, setVolumeLevel] = useState(1);

  const [currentDuration, setCurrentDuration] = useState("0:00");
  const [totalDuration, setTotalDuration] = useState("0:00");

  const [showCaptions, setShowCaptions] = useState(false);

  const [playbackRate, setPlayBackRate] = useState(1);

  const videoContainerRef = useRef(null);
  const videoRef = useRef(null);

  const handlePlayPause = (event) => {
    event.stopPropagation();
    setPlaying((prevPlaying) => !prevPlaying);
  };

  const handleContainerClick = () => {
    setPlaying((prevPlaying) => !prevPlaying);
  };

  // request full screen, request picture in picture
  const togglePlayerMode = (event, mode) => {
    event.stopPropagation();
    if (playerMode === mode) {
      setPlayerMode("");
      if (mode === "fullScreen") {
        document.exitFullscreen().catch((error) => {
          console.error("Error trying to exit fullscreen:", error);
        });
      } else if (mode === "miniPlayer") {
        document.exitPictureInPicture();
      }
    } else {
      setPlayerMode(mode);
      if (mode === "fullScreen") {
        if (videoContainerRef.current.requestFullscreen) {
          videoContainerRef.current.requestFullscreen();
        } else if (videoContainerRef.current.webkitRequestFullscreen) {
          // Safari
          videoContainerRef.current.webkitRequestFullscreen();
        } else if (videoContainerRef.current.msRequestFullscreen) {
          // IE11
          videoContainerRef.current.msRequestFullscreen();
        }
      } else if (mode === "miniPlayer") {
        if (videoRef.current.requestPictureInPicture) {
          videoRef.current.requestPictureInPicture();
        } else if (videoRef.current.webkitRequestFullscreen) {
          // Safari
          videoRef.current.webkitRequestPictureInPicture();
        } else if (videoRef.current.msRequestFullscreen) {
          // IE11
          videoRef.current.msRequestPictureInPicture();
        }
      }
    }
  };

  const handlePlayNext = (event) => {
    event.stopPropagation();
    setActiveVidoeIndex((prevIndex) => {
      if (prevIndex === length - 1) return 0;
      else return prevIndex + 1;
    });
  };

  const toggleVolume = (event = "", vol) => {
    event && event.stopPropagation();
    // "high || mute || low";
    if (vol === "mute") {
      setVolumeLevel(0);
    } else if (vol === "high") {
      setVolumeLevel(1);
    }
    setVolume(vol);
  };

  // video volume === video.volume
  const handleVolumeInputChange = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const value = parseFloat(event.target.value);

    if (value >= 0.5) {
      setVolume("high");
    } else if (value > 0 && value < 0.5) {
      setVolume("low");
    } else {
      setVolume("mute");
    }

    setVolumeLevel(value);

    if (videoRef.current) {
      videoRef.current.volume = value;
    }
  };

  const formatDuration = (time) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    // INTL namespace used for formatting date, number and string
    const numberFormatter = new Intl.NumberFormat(undefined, {
      minimumIntegerDigits: 2,
    });

    if (hours === 0) {
      return `${numberFormatter.format(minutes)}:${numberFormatter.format(
        seconds
      )}`;
    }
    return `${numberFormatter.format(hours)}:${numberFormatter.format(
      minutes
    )}:${numberFormatter.format(seconds)}`;
  };

  // skip function === video.currentTime
  const skip = (duration) => {
    videoRef.current.currentTime += duration;
  };

  // toggling captions === video.textTracks[0]
  const toggleCaption = (e) => {
    e.stopPropagation();
    const captions = videoRef.current?.textTracks[0];
    if (captions) {
      const newMode = captions?.mode === "showing" ? "hidden" : "showing";
      captions.mode = newMode;
      setShowCaptions((prevShowCaptions) => !prevShowCaptions);
    }
  };

  // change playback speed === video.playbackRate
  const changePlaybackSpeed = (e) => {
    e.stopPropagation();
    let newPlaybackRate = videoRef.current.playbackRate + 0.25;
    if (newPlaybackRate > 2) {
      newPlaybackRate = 0.25;
    }
    videoRef.current.playbackRate = newPlaybackRate;
    setPlayBackRate(newPlaybackRate);
  };

  // for loading video and setting captions initially and playback rate on change video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setPlayBackRate(1);
      const captions = videoRef.current.textTracks[0];
      if (captions) {
        captions.mode = showCaptions ? "showing" : "hidden";
      }
    }
  }, [video]);

  // for setting total duration
  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setTotalDuration(videoRef.current.duration);
        console.log(totalDuration);
      }
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
      videoElement.load();

      // Clean up the event listener on component unmount
      return () => {
        videoElement.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [video]);

  // for setting current duration
  useEffect(() => {
    const handleCurrentDuration = () => {
      if (videoRef.current) {
        setCurrentDuration(videoRef.current.currentTime);
      }
    };

    videoRef.current.addEventListener("timeupdate", handleCurrentDuration);

    return () =>
      videoRef.current.removeEventListener("timeupdate", handleCurrentDuration);
  }, []);

  // for volume controlling
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volumeLevel;
    }
  }, [volumeLevel]);

  // playing or pausing video based on the playing state.
  useEffect(() => {
    if (playing) {
      videoRef.current.play().catch((error) => {
        console.error("Error trying to play the video:", error);
      });
    } else {
      videoRef.current.pause();
    }
  }, [playing]);

  // handling key down
  useEffect(() => {
    // in react we need to provide the reference to the functon on cleanup
    const handleKeyDown = (e) => {
      const tagName = document.activeElement.tagName.toLowerCase();
      if (tagName === "input") return;
      switch (e.key?.toLowerCase()) {
        case " ":
        case "k":
          if (tagName === "button") return;
          handleContainerClick();
          break;
        case "t":
          togglePlayerMode(e, "theater");
          break;
        case "f":
          togglePlayerMode(e, "fullScreen");
          break;
        case "i":
          togglePlayerMode(e, "miniPlayer");
          break;
        case "m":
          if (volume === "mute") toggleVolume(e, "high");
          else toggleVolume(e, "mute");
          break;
        case "arrowleft":
        case "j":
          console.log("arrow left");
          skip(-5);
          break;
        case "arrowright":
        case "l":
          skip(5);
        case "c":
          toggleCaption(e);
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
    // for toggle modes add as dependencies
  }, [volume, playerMode, playing]);

  return (
    <div
      className={`video-container ${
        playerMode === "theater"
          ? "theater"
          : playerMode === "fullScreen"
          ? "full-screen"
          : "mini-player"
      }`}
      ref={videoContainerRef}
      onClick={handleContainerClick}
    >
      {/* Time line container */}
      <div className="timeline-container"></div>
      <div className="video-controls-container">
        <div className="controls">
          <button
            className="btn play-pause-btn"
            onClick={(e) => handlePlayPause(e)}
          >
            {playing ? <FaPause /> : <IoMdPlay />}
          </button>
          <button className="btn next-btn" onClick={(e) => handlePlayNext(e)}>
            <ImNext2 />
          </button>

          {/* VOLUME CONTAINER */}
          <div className="volume-container">
            <button className="btn volume-btn">
              {volume === "high" ? (
                <FaVolumeUp onClick={(e) => toggleVolume(e, "mute")} />
              ) : volume === "low" ? (
                <BiSolidVolumeLow />
              ) : (
                <IoVolumeMute onClick={(e) => toggleVolume(e, "high")} />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={volumeLevel}
              onChange={handleVolumeInputChange}
              onClick={(e) => e.stopPropagation()}
              className="volume-slider"
            />
          </div>

          {/* DURATION CONTAINER */}
          <div className="duration-container">
            <div className="current-time">
              {formatDuration(currentDuration)}
            </div>
            /<div className="total-time">{formatDuration(totalDuration)}</div>
          </div>

          {/* CLOSED CAPTION BUTTON */}
          <button
            className={`btn captions-btn ${showCaptions ? "active" : ""}`}
            onClick={(e) => toggleCaption(e)}
          >
            <BiCaptions />
          </button>

          {/* SPEED BUTTON */}
          <button
            className="speed-btn"
            onClick={(e) => changePlaybackSpeed(e)}
          >{`${playbackRate}X`}</button>

          <button
            className="btn mini-player-btn"
            onClick={(e) => togglePlayerMode(e, "miniPlayer")}
          >
            <CgMiniPlayer />
          </button>

          <button
            className="btn theater-btn"
            onClick={(e) => togglePlayerMode(e, "theater")}
          >
            <LuRectangleHorizontal />
          </button>

          <button
            className="btn full-screen-btn"
            onClick={(e) => togglePlayerMode(e, "fullScreen")}
          >
            <MdFullscreenExit />
          </button>
        </div>
      </div>
      <video width="100%" ref={videoRef} src={video?.url} type="video/mp4">
        Your browser does not support the video tag.
        <track
          kind="captions"
          srcLang="en"
          src="/src/assets/subtitles/subtitles.vtt"
        />
      </video>
    </div>
  );
};

export default VideoPlayer;
