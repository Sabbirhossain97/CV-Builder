import Template from "./Template";
import React, { useEffect } from 'react'
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

const isFilledValue = (value) => {
  if (typeof value === "string") return value.trim() !== "";
  if (typeof value === "boolean") return true;
  if (typeof value === "number") return Number.isFinite(value);
  if (Array.isArray(value)) {
    return value.length > 0 && value.every(isFilledValue);
  }
  if (value && typeof value === "object") {
    const values = Object.values(value);
    return values.length > 0 && values.every(isFilledValue);
  }

  return value !== null && value !== undefined;
};

const hasCompletedEntry = (section) =>
  Array.isArray(section) &&
  section.some((entry) => {
    if (!entry || typeof entry !== "object") return false;

    const values = Object.entries(entry)
      .filter(([key]) => key !== "id")
      .map(([, value]) => value);

    return values.length > 0 && values.every(isFilledValue);
  });

const getCompletedSections = (resume) => {
  const sections = [
    ["Personal Details", resume["personal Details"]],
    ["Summary", resume.summary],
    ["Employment", resume.Experience],
    ["Education", resume.Education],
    ["Social", resume.Socials],
    ["Skills", resume.Skills],
  ];

  return sections
    .filter(([, sectionData]) => hasCompletedEntry(sectionData))
    .map(([sectionName]) => sectionName);
};

const blobUrlToBase64 = async (blobUrl) => {
  if (!blobUrl) return "";

  if (blobUrl.startsWith("data:image/")) {
    return blobUrl;
  }

  const response = await fetch(blobUrl);

  if (!response.ok) {
    throw new Error("Failed to read the uploaded image.");
  }

  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to convert image."));

    reader.readAsDataURL(blob);
  });
};

