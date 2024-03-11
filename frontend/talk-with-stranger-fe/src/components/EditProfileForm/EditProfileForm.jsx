import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import CountriesSelect from "../CountriesSelect/CountriesSelect";
import { useAsyncError } from "react-router-dom";
import DateOfBirthPicker from "../DateOfBirthPicker/DateOfBirthPicker";
import RadioButtonGroup from "../RadioButtonGroup/RadioButtonGroup";

const EditProfileForm = ({ onSubmit, initialValue }) => {
  const {
    user_first_name,
    user_last_name,
    user_description,
    user_dob,
    user_avatar,
    user_background,
    user_major,
    user_gender,
  } = initialValue;
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      editFirstName: user_first_name,
      editLastName: user_last_name,
      userDesc: user_description,
      major: user_major,
    },
  });

  const [countries, setCountries] = useState([]);
  const [gender, setGender] = useState(user_gender || "male");
  const [selectedCountry, setSelectedCountry] = useState();

  useEffect(() => {
    (async () => {
      // replaced this api with our own api
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/iso"
      );
      const countriesRes = await response.json();
      setCountries(countriesRes.data);
    })();
  }, []);

  const handleGendersChanged = (e) => {
    setGender(e.target.value);
  };

  const handleSelectionChange = (value, newValue) => {
    setSelectedCountry(newValue);
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
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid mb={3} item xs={12} justifyContent="center">
            <Typography textAlign="center" variant="h4">
              Edit Profile
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              fullWidth
              {...register("editFirstName", {
                required: "This field can't be empty",
              })}
              error={!!errors.editFirstName}
              helperText={errors.editFirstName?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              fullWidth
              {...register("editLastName", {
                required: "This field can't be empty",
              })}
              error={!!errors.editLastName}
              helperText={errors.editLastName?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <RadioButtonGroup
              id="edit-profile-genders"
              name="genders"
              formLabel="Genders"
              defaultValue={user_gender}
              value={gender}
              onChange={handleGendersChanged}
              data={[
                {
                  label: "Male",
                  value: "male",
                },
                {
                  label: "Female",
                  value: "female",
                },
                {
                  label: "Other",
                  value: "other",
                },
              ]}
            />
          </Grid>
          <Grid item container spacing={2} xs={12}>
            <Grid item xs={6}>
              <TextField
                {...register("major", {
                  required: "Please let us known your major",
                })}
                fullWidth
                label="Your Major"
                error={!!errors?.major}
                helperText={errors?.major?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <DateOfBirthPicker
                control={control}
                defaultValue={user_dob}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!errors.userDob,
                    helperText: errors?.userDob?.message,
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <CountriesSelect
                countries={countries}
                value={selectedCountry}
                onSelectionChange={handleSelectionChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              rows={4}
              variant="filled"
              fullWidth
              {...register("userDesc")}
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          loadingIndicator="Processing…"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          <span>Save</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default EditProfileForm;
