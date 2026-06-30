import { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataContext } from "../../pages/CVBuilder";
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function References({
    deleteCustomSection,
    sectionId,
}) {
    const getData = useContext(DataContext);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (_, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [referenceDetails, setReferenceDetails] = getData.reference;

    const deleteAccordionSection = (id) => {
        const result = referenceDetails.filter((item, key) => {
            if (key !== id) {
                return item;
            }
        });
        setReferenceDetails(result);
    };

    const addAccordionSection = () => {
        setReferenceDetails([
            ...referenceDetails,
            {
                referrername: "",
                position: "",
                organization: "",
                address: "",
                phone: "",
                email: ""
            }
        ]);
    };

    const handleInputChange = (e, inputKey) => {
        const { name, value } = e.target;
        let clone = [...referenceDetails];
        let obj = clone[inputKey];
        obj[name] = value;
        clone[inputKey] = obj;
        setReferenceDetails([...clone]);
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
                        References
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
                            setReferenceDetails([
                                {
                                    referrername: "",
                                    position: "",
                                    organization: "",
                                    address: "",
                                    phone: "",
                                    email: ""
                                }
                            ]);
                        }}
                    />
                </Grid>
            </Grid>

            <Box sx={{ display: 'flex', flexDirection: "column", gap: '10px', flexGrow: 1 }}>
                {referenceDetails.map((reference, key) => (
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
                                        {reference.referrername ? reference.referrername : "(Not Specified)"}
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
                                                id="referrername"
                                                label="Referrer name"
                                                name="referrername"
                                                value={reference.referrername}
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
                                                id="position"
                                                label="Position"
                                                name="position"
                                                value={reference.position}
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
                                                id="organization"
                                                label="Organization"
                                                name="organization"
                                                value={reference.organization}
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
                                                id="referreremail"
                                                label="Email"
                                                name="email"
                                                type="text"
                                                value={reference.email}
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
                                                id="referrerphone"
                                                label="Phone"
                                                name="phone"
                                                type="text"
                                                value={reference.phone}
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
                                                id="referreraddress"
                                                label="Address"
                                                name="address"
                                                type="text"
                                                value={reference.address}
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
                        <AddIcon sx={{ fontSize: "20px" }} /> Add one more course
                    </Typography>
                </Grid>
            </Grid>
        </Box >
    );
}
