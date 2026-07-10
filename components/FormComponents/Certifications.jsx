import { useState, useContext } from "react";
import Typography from "@mui/material/Typography";
import { Button, Autocomplete, Chip } from "@mui/material";
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
import Modal from '@mui/material/Modal';
import { modalStyles } from "../helpers/helpers";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function Projects({
    deleteCustomSection,
    sectionId,
}) {
    const getData = useContext(DataContext);
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (_, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const [certifications, setCertifications] = getData.certification;
    const [disabledEditor, setDisabledEditor] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [liveLinkErrors, setLiveLinkErrors] = useState({});
    const [githubLinkErrors, setGithubLinkErrors] = useState({});

    const isValidUrl = (value) => {
        try {
            const url = new URL(value);
            return ["http:", "https:"].includes(url.protocol);
        } catch {
            return false;
        }
    };

    console.log('Certifications:', certifications)

    const handleOk = () => {
        setOpenModal(false)
        setDisabledEditor(false)
    }

    const handleClose = () => {
        setOpenModal(false)
        setDisabledEditor(false)
    }

    const modules = {
        toolbar: [
            [{ 'list': 'bullet' }],
            [{ 'link': 'link' }],
            ['clean']
        ],
    };

    const customStyles = {
        'link': {
            color: 'blue',
            textDecoration: 'underline'
        }
    };

    const deleteAccordionSection = (id) => {
        const result = certifications.filter((item, key) => {
            if (key !== id) {
                return item;
            }
        });
        setCertifications(result);
    };

    const addAccordionSection = () => {
        setCertifications([
            ...certifications,
            {
                title: "",
                organization: "",
                issueDate: "",
                credentialUrl: "",
                description: ""
            },
        ]);
    };

    const handleInputChange = (e, inputKey) => {
        const { name, value } = e.target;
        let clone = [...certifications];
        let obj = clone[inputKey];
        obj[name] = value;
        clone[inputKey] = obj;
        setCertifications([...clone]);
    };

    const handleDescriptionChange = (index, value) => {
        if ((value.startsWith("<p>") && value.endsWith("</p>") && value !== "<p><br></p>")) {
            setOpenModal(true)
            setDisabledEditor(true)
        }
        else {
            setDisabledEditor(false)
            const updatedCertifications = [...certifications];
            updatedCertifications[index].description = value;
            setCertifications(updatedCertifications);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
            <Grid container item md={6}>
                <Grid container item md={6}>
                    <Typography
                        sx={{
                            fontWeight: "700",
                            fontSize: "20px",
                            paddingBottom: "10px",
                        }}
                    >
                        Certifications
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
                            setCertifications([
                                {
                                    title: "",
                                    organization: "",
                                    issueDate: "",
                                    credentialUrl: "",
                                    description: ""
                                },
                            ]);
                        }}
                    />
                </Grid>
            </Grid>

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
                {certifications.map((certificate, key) => (
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
                                        {certificate.title ? certificate.title : "(Not Specified)"}
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
                                                id="title"
                                                label="Certificate Title"
                                                type="text"
                                                value={certificate.title}
                                                name="title"
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
                                                label="Issuer Organization"
                                                type="text"
                                                value={certificate.organization}
                                                name="organization"
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
                                        <Grid item xs={16} sm={16} md={6}>
                                            <TextField
                                                id="issueDate"
                                                label="Issue Date"
                                                name="issueDate"
                                                value={certificate.issueDate}
                                                type="month"
                                                sx={{
                                                    borderRadius: "5px",
                                                    width: {
                                                        xs: '100%',
                                                        sm: '100%'
                                                    }
                                                }}
                                                InputLabelProps={{ shrink: true }}
                                                onChange={(e) => handleInputChange(e, key)}
                                            />
                                        </Grid>
                                        <Grid item xs={16} sm={16} md={6}>
                                            <TextField
                                                id="credentialUrl"
                                                label="Credential Url"
                                                placeholder="https://example.com"
                                                type="url"
                                                name="credentialUrl"
                                                value={certificate.credentialUrl}
                                                error={Boolean(liveLinkErrors[key])}
                                                helperText={liveLinkErrors[key] || " "}
                                                fullWidth
                                                sx={{
                                                    borderRadius: "5px",
                                                    flex: 1,
                                                }}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    handleInputChange(e, key);

                                                    setLiveLinkErrors((prev) => ({
                                                        ...prev,
                                                        [key]:
                                                            value.trim() === ""
                                                                ? ""
                                                                : isValidUrl(value)
                                                                    ? ""
                                                                    : "Enter a valid URL starting with http:// or https://",
                                                    }));
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={16} md={12}>
                                            <Typography>Description</Typography>
                                            <ReactQuill
                                                style={{ marginTop: '10px', background: "#fff" }}
                                                value={certificate.description}
                                                modules={modules}
                                                formats={['list', 'link']}
                                                styles={customStyles}
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
                        <AddIcon sx={{ fontSize: "20px" }} /> Add one more certification
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}
