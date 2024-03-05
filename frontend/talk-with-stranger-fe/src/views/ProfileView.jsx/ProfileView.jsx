import { Box, Container, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";
import { useState } from "react";
import PreviewPictureModal from "../../components/PreviewPictureModal/PreviewPictureModal";

const user = {
  userFirstName: "Tu",
  userLastName: "Tran",
};

const ProfileView = () => {
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAvatarUploadChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarSrc(URL.createObjectURL(e.target.files[0]));
      setModalOpen(true);
    }
  };

  const onEditFormSubmit = (data) => {
    console.log(data);
  };

  const handleAvatarSave = () => {
    setModalOpen(false);
  };

  return (
    <>
      <PreviewPictureModal
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        onSave={handleAvatarSave}
        src={avatarSrc}
      />
      <Container maxWidth="lg">
        <Box component="div">
          <Grid container>
            <Grid sx={{ pr: 2 }} item xs={5}>
              <UserProfileCard
                user={user}
                onAvatarSelect={handleAvatarUploadChange}
              />
            </Grid>
            <Grid sx={{ pl: 2 }} item xs={7}>
              <EditProfileForm onSubmit={onEditFormSubmit} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ProfileView;
