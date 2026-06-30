import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import GTranslateOutlinedIcon from "@mui/icons-material/GTranslateOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import NordicWalkingOutlinedIcon from "@mui/icons-material/NordicWalkingOutlined";
import AppsIcon from '@mui/icons-material/Apps';
import Projects from "./Projects";
import ExtraCurricular from "./ExtraCurricular";
import Hobbies from "./Hobbies";
import Language from "./Language";
import References from "./References";
import { Reference } from "../SvgComponents/SVG";

export default function AddSection({
  customSection,
  setCustomSection,
  deleteCustomSection,
}) {


  const addSections = (sectionId, newSectionName) => {
    setCustomSection([
      ...customSection,
      { id: sectionId, name: newSectionName },
    ]);
  };

  const addSectionElements = [
    {
      id: 5,
      icon: (
        <AppsIcon
          style={{
            fontSize: "35px",
            ...{ color: customSection.map((item) => item.id).includes(5) ? "#bdbdbd" : "#1565c0" },
          }}
          color="primary"
        />
      ),
      name: "Projects",
      component: (
        <Projects
          deleteCustomSection={deleteCustomSection}
          sectionId={5}
        />
      ),
    },
    {
      id: 6,
      icon: (
        <NordicWalkingOutlinedIcon
          color="primary"
          sx={{
            fontSize: "35px",
            ...{ color: customSection.map((item) => item.id).includes(6) ? "#bdbdbd" : "#1565c0" },
          }}
        />
      ),
      name: "Extra-Curricular Activities",
      component: (
        <ExtraCurricular
          deleteCustomSection={deleteCustomSection}
          sectionId={6}
        />
      ),
    },
    {
      id: 7,
      icon: (
        <SportsEsportsOutlinedIcon
          color="primary"
          sx={{
            fontSize: "35px",
            ...{ color: customSection.map((item) => item.id).includes(7) ? "#bdbdbd" : "#1565c0" },
          }}
        />
      ),
      name: "Hobbies",
      component: (
        <Hobbies
          deleteCustomSection={deleteCustomSection}
          sectionId={7}
        />
      ),
    },
    {
      id: 8,
      icon: (
        <GTranslateOutlinedIcon
          color="primary"
          sx={{
            fontSize: "35px",
            ...{ color: customSection.map((item) => item.id).includes(8) ? "#bdbdbd" : "#1565c0" },
          }}
        />
      ),
      name: "Languages",
      component: (
        <Language
          deleteCustomSection={deleteCustomSection}
          sectionId={8}
        />
      ),
    },
    {
      id: 9,
      icon: (
        <Reference customSection={customSection} />
      ),
      name: "References",
      component: (
        <References
          deleteCustomSection={deleteCustomSection}
          sectionId={9}
        />
      ),
    },
  ];

  return (
    <Box>
      <Typography
        sx={{
          width: "33%",
          marginTop: "50px",
          paddingBottom: "20px",
          fontWeight: "700",
          fontSize: "20px",
        }}
      >
        Add Section
      </Typography>
      <Grid
        container
        rowSpacing={1}
        columns={16}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{  }}
      >
        {addSectionElements.map((item) => (
          <Grid
            key={item.id}
            container
            item
            xs={10}
            sm={10}
            md={10}
            lg={6}
            sx={{ width: "30%", padding: "10px" }}
          >
            <Grid>{item.icon}</Grid>
            <Grid
              item
              md="auto"
              sx={{
                marginLeft: "10px",
                marginTop: "6px",
                fontSize: "18px",
                fontWeight: "400",
                "&:hover": {
                  color: "#2196f3",
                  cursor: "pointer",
                },
                ...{
                  pointerEvents: customSection.map((section) => section.id).includes(item.id) ? "none" : "auto",
                },
                ...{
                  color: customSection.map((section) => section.id).includes(item.id) ? "#bdbdbd" : "primary",
                },
              }}
              onClick={() => {
                addSections(item.id, item.component);
              }}
            >
              {item.name}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
