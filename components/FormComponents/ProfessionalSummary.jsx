import { useContext } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataContext } from "../../pages/CVBuilder";

export default function ProfessionalSummary() {
  const getData = useContext(DataContext);

  const [professionalSummary, setProfessionalSummary] = getData.summary;
  const [completedSections, setCompletedSections] = getData.completed

  const handleInputChange = (e, inputKey) => {
    const { name, value } = e.target;
    let clone = [...professionalSummary];
    let obj = clone[inputKey];
    obj[name] = value;
    clone[inputKey] = obj;
    setProfessionalSummary([...clone]);
    calculateProfileCompleteness();

  };

  const calculateProfileCompleteness = () => {
    const allfieldsCompleted = professionalSummary.every(entry => Object.values(entry).every(field => field !== ""))

    if (allfieldsCompleted) {
      if (!completedSections.sections.includes("summary")) {
        setCompletedSections(prevState => ({
          ...prevState,
          sections: [...prevState.sections, "summary"]
        }));
      }
    } else {
      if (completedSections.sections.includes("summary")) {
        setCompletedSections(prevState => ({
          ...prevState,
          sections: prevState.sections.filter(section => section !== "summary")
        }));
      }
    }
  }

  return (
    <Box>
      <Typography
        sx={{
          width: "100%",
          marginTop: "50px",
          paddingBottom: "20px",
          fontWeight: "700",
          fontSize: "20px",
        }}
      >
        About
      </Typography>
      {professionalSummary.map((about, key) => (
        <Grid key={key} container columns={16} >
          <Grid item xs={16} sm={15} md={15} variant="contained">
            <Box
              sx={{
                height: "219px",
                overflow: "auto",
                borderColor: "#e7eaf4",
                borderRadius: "5px",
                backgroundColor: "#fff",
              }}
            >
              <TextField
                id="summary"
                name="summary"
                type="text"
                value={about.summary}
                multiline
                rows={8}
                sx={{ width: "100%" }}
                onChange={(e) => handleInputChange(e, key)}
              />
            </Box>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}
