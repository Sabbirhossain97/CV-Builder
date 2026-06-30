import * as React from "react";
import { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DataContext } from "../../pages/CVBuilder";
import Stack from "@mui/material/Stack";
import { AntSwitch } from "../helpers/helpers";

export default function Language({
  deleteCustomSection,
  sectionId,
}) {
  const getData = useContext(DataContext);
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [languageDetails, setLanguageDetails] = getData.languages;
  const [showLangLevel, setShowLangLevel] = getData.langLevel;

  const deleteAccordionSection = (id) => {
    const result = languageDetails.filter((item, key) => {
      if (key !== id) {
        return item;
      }
    });
    setLanguageDetails(result);
  };

  const addAccordionSection = () => {
    setLanguageDetails([
      ...languageDetails,
      {
        name: "",
        level: "",
      },
    ]);
  };
  const handleInputChange = (e, inputKey) => {
    const { name, value } = e.target;
    let clone = [...languageDetails];
    let obj = clone[inputKey];
    obj[name] = value;
    clone[inputKey] = obj;
    setLanguageDetails([...clone]);
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
            Language
          </Typography>
          <DeleteOutlineOutlinedIcon
            sx={{
              marginTop: "7px",
              marginLeft: "5px",
              fontSize: "18px",
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => {
              deleteCustomSection(sectionId);
              setLanguageDetails([
                {
                  name: "",
                  level: "",
                },
              ]);
            }}
          />
        </Grid>
      </Grid>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        style={{ marginTop: "5px" }}
      >
        <AntSwitch
          defaultChecked={!showLangLevel}
          inputProps={{ "aria-label": "ant design" }}
          onChange={() => {
            setShowLangLevel(!showLangLevel);
          }}
        />
        <Typography sx={{ fontSize: "15px" }}>
          show language level
        </Typography>
      </Stack>

      <Box sx={{ display: 'flex', flexDirection: "column", gap: '10px', flexGrow: 1 }}>
        {languageDetails.map((language, key) => (
          <Grid key={key} container columns={16} sx={{ display: 'flex', alignItems: 'center' }}>
            <Grid item xs={14} sm={15} md={15}>
              <Accordion
                expanded={expanded === key}
                onChange={handleChange(key)}
                sx={{
                  backgroundColor: "white",
                  marginTop: "10px",
                  boxShadow: "none",
                  border: "1px solid",
                  borderColor: "#e7eaf4",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color="#e7eaf4" />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ width: "100%", flexShrink: 0 }}>
                    {language.name ? language.name : "(Not Specified)"}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={16} sm={6} md={6}>
                      <TextField
                        id="languagetitle"
                        label="Language"
                        type="text"
                        name="name"
                        value={language.name}
                        sx={{
                          width: "100%",
                          borderRadius: "5px",
                        }}
                        onChange={(e) => handleInputChange(e, key)}
                      />
                    </Grid>
                    <Grid item xs={16} sm={6} md={6}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel id="demo-simple-select-helper-label">
                          Level
                        </InputLabel>
                        <Select
                          id="languagelevel"
                          label="level"
                          name="level"
                          disabled={showLangLevel ? true : false}
                          value={language.level}
                          onChange={(e) => handleInputChange(e, key)}
                        >
                          {[
                            {
                              value: 0,
                              name: "Native",
                            },
                            {
                              value: 1,
                              name: "Beginner",
                            },
                            {
                              value: 2,
                              name: "Intermediate",
                            },
                            {
                              value: 3,
                              name: "Advanced",
                            },
                            {
                              value: 4,
                              name: "Fluent",
                            },
                          ].map((item, key) => (
                            <MenuItem
                              defaultValue={language.level}
                              value={item.name}
                              key={key}
                            >
                              {item.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item md="auto">
              {key > 0 && <DeleteOutlineOutlinedIcon
                sx={{
                  marginLeft: "5px",
                  fontSize: {
                    xs: '20px',
                    md: '25px'
                  },
                  color: "red",
                  cursor: "pointer"
                }}
                onClick={() => deleteAccordionSection(key)}
              />}
            </Grid>
          </Grid>
        ))}
      </Box>
      <Grid container columns={16} sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid item xs={14} sm={15} md={15}>
          <Typography
            sx={{
              width: "100%",
              fontWeight: "700",
              marginTop: "10px",
              padding: "5px",
              display: "flex",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#e3f2fd",
                cursor: "pointer",
              },
            }}
            color="primary"
            onClick={addAccordionSection}
          >
            <AddIcon sx={{ fontSize: "20px" }} /> Add one more language
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
