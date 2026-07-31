import * as React from "react";
import { useState, useContext } from "react";
import { Select } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from '@mui/material/InputLabel';
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { DataContext } from "../../pages/CVBuilder";
import { Facebook, LinkedIn, Github, Website } from "../SvgComponents/SVG";

export default function SocialLinks() {
  const getData = useContext(DataContext);
  const [expanded, setExpanded] = useState(false);
  const [linkErrors, setLinkErrors] = useState({});
  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const isValidUrl = (value) => {
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol);
    } catch {
      return false;
    }
  };

  const [socialSites, setSocialSites] = getData.socials;

  const deleteAccordionSection = (id) => {
    const result = socialSites.filter((item, key) => {
      if (key !== id) {
        return item;
      }
    });
    setSocialSites(result);
  };

  const addAccordionSection = () => {
    setSocialSites([
      ...socialSites,
      {
        icon: "",
        label: "",
        linkurl: "",
      },
    ]);
  };

  const handleInputChange = (e, inputKey) => {
    const { name, value } = e.target;
    let clone = [...socialSites];
    console.log(name,value)
    let obj = clone[inputKey];

    const getIconForLabel = (label) => {
      switch (label) {
        case "Facebook":
          return <Facebook />;
        case "LinkedIn":
          return <LinkedIn />;
        case "Website":
          return <Website />;
        case "Github":
          return <Github />
        default:
          return "";
      }
    };
    obj[name] = value;
    obj.icon = getIconForLabel(obj.label);
    clone[inputKey] = obj;
    setSocialSites([...clone]);
  };

  return (
    <div>
      <Box sx={{}}>
        <Typography
          sx={{
            width: "33%",
            marginTop: "30px",
            paddingBottom: "20px",
            fontWeight: "700",
            fontSize: "20px",
            whiteSpace: 'nowrap'
          }}
        >
          Websites & Social Links
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: "column", gap: '10px', flexGrow: 1 }}>
          {socialSites.map((social, key) => (
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
                      {social.label ? social.label : "(Not Specified)"}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid
                      container
                      rowSpacing={3}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Grid item xs={15} sm={6} md={6}>
                        <FormControl sx={{ width: "100%" }}>
                          <InputLabel
                            id="demo-simple-select-label"
                          >
                            Socials
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={social.label}
                            name="label"
                            sx={{
                              width: "100%",
                              borderRadius: "5px",
                            }}
                            label="label"
                            onChange={(e) => handleInputChange(e, key)}
                          >
                            {[
                              {
                                name: "Website",
                              },
                              {
                                name: "Facebook",
                              },
                              {
                                name: "LinkedIn",
                              },
                              {
                                name: "Github",
                              },
                            ].map((item, key) => (
                              <MenuItem
                                defaultValue={social.label}
                                value={item.name}
                                key={key}
                              >
                                {item.icon}
                                {item.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={15} sm={6} md={6}>
                        <TextField
                          id={`socialslink-${key}`}
                          label="Link"
                          placeholder="https://example.com"
                          type="url"
                          name="linkurl"
                          value={social.linkurl}
                          error={Boolean(linkErrors[key])}
                          helperText={linkErrors[key] || " "}
                          sx={{
                            width: "100%",
                            borderRadius: "5px",
                          }}
                          onChange={(e) => {
                            const value = e.target.value;

                            handleInputChange(e, key);

                            setLinkErrors((prev) => ({
                              ...prev,
                              [key]:
                                value.trim() === ""
                                  ? ""
                                  : isValidUrl(value)
                                    ? ""
                                    : "Enter a valid URL starting with http:// or https://",
                            }));
                          }}
                          onBlur={(e) => {
                            const value = e.target.value.trim();

                            setLinkErrors((prev) => ({
                              ...prev,
                              [key]:
                                value === ""
                                  ? "Link is required"
                                  : isValidUrl(value)
                                    ? ""
                                    : "Enter a valid URL starting with http:// or https://",
                            }));
                          }}
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
              <AddIcon sx={{ fontSize: "20px" }} /> Add one more link
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