const TemplateView = () => {
  const targetRef = useRef();
  const [colors, setColors] = useState("");
  const { imageUrls, personalInformation, summary, employment, education, socials, skills, project, certification, extraCurricular, languages, hobbies, reference, skillExpLevel, langLevel, previewTemplate, completed, profileCompleteness } = useContext(DataContext);
  const [{ firstname, lastname, email, phone, country, city, occupation, postalcode }] = personalInformation[0]
  const [picture] = imageUrls[0];
  const [{ summary: about }] = summary[0];
  const { hobbies: interests } = hobbies[0];
  const [showTemplate, setShowTemplate] = previewTemplate;
  const [tabValue, setTabValue] = React.useState('template_1');
  const [open, setOpen] = useState(false);
  const [openDraft, setOpenDraft] = useState(false);
  const [imageURLs, setImageURLs] = imageUrls;
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
  const importInputRef = useRef(null);

  const buildResumeData = async () => {
    let savedProfileImage = "";

    if (imageURLs?.[0]) {
      savedProfileImage = await blobUrlToBase64(imageURLs[0]);
    }

    const cleanSocialLinks = socialLinksDetails.map((social) => ({
      type: social.type || social.label?.toLowerCase() || "",
      label: social.label || "",
      linkurl: social.linkurl || "",
    }));

    return {
      version: 1,
      exportedAt: new Date().toISOString(),

      profileImage: savedProfileImage,
      "personal Details": personalDetails,
      summary: professionalSummary,
      Experience: employmentDetails,
      Education: educationDetails,
      Socials: cleanSocialLinks,
      Skills: skillDetails,
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
  };

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

  const saveResume = async () => {
    try {
      setSaveLoading(true);

      let savedProfileImage = "";

      if (imageURLs?.[0]) {
        savedProfileImage = await blobUrlToBase64(imageURLs[0]);
      }

      const cleanSocialLinks = socialLinksDetails.map((social) => ({
        type: social.type || social.label?.toLowerCase() || "",
        label: social.label || "",
        linkurl: social.linkurl || "",
      }));

      const resumeData = {
        profileImage: savedProfileImage,
        "personal Details": personalDetails,
        summary: professionalSummary,
        Experience: employmentDetails,
        Education: educationDetails,
        Socials: cleanSocialLinks,
        Skills: skillDetails,
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

      localStorage.setItem(
        "cv-builder-resume-data",
        JSON.stringify(resumeData)
      );

      setOpen(true);
    } catch (error) {
      console.error("Save resume error:", error);
      alert("Failed to save the resume draft.");
    } finally {
      setSaveLoading(false);
    }
  };

  const loadResumeDraft = () => {
    const savedResume = localStorage.getItem(
      "cv-builder-resume-data"
    );

    if (!savedResume) {
      setLoadingDraftMessage("No saved resume found.");
      return;
    }

    try {
      const parsedResume = JSON.parse(savedResume);

      restoreResumeData(parsedResume);

      setLoadingDraftMessage("Draft loaded successfully.");
    } catch (error) {
      console.error("Load resume error:", error);
      setLoadingDraftMessage("Failed to load the draft.");
    }
  };

  const loadResume = () => {
    setLoadingDraft(true)
    setTimeout(() => {
      setLoadingDraft(false);
      setOpenDraft(true);
      setLoadingDraftMessage("Draft loaded successfully")
      loadResumeDraft()
    }, 1500)
  };

  const exportJSON = async () => {
    if (profileCompleteness !== 100) {
      return;
    }

    try {
      const resumeData = await buildResumeData();

      const jsonString = JSON.stringify(resumeData, null, 2);

      const blob = new Blob([jsonString], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      const firstName =
        personalDetails?.[0]?.firstname?.trim() || "cv";

      const lastName =
        personalDetails?.[0]?.lastname?.trim() || "resume";

      link.href = url;
      link.download = `${firstName}-${lastName}-cv-data.json`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("JSON export failed:", error);
      alert("Failed to export the CV data.");
    }
  };

  const restoreResumeData = (resumeData) => {
    if (!resumeData || typeof resumeData !== "object") {
      throw new Error("Invalid CV data.");
    }

    if (
      typeof resumeData.profileImage === "string" &&
      resumeData.profileImage.startsWith("data:image/")
    ) {
      setImageURLs([resumeData.profileImage]);
    } else {
      setImageURLs([]);
    }

    setPersonalDetails(
      resumeData["personal Details"] || personalDetails
    );

    setProfessionalSummary(
      resumeData.summary || professionalSummary
    );

    setEmploymentDetails(
      resumeData.Experience || employmentDetails
    );

    setEducationDetails(
      resumeData.Education || educationDetails
    );

    const cleanedSocialLinks = (
      resumeData.Socials || socialLinksDetails
    ).map((social) => ({
      type: social.type || social.label?.toLowerCase() || "",
      label: social.label || "",
      linkurl: social.linkurl || "",
    }));

    setSocialLinksDetails(cleanedSocialLinks);
    setSkillDetails(resumeData.Skills || skillDetails);
    setProjectDetails(resumeData.projectDetails || projectDetails);
    setCertifications(resumeData.certifications || certifications);

    setExtraCurricularDetails(
      resumeData.extraCurricularDetails || extraCurricularDetails
    );

    setLanguageDetails(
      resumeData.languageDetails || languageDetails
    );

    setHobbiesDetails(
      resumeData.hobbiesDetails || hobbiesDetails
    );

    setReferenceDetails(
      resumeData.referenceDetails || referenceDetails
    );

    if (typeof resumeData.showExpLevel === "boolean") {
      setShowExpLevel(resumeData.showExpLevel);
    }

    if (typeof resumeData.showLangLevel === "boolean") {
      setShowLangLevel(resumeData.showLangLevel);
    }

    if (typeof resumeData.selectedTemplate === "string") {
      setTabValue(resumeData.selectedTemplate);
    }
  };

  const importJSON = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (loadEvent) => {
      try {
        const parsedData = JSON.parse(loadEvent.target.result);

        restoreResumeData(parsedData);

        setLoadingDraftMessage("CV data imported successfully.");
        setOpenDraft(true);
      } catch (error) {
        console.error("JSON import failed:", error);
        alert("The selected file does not contain valid CV data.");
      } finally {
        event.target.value = "";
      }
    };

    reader.onerror = () => {
      alert("Failed to read the JSON file.");
      event.target.value = "";
    };

    reader.readAsText(file);
  };

  const handleClose = () => setOpen(false);
  const handleCloseLoadDraftModal = () => setOpenDraft(false);

  return (
    <div className="h-full w-full">
      <div className="relative bg-gray-200">
        <div className="absolute top-5 left-0 z-20 w-full px-3">
          <Box sx={{ borderRadius: 2, width: '100%' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="CV template selection"
              textColor="primary"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                width: '100%',

                '& .MuiTab-root': {
                  minWidth: {
                    xs: 50,
                    sm: 120,
                  },
                  flexShrink: 0,
                },

                '& .MuiTabs-flexContainer': {
                  justifyContent: {
                    xs: 'center',
                    md: 'center',
                  },
                },
              }}
            >
              <Tab label="Temp 1" value="template_1" />
              <Tab label="Temp 2" value="template_2" />
              <Tab label="Temp 3" value="template_3" />
              <Tab label="Temp 4" value="template_4" />
            </Tabs>
          </Box>
        </div>
        {tabValue === "template_1" ?
          <Template
            save={saveResume}
            load={loadResume}
            loading={saveLoading}
            exportJSON={exportJSON}
            importJSON={importJSON}
            draftLoading={loadingDraft}
          /> : tabValue === "template_2" ?
            <Template2
              save={saveResume}
              load={loadResume}
              loading={saveLoading}
              exportJSON={exportJSON}
              importJSON={importJSON}
              draftLoading={loadingDraft}
            /> : tabValue === "template_3" ?
              <Template3
                save={saveResume}
                load={loadResume}
                loading={saveLoading}
                exportJSON={exportJSON}
                importJSON={importJSON}
                draftLoading={loadingDraft}
              /> : <Template4
                save={saveResume}
                load={loadResume}
                loading={saveLoading}
                exportJSON={exportJSON}
                importJSON={importJSON}
                draftLoading={loadingDraft}
              />}
        <Tooltip title="Form" placement="top">
          <div
            onClick={() => setShowTemplate(!showTemplate)}
            className="scale-75 sm:scale-100 z-100 p-[15px] rounded-full bg-blue-500 hover:bg-blue-400 cursor-pointer fixed bottom-[10px] sm:bottom-[25px] sm:right-[15px] right-[5px] custom-end:hidden">
            <Form />
          </div>
        </Tooltip>
        <button className="absolute bottom-0">test</button>
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