import * as React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DataContext } from "../../pages/CVBuilder";

export default function PersonalDetails() {
  const getData = useContext(DataContext);
  const [stateValue, setStateValue] = getData.personalInformation;

  const [completedSections, setCompletedSections] = getData.completed

  const handleInputChange = (e, inputKey) => {
    const { name, value } = e.target;
    let clone = [...stateValue];
    let obj = clone[inputKey];
    obj[name] = value;
    clone[inputKey] = obj;
    setStateValue([...clone]);
    calculateProfileCompleteness();
  };

  const calculateProfileCompleteness = () => {
    const allfieldsCompleted = stateValue.every(entry => Object.values(entry).every(field => field !== ""))

    if (allfieldsCompleted) {
      if (!completedSections.sections.includes("personal Details")) {
        setCompletedSections(prevState => ({
          ...prevState,
          sections: [...prevState.sections, "personal Details"]
        }));
      }
    } else {
      if (completedSections.sections.includes("personal Details")) {
        setCompletedSections(prevState => ({
          ...prevState,
          sections: prevState.sections.filter(section => section !== "personal Details")
        }));
      }
    }
  }

  return (
    <Box >
      {stateValue.map((item, key) => (
        <Box key={key} style={{ marginTop: "40px" }}>
          <Typography
            sx={{
              width: "33%",
              paddingBottom: "20px",
              fontWeight: "700",
              fontSize: "20px",
              whiteSpace: "nowrap"
            }}
          >
            Personal Details
          </Typography>

          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 3, sm: 2, md: 4 }}
            columns={15}
          >
            <Grid item xs={15} sm={7} md={7}>
              <TextField
                id="firstname"
                label="First Name"
                name="firstname"
                value={item.firstname}
                type="text"
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  
                }}
                onChange={(e) => handleInputChange(e, key)}
              />
            </Grid>
            <Grid item xs={15} sm={7} md={7}>
              <TextField
                id="lastname"
                label="Last Name"
                name="lastname"
                value={item.lastname}
                type="text"
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                }}
                onChange={(e) => handleInputChange(e, key)}
              />
            </Grid>
            <Grid item xs={15} sm={7} md={7}>
              <TextField
                id="email"
                label="Email"
                name="email"
                value={item.email}
                type="email"
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                }}
                InputProps={{
                  autoComplete: 'off'
                }}
                onChange={(e) => handleInputChange(e, key)}
              />
            </Grid>
            <Grid item xs={15} sm={7} md={7}>
              <TextField
                id="phone"
                label="Phone"
                name="phone"
                value={item.phone}
                type="tel"
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                }}
                InputProps={{
                  autoComplete: 'off'
                }}
                onChange={(e) => handleInputChange(e, key)}
              />
            </Grid>
            <Grid item xs={15} sm={7} md={7}>
              <TextField
                id="country"
                label="Country"
                name="country"
                value={item.country}
                type="text"
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                }}
                InputProps={{
                  autoComplete: 'off'
                }}
                onChange={(e) => handleInputChange(e, key)}
              />
            </Grid>
            <Grid item xs={15} sm={7} md={7}>
              <TextField
                id="city"
                label="City"
                name="city"
                value={item.city}
                type="text"
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={(e) => handleInputChange(e, key)}
              />
            </Grid>
            <Grid item xs={15} sm={7} md={7}>
              <TextField
                id="occupation"
                label="Occupation"
                name="occupation"
                type="text"
                value={item.occupation}
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={(e) => handleInputChange(e, key)}
              />
            </Grid>
            <Grid item xs={15} sm={7} md={7}>
              <TextField
                id="postalcode"
                label="Postal Code"
                name="postalcode"
                type="text"
                value={item.postalcode}
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={(e) => handleInputChange(e, key)}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
