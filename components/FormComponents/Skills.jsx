import { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AntSwitch } from "../helpers/helpers";
import { DataContext } from "../../pages/CVBuilder";

export default function Skills() {
  const getData = useContext(DataContext);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [skillDetails, setSkillDetails] = getData.skills;
  const [showExpLevel, setShowExpLevel] = getData.skillExpLevel;
  const [completedSections, setCompletedSections] = getData.completed

  const deleteAccordionSection = (id) => {
    const result = skillDetails.filter((item, key) => {
      if (key !== id) {
        return item;
      }
    });
    setSkillDetails(result);
  };

  const addAccordionSection = () => {
    setSkillDetails([
      ...skillDetails,
      {
        skill: "",
        level: "",
      },
    ]);
  };

  const handleInputChange = (e, inputKey) => {
    const { name, value } = e.target;
    let clone = [...skillDetails];
    let obj = clone[inputKey];
    obj[name] = value;
    clone[inputKey] = obj;
    setSkillDetails([...clone]);
    calculateProfileCompleteness();
  };


  const calculateProfileCompleteness = () => {
    const firstEntry = skillDetails[0];

    if (firstEntry) {
      const allfieldsCompleted = Object.values(firstEntry).every(field => field !== "")

      if (allfieldsCompleted) {
        if (!completedSections.sections.includes("Skills")) {
          setCompletedSections(prevState => ({
            ...prevState,
            sections: [...prevState.sections, "Skills"]
          }));
        }
      } else {
        if (completedSections.sections.includes("Skills")) {
          setCompletedSections(prevState => ({
            ...prevState,
            sections: prevState.sections.filter(section => section !== "Skills")
          }));
        }
      }
    }
  }


  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        sx={{
          width: "33%",
          marginTop: "30px",
          paddingBottom: "20px",
          fontWeight: "700",
          fontSize: "20px",
        }}
      >
        Skills
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        style={{ marginTop: "-10px" }}
      >
        <AntSwitch
          defaultChecked={!showExpLevel}
          inputProps={{ "aria-label": "ant design" }}
          onChange={() => {
            setShowExpLevel(!showExpLevel);
          }}
        />
        <Typography sx={{ fontSize: "15px" }}>
          show experience level
        </Typography>
      </Stack>

      <Box sx={{ display: 'flex', flexDirection: "column", gap: '10px', marginTop: "15px", flexGrow: 1 }}>
        {skillDetails.map((skills, key) => (
          <Grid key={key} container columns={16} sx={{ display: 'flex', alignItems: 'center' }}>
            <Grid item xs={14} sm={15} md={15}>
              <Accordion
                expanded={expanded === key}
                onChange={handleChange(key)}
                sx={{
                  backgroundColor: "white",
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
                    {skills.skill ? skills.skill : "(Not Specified)"}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={15} sm={6} md={6}>
                      <TextField
                        id="skilltitle"
                        label="Skill"
                        type="text"
                        value={skills.skill}
                        name="skill"
                        sx={{
                          width: "100%",
                          borderRadius: "5px",
                        }}
                        onChange={(e) => handleInputChange(e, key)}
                      />
                    </Grid>
                    <Grid item xs={15} sm={6} md={6}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel
                          id="demo-simple-select-helper-label"
                        >
                          Level
                        </InputLabel>
                        <Select
                          id="skilllevel"
                          label="level"
                          disabled={showExpLevel ? true : false}
                          value={skills.level}
                          name="level"
                          onChange={(e) => handleInputChange(e, key)}
                        >
                          {[
                            {
                              value: 1,
                              name: "⭐",
                            },
                            {
                              value: 2,
                              name: "⭐⭐",
                            },
                            {
                              value: 3,
                              name: "⭐⭐⭐",
                            },
                            {
                              value: 4,
                              name: "⭐⭐⭐⭐",
                            },
                            {
                              value: 5,
                              name: "⭐⭐⭐⭐⭐",
                            },
                          ].map((item, key) => (
                            <MenuItem
                              defaultValue={skillDetails.level}
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
            <AddIcon sx={{ fontSize: "20px" }} /> Add one more skill
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
