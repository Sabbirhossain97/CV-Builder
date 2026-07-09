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
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

function SortableSkillItem({
  skills,
  index,
  expanded,
  handleChange,
  handleInputChange,
  deleteAccordionSection,
  showExpLevel,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: skills.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: "relative",
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <Grid
      ref={setNodeRef}
      style={style}
      container
      columns={16}
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
      }}
    >
      {/* Drag handle */}
      <Grid item xs="auto">
        <Box
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "grab",
            color: "#8c8c8c",
            pr: 1,
            touchAction: "none",
            userSelect: "none",
            "&:active": {
              cursor: "grabbing",
            },
          }}
        >
          <DragIndicatorIcon />
        </Box>
      </Grid>

      <Grid item xs sx={{ minWidth: 0 }}>
        <Accordion
          expanded={expanded === skills.id}
          onChange={handleChange(skills.id)}
          sx={{
            backgroundColor: "white",
            boxShadow: "none",
            border: "1px solid #e7eaf4",
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ width: "100%" }}>
              {skills.skill || "(Not Specified)"}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Skill"
                  name="skill"
                  value={skills.skill}
                  fullWidth
                  onChange={(e) => handleInputChange(e, index)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Level</InputLabel>

                  <Select
                    label="Level"
                    name="level"
                    value={skills.level}
                    disabled={!showExpLevel}
                    onChange={(e) => handleInputChange(e, index)}
                  >
                    {["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"].map(
                      (level) => (
                        <MenuItem key={level} value={level}>
                          {level}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs="auto">
        {index > 0 && (
          <DeleteOutlineOutlinedIcon
            sx={{
              ml: 1,
              color: "red",
              cursor: "pointer",
            }}
            onClick={() => deleteAccordionSection(index)}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default function Skills() {
  const getData = useContext(DataContext);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (id) => (_, isExpanded) => {
    setExpanded(isExpanded ? id : false);
  };

  const [skillDetails, setSkillDetails] = getData.skills;
  const [showExpLevel, setShowExpLevel] = getData.skillExpLevel;
  const [completedSections, setCompletedSections] = getData.completed;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    setSkillDetails((currentSkills) => {
      const oldIndex = currentSkills.findIndex(
        (item) => item.id === active.id
      );

      const newIndex = currentSkills.findIndex(
        (item) => item.id === over.id
      );

      return arrayMove(currentSkills, oldIndex, newIndex);
    });
  };

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
        id: crypto.randomUUID(),
        skill: "",
        level: "",
        levelCount: null,
      },
    ]);
  };

  const handleInputChange = (e, inputKey) => {
    const { name, value } = e.target;
    let counter;
    switch(value){
      case "⭐":
         counter = 1;
         break;
      case "⭐⭐":
        counter = 2;
        break;
      case "⭐⭐⭐":
        counter = 3;
        break;
      case "⭐⭐⭐⭐":
        counter = 4;
        break;
      case "⭐⭐⭐⭐⭐":
        counter = 5;
        break;
    }
    let clone = [...skillDetails];
    let obj = clone[inputKey];
    obj[name] = value;
    obj["levelCount"] = counter
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
          defaultChecked={showExpLevel}
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={skillDetails.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "15px",
                flexGrow: 1,
              }}
            >
              {skillDetails.map((skills, index) => (
                <SortableSkillItem
                  key={skills.id}
                  skills={skills}
                  index={index}
                  expanded={expanded}
                  handleChange={handleChange}
                  handleInputChange={handleInputChange}
                  deleteAccordionSection={deleteAccordionSection}
                  showExpLevel={showExpLevel}
                />
              ))}
            </Box>
          </SortableContext>
        </DndContext>
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
