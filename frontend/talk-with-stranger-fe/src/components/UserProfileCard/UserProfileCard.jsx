import { useState } from "react";
import { Edit, Flag, Upload } from "@mui/icons-material";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";

const UserProfileCard = ({ user, onAvatarSelect }) => {
  const { userFirstName, userLastName } = user;
  const [hover, setHover] = useState(false);

  const handleMouseEnterAvatar = () => {
    setHover(true);
  };

  const handleMouseLeaveAvatar = () => {
    setHover(false);
  };
  return (
    <Box
      component="div"
      sx={{
        borderRadius: "10px",
        p: 2,
        backgroundColor: "white",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <Box
        component="div"
        sx={{
          borderRadius: "calc(10px - 1px)",
          position: "relative",
          height: "100px",
          width: "100%",
          backgroundColor: "#4158D0",
          backgroundImage:
            "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
        }}
      >
        <Button
          size="small"
          sx={{
            position: "absolute",
            right: "10px",
            bottom: "10px",
            opacity: "0.7",
            textTransform: "none",
          }}
          color="secondary"
          endIcon={<Edit />}
          variant="contained"
        >
          Edit background
        </Button>
      </Box>
      <Avatar
        sx={{
          width: "90px",
          height: "90px",
          marginTop: "-45px",
          ml: 1,
          border: "5px solid rgba(255, 255, 255)",
        }}
        onMouseEnter={handleMouseEnterAvatar}
        onMouseLeave={handleMouseLeaveAvatar}
      >
        <input
          accept="image/*"
          id="raised-button-file"
          type="file"
          onChange={onAvatarSelect}
          hidden
        />
        {hover ? (
          <label
            style={{
              height: "100%",
              width: "100%",
            }}
            htmlFor="raised-button-file"
          >
            <Button
              variant="raise"
              component="span"
              sx={{
                cursor: "pointer",
                bgcolor: "rgba(0,0,0,0.1)",
                height: "100%",
                width: "100%",
              }}
            >
              <Upload />
            </Button>
          </label>
        ) : (
          <span>{`${userFirstName.charAt(0)}${userLastName.charAt(0)}`}</span>
        )}
      </Avatar>
      <Stack sx={{ pl: 1 }} spacing={2}>
        <Typography sx={{ display: "flex", alignItems: "center" }} variant="h5">
          {`${userFirstName} ${userLastName}`} | <Flag />
        </Typography>
        <Typography variant="subtitle1"> 20 | Computer science</Typography>
        <Typography variant="body2">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis,
          aperiam fugiat laborum tenetur laboriosam a impedit ducimus fuga ipsa
          esse. Deleniti, eius amet? Vitae est odit nostrum quam eius quibusdam.
        </Typography>
      </Stack>
    </Box>
  );
};

export default UserProfileCard;
