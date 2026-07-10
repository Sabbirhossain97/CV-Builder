
import * as React from "react";
import { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import { DataContext } from "../../pages/CVBuilder";
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import Modal from '@mui/material/Modal';
import { modalStyles } from "../helpers/helpers";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Employment() {

  const getData = useContext(DataContext);
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [employmentDetails, setEmploymentDetails] = getData.employment;
  const [completedSections, setCompletedSections] = getData.completed
  const [disabledEditor, setDisabledEditor] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const showAlert = (message) => {
    setAlertOpen(true);
  };

  const handleAlertClose = (_, reason) => {
    if (reason === "clickaway") return;

    setAlertOpen(false);
  };

  const handleOk = () => {
    setOpenModal(false)
    setDisabledEditor(false)
  }
  const handleClose = () => {
    setOpenModal(false)
    setDisabledEditor(false)
  }

  const deleteAccordionSection = (id) => {
    const result = employmentDetails.filter((item, key) => {
      if (key !== id) {
        return item;
      }
    });
    setEmploymentDetails(result);
  };

  const modules = {
    toolbar: [
      [{ 'list': 'bullet' }],
      ['clean']
    ],
  };

  const addAccordionSection = () => {
    setEmploymentDetails([
      ...employmentDetails,
      {
        jobtitle: "",
        employer: "",
        startdate: "",
        enddate: "",
        ongoing: false,
        city: "",
        description: "",
      },
    ]);
  };

  const handleInputChange = (e, inputKey) => {
    const { name, value, checked, type } = e.target;

    const clone = [...employmentDetails];
    const currentEmployment = { ...clone[inputKey] };

    if (
      name === "enddate" &&
      currentEmployment.startdate &&
      value < currentEmployment.startdate
    ) {
      showAlert("End date cannot be earlier than start date.");
      return;
    }

    if (
      name === "startdate" &&
      currentEmployment.enddate &&
      !currentEmployment.ongoing &&
      value > currentEmployment.enddate
    ) {
      showAlert("Start date cannot be later than end date.");
      return;
    }

    currentEmployment[name] =
      type === "checkbox" ? checked : value;

    if (name === "ongoing") {
      currentEmployment.ongoing = checked;

      if (checked) {
        currentEmployment.enddate = "";
      }
    }

    clone[inputKey] = currentEmployment;

    setEmploymentDetails(clone);
    calculateProfileCompleteness(clone);
  };

  const handleDescriptionChange = (index, value) => {
    if (
      value.startsWith("<p>") &&
      value.endsWith("</p>") &&
      value !== "<p><br></p>"
    ) {
      setOpenModal(true);
      setDisabledEditor(true);
      return;
    }

    setDisabledEditor(false);

    const updatedEmploymentDetails = [...employmentDetails];

    updatedEmploymentDetails[index] = {
      ...updatedEmploymentDetails[index],
      description: value,
    };

    setEmploymentDetails(updatedEmploymentDetails);
    calculateProfileCompleteness(updatedEmploymentDetails);
  };

  const isDescriptionCompleted = (description = "") => {
    const plainText = description
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

    return plainText.length > 0;
  };

  const calculateProfileCompleteness = (details) => {
    const firstEntry = details[0];

    if (!firstEntry) return;

    const allFieldsCompleted =
      firstEntry.jobtitle.trim() !== "" &&
      firstEntry.employer.trim() !== "" &&
      firstEntry.startdate !== "" &&
      firstEntry.city.trim() !== "" &&
      isDescriptionCompleted(firstEntry.description) &&
      (firstEntry.ongoing || firstEntry.enddate !== "");

    setCompletedSections((prevState) => {
      const hasExperience =
        prevState.sections.includes("Experience");

      if (allFieldsCompleted && !hasExperience) {
        return {
          ...prevState,
          sections: [...prevState.sections, "Experience"],
        };
      }

      if (!allFieldsCompleted && hasExperience) {
        return {
          ...prevState,
          sections: prevState.sections.filter(
            (section) => section !== "Experience"
          ),
        };
      }

      return prevState;
    });
  };

  return (
    <Box >
      <Typography
        sx={{
          width: "100%",
          marginTop: "50px",
          paddingBottom: "20px",
          fontWeight: "700",
          fontSize: "20px",

        }}
      >
        Experience
      </Typography>

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyles}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{ color: '#ffc107' }}>
            Warning!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Bullet points only
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} variant="outlined" color="primary" sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button onClick={handleOk} variant="contained" color="primary">
              OK
            </Button>
          </Box>
        </Box>
      </Modal>

      <Box sx={{ display: 'flex', flexDirection: "column", gap: '10px', flexGrow: 1 }}>
        {employmentDetails.map((employment, key) => (
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
                    {employment.jobtitle ? employment.jobtitle : "(Not Specified)"}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid
                    container
                    rowSpacing={3}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={16} sm={16} md={6}>
                      <TextField
                        id="jobtitle"
                        label="Job title"
                        type="text"
                        value={employment.jobtitle}
                        name="jobtitle"
                        sx={{
                          width: "100%",
                          borderRadius: "5px",
                        }}
                        InputProps={{
                          disableunderline: true,
                        }}
                        onChange={(e) => handleInputChange(e, key)}
                      />
                    </Grid>
                    <Grid item xs={16} sm={16} md={6}>
                      <TextField
                        id="employer"
                        label="Employer"
                        type="text"
                        value={employment.employer}
                        name="employer"
                        sx={{
                          width: "100%",
                          borderRadius: "5px",
                        }}
                        InputProps={{
                          disableunderline: true,
                        }}
                        onChange={(e) => handleInputChange(e, key)}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: "flex", gap: "20px" }}>
                      <TextField
                        id="jobstartdate"
                        label="Start Date"
                        name="startdate"
                        value={employment.startdate}
                        type="month"
                        sx={{
                          borderRadius: "5px",
                          width: "50%",
                        }}
                        InputProps={{
                          disableunderline: true,
                        }}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleInputChange(e, key)}
                      />

                      <Box sx={{ width: "50%" }}>
                        <TextField
                          id="jobenddate"
                          label="End Date"
                          name="enddate"
                          value={employment.enddate}
                          type="month"
                          disabled={Boolean(employment.ongoing)}
                          sx={{
                            borderRadius: "5px",
                            width: "100%",
                          }}
                          InputProps={{
                            disableunderline: true,
                          }}
                          InputLabelProps={{ shrink: true }}
                          onChange={(e) => handleInputChange(e, key)}
                        />

                        <FormControlLabel
                          sx={{ mt: 0.5, ml: 0 }}
                          control={
                            <Checkbox
                              name="ongoing"
                              checked={Boolean(employment.ongoing)}
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
                        id="jobcity"
                        label="City"
                        type="text"
                        value={employment.city}
                        name="city"
                        sx={{
                          width: "100%",
                          borderRadius: "5px",
                        }}
                        InputProps={{
                          disableunderline: true,
                        }}
                        onChange={(e) => handleInputChange(e, key)}
                      />
                    </Grid>
                    <Grid item xs={16} md={12}>
                      <Typography>Description</Typography>
                      <ReactQuill
                        style={{ marginTop: '10px', background: "#fff" }}
                        value={employment.description}
                        modules={modules}
                        formats={['list']}
                        readOnly={disabledEditor}
                        onChange={(value) => handleDescriptionChange(key, value)}
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
              display: "flex",
              padding: "5px",
              borderRadius: "5px",
              "&:hover": {
                backgroundColor: "#e3f2fd",
                cursor: "pointer",
              },
            }}
            color="primary"
            onClick={addAccordionSection}
          >
            <AddIcon sx={{ fontSize: "20px" }} /> Add one more employment
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
            Start date cannot be later than end date.
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
