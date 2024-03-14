import { Settings } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Slide,
} from "@mui/material";
import { useEffect, useState, forwardRef } from "react";
import { SettingBarFullControl, SettingBarVolumeControl } from "./SettingBar";

const VideoController = (
  {
    fullControl,
    onSkipBtnClick,
    options = { audio: true, video: true },
    onCameraBtnClick,
    onMicBtnClick,
    onVolumeChange,
    volume,
    loading,
  },
  ref
) => {
  const [hover, setHover] = useState(false);

  return (
    <Box
      component="div"
      sx={{
        overflow: "hidden",
        position: "relative",
        height: "100%",
        width: "100%",
        borderRadius: "10px",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {loading && (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "grid",
            placeItems: "center",
            bgcolor: "rgba(0,0,0,0.4)",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: "9999",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
      <video
        ref={ref}
        playsInline
        autoPlay
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          position: "absolute",
          top: 0,
          left: 0,
          objectFit: "cover",
          objectPosition: "center",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        Your browser doesn't support video
      </video>
      {hover && fullControl && (
        <SettingBarFullControl
          onVolumeChange={onVolumeChange}
          volume={volume}
          onMicBtnClicked={onMicBtnClick}
          micMute={!options.audio}
          onCameraBtnClicked={onCameraBtnClick}
          cameraOff={!options.video}
          onSkipBtnClicked={onSkipBtnClick}
        />
      )}
    </Box>
  );
};

export default forwardRef(VideoController);
