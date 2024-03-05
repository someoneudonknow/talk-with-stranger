import React from "react";
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

const flags = [
  { name: "Afghanistan", code: "AF" },
  { name: "Åland Islands", code: "AX" },
  { name: "Albania", code: "AL" },
];

const EditProfileForm = ({ onSubmit }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
              size="small"
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
              size="small"
              fullWidth
              {...register("editLastName", {
                required: "This field can't be empty",
              })}
              error={!!errors.editLastName}
              helperText={errors.editLastName?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="userDob"
              rules={{
                validate: (value) =>
                  value?.isBefore(moment()) || "Invalid date",
              }}
              render={({ field }) => {
                return (
                  <DatePicker
                    label="Date"
                    value={field.value}
                    inputRef={field.ref}
                    onChange={(date) => {
                      field.onChange(date);
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.userDob,
                        helperText: errors?.userDob?.message,
                      },
                    }}
                  />
                );
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="edit-country">Country</InputLabel>
              <Select labelId="edit-country" label="Country" fullWidth required>
                {flags.map((country, i) => (
                  <MenuItem key={i} value={country.code}>
                    <img
                      style={{
                        height: "30px",
                      }}
                      src={`https://flagsapi.com/${country.code}/flat/64.png`}
                    />
                    <Box component="span" ml={1}>
                      {country.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              multiline
              rows={4}
              defaultValue="Description"
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
