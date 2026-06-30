import * as React from "react";
import { useState, useContext } from "react";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { DataContext } from "../../pages/CVBuilder";
import Modal from '@mui/material/Modal';
import { modalStyles } from "../helpers/helpers";

export default function Education() {
  const getData = useContext(DataContext);
  const [expanded, setExpanded] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("")
  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [educationDetails, setEducationDetails] = getData.education;
  const [completedSections, setCompletedSections] = getData.completed;

  const showAlert = (message) => {
    setAlertOpen(true);
  };

  const handleAlertClose = (_, reason) => {
    if (reason === "clickaway") return;

    setAlertOpen(false);
  };

  const deleteAccordionSection = (id) => {
    const result = educationDetails.filter((item, key) => {
      if (key !== id) {
        return item;
      }
    });
    setEducationDetails(result);
  };

  const addAccordionSection = () => {
    setEducationDetails([
      ...educationDetails,
      {
        institution: "",
        degree: "",
        startdate: "",
        enddate: "",
        ongoing: false,
        institutioncity: "",
      },
    ]);
  };

  const MIN_YEAR = 1900;
  const currentYear = new Date().getFullYear();

  const isValidYear = (year) => {
    if (!year) return true; 

    return (
      /^\d{4}$/.test(year) &&
      Number(year) >= MIN_YEAR &&
      Number(year) <= currentYear
    );
  };

  const handleInputChange = (e, inputKey) => {
    const { name, value, checked, type } = e.target;

    const clone = [...educationDetails];
    const currentEducation = { ...clone[inputKey] };

    const isYearField = name === "startdate" || name === "enddate";

    if (isYearField) {
      if (!/^\d{0,4}$/.test(value)) {
        return;
      }

      if (value.length === 4) {
        const numericYear = Number(value);

        if (numericYear < MIN_YEAR || numericYear > currentYear) {
          showAlert(`Please enter a valid year between ${MIN_YEAR} and ${currentYear}.`);
          return;
        }
      }

      if (
        name === "enddate" &&
        value.length === 4 &&
        currentEducation.startdate?.length === 4 &&
        Number(value) < Number(currentEducation.startdate)
      ) {
        setAlertMessage("End year cannot be earlier than start year.");
        setAlertOpen(true);
        return;
      }

      if (
        name === "startdate" &&
        value.length === 4 &&
        currentEducation.enddate?.length === 4 &&
        Number(value) > Number(currentEducation.enddate)
      ) {
        setAlertMessage("Start year cannot be later than end year.");
        setAlertOpen(true);
        return;
      }
    }

    currentEducation[name] = type === "checkbox" ? checked : value;

    if (name === "startdate" && Number(value) === currentYear) {
      currentEducation.ongoing = true;
      currentEducation.enddate = "";
    }

    if (name === "ongoing" && checked) {
      currentEducation.enddate = "";
    }

    clone[inputKey] = currentEducation;
    setEducationDetails(clone);
  };

  const calculateProfileCompleteness = () => {
    const firstEntry = educationDetails[0];

    if (firstEntry) {
      const allfieldsCompleted = Object.values(firstEntry).every(field => field !== "")
      if (allfieldsCompleted) {
        if (!completedSections.sections.includes("Education")) {
          setCompletedSections(prevState => ({
            ...prevState,
            sections: [...prevState.sections, "Education"]
          }));
        }
      } else {
        if (completedSections.sections.includes("Education")) {
          setCompletedSections(prevState => ({
            ...prevState,
            sections: prevState.sections.filter(section => section !== "Education")
          }));
        }
      }
    }

  }

  return (
    <Box >
      <Typography
        sx={{
          width: "33%",
          marginTop: "30px",
          paddingBottom: "20px",
          fontWeight: "700",
          fontSize: "20px",
        }}
      >
        Education
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: "column", gap: '10px', flexGrow: 1 }}>
        {educationDetails.map((education, key) => (
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
                  <Typography sx={{ width: "90%", flexShrink: 0 }}>
                    {education.institution ? education.institution : "(Not Specified)"}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={16} md={6}>
                      <TextField
                        id="educationinstitution"
                        label="Institution"
                        name="institution"
                        value={education.institution}
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
                    <Grid item xs={16} md={6}>
                      <TextField
                        id="educationdegree"
                        label="Degree"
                        name="degree"
                        value={education.degree}
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
                    <Grid item xs={12} md={6} sx={{ display: "flex", gap: '20px' }}>
                      <TextField
                        id="educationstartyear"
                        label="Start Year"
                        name="startdate"
                        value={education.startdate}
                        type="text"
                        inputProps={{
                          inputMode: "numeric",
                          maxLength: 4,
                          disableUnderline: true,
                        }}
                        sx={{
                          borderRadius: "5px",
                          width: '50%'
                        }}
                        error={
                          education.startdate !== "" &&
                          !isValidYear(education.startdate)
                        }
                        helperText={
                          education.startdate !== "" &&
                            !isValidYear(education.startdate)
                            ? `Enter a valid year up to ${currentYear}`
                            : ""
                        }
                        onChange={(e) => handleInputChange(e, key)}
                      />
                      <Box sx={{ width: "50%" }}>
                        <TextField
                          id="educationendyear"
                          label="End Year"
                          name="enddate"
                          value={education.enddate}
                          disabled={Boolean(education.ongoing)}
                          type="text"
                          inputProps={{
                            inputMode: "numeric",
                            maxLength: 4,
                          }}
                          error={
                            education.enddate !== "" &&
                            !isValidYear(education.enddate)
                          }
                          helperText={
                            education.enddate !== "" &&
                              !isValidYear(education.enddate)
                              ? `Enter a valid year up to ${currentYear}`
                              : ""
                          }
                          inputProps={{
                            inputMode: "numeric",
                            maxLength: 4,
                            disableUnderline: true,
                          }}
                          sx={{
                            width: '100%',
                            borderRadius: "5px",
                          }}
                          onChange={(e) => handleInputChange(e, key)}
                        />
                        <FormControlLabel
                          sx={{ mt: 0.5, ml: 0 }}
                          control={
                            <Checkbox
                              name="ongoing"
                              checked={Boolean(education.ongoing)}
                              onChange={(e) => handleInputChange(e, key)}
                              size="small"
                            />
                          }
                          label="Ongoing"
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={16} md={6}>
                      <TextField
                        id="educationcity"
                        label="City"
                        name="institutioncity"
                        type="text"
                        value={education.institutioncity}
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
            <AddIcon sx={{ fontSize: "20px" }} /> Add one more education
          </Typography>
        </Grid>
      </Grid>
      <Modal
        open={alertOpen}
        onClose={handleAlertClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyles}>
          <Typography id="modal-modal-title" variant="h7" component="h2">
            {alertMessage}
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleAlertClose} variant="outlined" color="primary" sx={{ mr: 1 }}>
              OK
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
