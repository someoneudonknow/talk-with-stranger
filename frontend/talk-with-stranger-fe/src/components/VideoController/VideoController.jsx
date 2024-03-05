import { Settings } from "@mui/icons-material";
import { Avatar, Box, IconButton, Menu, MenuItem, Slide } from "@mui/material";
import { useEffect, useState } from "react";
import { SettingBarFullControl, SettingBarVolumeControl } from "./SettingBar";

const SettingMenu = () => {
  const [anchor, setAnchor] = useState(null);
  const open = !!anchor;

  const handleSettingBtnClicked = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleSettingBtnClose = () => {
    setAnchor(null);
  };
  return (
    <>
      <IconButton
        size="large"
        onClick={handleSettingBtnClicked}
        sx={{
          zIndex: 100,
          position: "absolute",
          right: 0,
          color: "white",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "rotate(90deg) scale(1.1)",
          },
        }}
      >
        <Settings />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={open}
        onClose={handleSettingBtnClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 0.7,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleSettingBtnClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleSettingBtnClose}>
          <Avatar /> My account
        </MenuItem>
      </Menu>
    </>
  );
};

const VideoController = ({ ref, onlyVolumeControl, onSkipBtnClicked }) => {
  const [volume, setVolume] = useState(30);
  const [micMute, setMicMute] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [hover, setHover] = useState(false);

  const handleCameraBtnClicked = () => {
    setCameraOff((prev) => !prev);
  };

  const handleMicBtnClicked = () => {
    setMicMute((prev) => !prev);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  return (
    <>
      <Box
        component="div"
        sx={{
          overflow: "hidden",
          position: "relative",
          height: "365px",
          width: "100%",
          borderRadius: "10px",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <video
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          ref={ref}
        >
          Your browser doesn't support video
        </video>
        {hover && !onlyVolumeControl && (
          <SettingBarFullControl
            onVolumeChange={handleVolumeChange}
            volume={volume}
            onMicBtnClicked={handleMicBtnClicked}
            micMute={micMute}
            onCameraBtnClicked={handleCameraBtnClicked}
            cameraOff={cameraOff}
            onSkipBtnClicked={onSkipBtnClicked}
          />
        )}
        {hover && onlyVolumeControl && (
          <SettingBarVolumeControl
            onVolumeChange={handleVolumeChange}
            volume={volume}
          />
        )}
      </Box>
    </>
  );
};

export default VideoController;
