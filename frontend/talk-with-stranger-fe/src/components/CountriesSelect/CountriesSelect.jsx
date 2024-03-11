import {
  Autocomplete,
  Box,
  ListItem,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

const CountriesSelect = ({ countries, value, onSelectionChange }) => {
  return (
    <Autocomplete
      disablePortal
      onChange={onSelectionChange}
      value={value || countries[0]}
      id="countries-select"
      options={countries}
      getOptionLabel={(option) => option.name}
      sx={{ width: "100%" }}
      renderInput={(params) => {
        return <TextField {...params} label="Your Country" />;
      }}
      renderOption={(props, option) => {
        return (
          <MenuItem {...props} sx={{ alignItems: "center" }}>
            <span
              style={{
                width: "50px",
                height: "100%",
              }}
            >
              <img
                style={{
                  padding: "0",
                  width: "30px",
                  maxHeight: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                srcSet={`https://flagcdn.com/w60/${option.Iso2.toLowerCase()}.png 2x`}
                src={`https://flagcdn.com/w40/${option.Iso2.toLowerCase()}.png`}
                alt=""
              />
            </span>
            <span>{option.name}</span>
          </MenuItem>
        );
      }}
    />
  );
};

export default CountriesSelect;
