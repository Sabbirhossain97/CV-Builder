import Template from "./Template";
import React from 'react'
import { useState, useContext, useRef } from 'react'
import { DataContext } from '../../pages/CVBuilder'
import { Form, Email, Phone, Location } from '../SvgComponents/SVG';
import { months, parseDescription, parseProjectDetails, parseActivityDetails, colorPicker, dateConverter } from '../helpers/helpers';
import ReactToPrint from 'react-to-print';
import Tooltip from '@mui/material/Tooltip';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Image from 'next/image';
import Template2 from './Template2';
import Template3 from "./Template3";
import Template4 from "./Template4";
import Modal from '@mui/material/Modal';
import { modalStyles } from "../helpers/helpers";
import { Button, Typography } from "@mui/material";

const TemplateView = () => {
  const targetRef = useRef();
  const [colors, setColors] = useState("");
  const { imageUrls, personalInformation, summary, employment, education, socials, skills, project, certification, extraCurricular, languages, hobbies, reference, skillExpLevel, langLevel, previewTemplate } = useContext(DataContext);
  const [{ firstname, lastname, email, phone, country, city, occupation, postalcode }] = personalInformation[0]
  const [picture] = imageUrls[0];
  const [{ summary: about }] = summary[0];
  const { hobbies: interests } = hobbies[0];
  const [showTemplate, setShowTemplate] = previewTemplate;
  const [tabValue, setTabValue] = React.useState('template_1');
  const [open, setOpen] = useState(false);
  const [openDraft, setOpenDraft] = useState(false);
  const [personalDetails, setPersonalDetails] = personalInformation;
  const [professionalSummary, setProfessionalSummary] = summary;
  const [employmentDetails, setEmploymentDetails] = employment;
  const [educationDetails, setEducationDetails] = education;
  const [socialLinksDetails, setSocialLinksDetails] = socials;
  const [skillDetails, setSkillDetails] = skills;
  const [projectDetails, setProjectDetails] = project;
  const [extraCurricularDetails, setExtraCurricularDetails] = extraCurricular;
  const [certifications, setCertifications] = certification;
  const [languageDetails, setLanguageDetails] = languages;
  const [hobbiesDetails, setHobbiesDetails] = hobbies;
  const [referenceDetails, setReferenceDetails] = reference;
  const [showLangLevel, setShowLangLevel] = langLevel;
  const [showExpLevel, setShowExpLevel] = skillExpLevel;
  const [saveLoading, setSaveLoading] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(false);
  const [loadingDraftMessage, setLoadingDraftMessage] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleColorChange = (name) => {
    setColors(name)
  }

  const cleanSocialLinks = socialLinksDetails.map((social) => ({
    type:
      social.type ||
      social.label?.toLowerCase() ||
      "",
    label: social.label || "",
    linkurl: social.linkurl || "",
  }));

  const saveResume = () => {
    const cleanSocialLinks = socialLinksDetails.map((social) => ({
      type: social.type || social.label?.toLowerCase() || "",
      label: social.label || "",
      linkurl: social.linkurl || "",
    }));

    setSaveLoading(true)
    setTimeout(() => {
      setSaveLoading(false);
      setOpen(true);
    }, 1500)

    const resumeData = {
      personalDetails,
      professionalSummary,
      employmentDetails,
      educationDetails,
      socialLinksDetails: cleanSocialLinks,
      skillDetails,
      projectDetails,
      certifications,
      extraCurricularDetails,
      languageDetails,
      hobbiesDetails,
      referenceDetails,
      showExpLevel,
      showLangLevel,
      selectedTemplate: tabValue,
    };

    localStorage.setItem("cv-builder-resume-data", JSON.stringify(resumeData));
  };

  const loadResumeDraft = () => {
    const savedResume = localStorage.getItem("cv-builder-resume-data");

    if (!savedResume) {
      setLoadingDraftMessage("No saved resume found.");
      return;
    }
    
    try {
      const parsedResume = JSON.parse(savedResume);

      const cleanedSocialLinks = (parsedResume.socialLinksDetails || socialLinksDetails).map(
        (social) => ({
          type: social.type || social.label?.toLowerCase() || "",
          label: social.label || "",
          linkurl: social.linkurl || "",
        })
      );

      setPersonalDetails(parsedResume.personalDetails || personalDetails);
      setProfessionalSummary(parsedResume.professionalSummary || professionalSummary);
      setEmploymentDetails(parsedResume.employmentDetails || employmentDetails);
      setEducationDetails(parsedResume.educationDetails || educationDetails);
      setSocialLinksDetails(cleanedSocialLinks);
      setSkillDetails(parsedResume.skillDetails || skillDetails);
      setProjectDetails(parsedResume.projectDetails || projectDetails);
      setCertifications(parsedResume.certifications || certifications);
      setExtraCurricularDetails(parsedResume.extraCurricularDetails || extraCurricularDetails);
      setLanguageDetails(parsedResume.languageDetails || languageDetails);
      setHobbiesDetails(parsedResume.hobbiesDetails || hobbiesDetails);
      setReferenceDetails(parsedResume.referenceDetails || referenceDetails);

      setShowExpLevel(
        typeof parsedResume.showExpLevel === "boolean"
          ? parsedResume.showExpLevel
          : showExpLevel
      );

      setShowLangLevel(
        typeof parsedResume.showLangLevel === "boolean"
          ? parsedResume.showLangLevel
          : showLangLevel
      );

    } catch (error) {
      console.error("Load resume error:", error);
    }
  }

  const loadResume = () => {
    setLoadingDraft(true)
    setTimeout(() => {
      setLoadingDraft(false);
      setOpenDraft(true);
      setLoadingDraftMessage("Draft loaded successfully")
      loadResumeDraft()
    }, 1500)
  };

  const handleClose = () => setOpen(false);
  const handleCloseLoadDraftModal = () => setOpenDraft(false);

  return (
    <div className="h-full w-full">
      <div className="relative bg-gray-200">
        <div className="absolute top-5 left-1/2 z-20 -translate-x-1/2">
          <Box
            sx={{
              borderRadius: 2,
              px: 1,
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="CV template selection"
              textColor="primary"
              indicatorColor="primary"
            >
              <Tab label="Template 1" value="template_1" />
              <Tab label="Template 2" value="template_2" />
              <Tab label="Template 3" value="template_3" />
              <Tab label="Template 4" value="template_4" />
            </Tabs>
          </Box>
        </div>
        {tabValue === "template_1" ? <Template save={saveResume} load={loadResume} loading={saveLoading} draftLoading={loadingDraft} /> : tabValue === "template_2" ? <Template2 save={saveResume} load={loadResume} loading={saveLoading} draftLoading={loadingDraft} /> : tabValue === "template_3" ? <Template3 save={saveResume} load={loadResume} loading={saveLoading} draftLoading={loadingDraft} /> : <Template4 save={saveResume} load={loadResume} loading={saveLoading} draftLoading={loadingDraft} />}
        <Tooltip title="Form" placement="top">
          <div
            onClick={() => setShowTemplate(!showTemplate)}
            className="scale-75 sm:scale-100 z-100 p-[15px] rounded-full bg-blue-500 hover:bg-blue-400 cursor-pointer fixed bottom-[10px] sm:bottom-[25px] sm:right-[15px] right-[5px] custom-end:hidden">
            <Form />
          </div>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyles}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Resume saved successfully
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleClose} variant="outlined" color="primary" sx={{ mr: 1 }}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
        {/* Draft loader modal */}
        <Modal
          open={openDraft}
          onClose={handleCloseLoadDraftModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyles}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
             {loadingDraftMessage}
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleCloseLoadDraftModal} variant="outlined" color="primary" sx={{ mr: 1 }}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default TemplateView;
