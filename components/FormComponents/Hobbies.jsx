import React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { DataContext } from "../../pages/CVBuilder";
import { Button, Autocomplete, Chip } from "@mui/material";

export default function Hobbies({
  deleteCustomSection,
  sectionId,
}) {
  const getData = useContext(DataContext);
  const [hobbiesDetails, setHobbiesDetails] = getData.hobbies;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHobbiesDetails({ [name]: value });
  };


  return (
    <Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
      <Grid container item md={6}>
        <Grid container item md={4}>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "20px",
              paddingBottom: "10px",
            }}
          >
            Hobbies
          </Typography>
          <DeleteOutlineOutlinedIcon
            sx={{
              marginTop: "7px",
              marginLeft: "5px",
              fontSize: "18px",
              color: "red",
              cursor: 'pointer'
            }}
            onClick={() => {
              deleteCustomSection(sectionId);
              setHobbiesDetails({ hobbies: [] });
            }}
          />
        </Grid>
      </Grid>

      <Grid container columns={16}>
        <Grid item xs={15} md={15}>
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={hobbiesDetails}
            onChange={(_, newValue) => {

              // let updatedHobbies= Array.from(
              //   new Set(
              //     newValue
              //       .map((item) => item.trim())
              //       .filter(Boolean)
              //   )
              // );

              setHobbiesDetails(newValue);
            }}
            renderTags={(value, getTagProps) =>
              value.map((item, index) => (
                <Chip
                  label={item}
                  {...getTagProps({ index })}
                  key={`${item}-${index}`}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="What do you like?"
                placeholder="Write something and press Enter"
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
