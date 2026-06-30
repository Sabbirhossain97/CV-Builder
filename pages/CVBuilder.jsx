import React from "react";
import Head from "next/head";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useState, useEffect } from "react";
import PersonalDetails from "../components/FormComponents/PersonalDetails";
import Education from "../components/FormComponents/Education";
import SocialLinks from "../components/FormComponents/SocialLinks";
import Employment from "../components/FormComponents/Employment";
import ProfessionalSummary from "../components/FormComponents/ProfessionalSummary";
import Skills from "../components/FormComponents/Skills";
import AddSection from "../components/FormComponents/AddSection";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TemplateView from "../components/Template/TemplateView";
import ImageUpload from "../components/FormComponents/ImageUpload";
import LoadingAnimation from "../components/StyleComponents/LoadingAnimation";
import { Preview } from "../components/SvgComponents/SVG";
import Template from "../components/Template/Template";
import Tooltip from '@mui/material/Tooltip';
import { Home } from "../components/SvgComponents/SVG";
import LinearProgress from '@mui/material/LinearProgress';
import { Button, Typography } from "@mui/material";
import { useRouter } from 'next/router';
import Modal from '@mui/material/Modal';
import { modalStyles } from "../components/helpers/helpers";

export const DataContext = React.createContext();

export default function CVBuilder() {
  const router = useRouter();
  const [delay, setDelay] = useState(0);
  setTimeout(() => setDelay(1), 1000);
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  const [personalDetails, setPersonalDetails] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      occupation: "",
      postalcode: "",
    },
  ]);
  const [professionalSummary, setProfessionalSummary] = useState([
    {
      summary: "",
    },
  ]);
  const [employmentDetails, setEmploymentDetails] = useState([
    {
      jobtitle: "",
      employer: "",
      startdate: "",
      enddate: "",
      city: "",
      description: "",
    },
  ]);
  const [educationDetails, setEducationDetails] = useState([
    {
      institution: "",
      degree: "",
      startdate: "",
      enddate: "",
      institutioncity: "",
    },
  ]);
  const [socialLinksDetails, setSocialLinksDetails] = useState([
    {
      icon: "",
      label: "",
      linkurl: "",
    },
  ]);
  const [skillDetails, setSkillDetails] = useState([
    {
      skill: "",
      level: "",
    },
  ]);

  const [projectDetails, setProjectDetails] = useState([
    {
      projecttitle: "",
      startdate: "",
      enddate: "",
      description: "",
    },
  ]);

  const [extraCurricularDetails, setExtraCurricularDetails] = useState([
    {
      title: "",
      institution: "",
      startdate: "",
      enddate: "",
      role: "",
      description: "",
    },
  ]);
  const [languageDetails, setLanguageDetails] = useState([
    {
      name: "",
      level: "",
    },
  ]);
  const [hobbiesDetails, setHobbiesDetails] = useState({ hobbies: "" });
  const [referenceDetails, setReferenceDetails] = useState([
    {
      referrername: "",
      position: "",
      organization: "",
      address: "",
      phone: "",
      email: ""
    }
  ])

  const [allSections, setAllSections] = useState([
    {
      id: 1,
      name: <Employment />,
    },
    {
      id: 2,
      name: <Education />,
    },
    {
      id: 3,
      name: <SocialLinks />,
    },
    {
      id: 4,
      name: <Skills />,
    },
  ]);

  const [customSection, setCustomSection] = useState([])
  const [showExpLevel, setShowExpLevel] = useState(false);
  const [showLangLevel, setShowLangLevel] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false)
  const [windowWidth, setWindowWidth] = useState(null);
  const [completedSections, setCompletedSections] = useState({
    sections: []
  });
  const [profileCompleteness, setProfileCompleteness] = useState(null)
  const [progressBarColor, setProgressBarColor] = useState('red');
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const deleteCustomSection = (sectionId) => {
    setCustomSection(prevSections => prevSections.filter(section => section.id !== sectionId))
  };

  useEffect(() => {
    const completed = completedSections.sections.length;
    const totalSections = 7;
    setProfileCompleteness(Math.round((completed / totalSections * 100).toFixed(2)))
  }, [completedSections])

  useEffect(() => {
    if (profileCompleteness < 50) {
      setProgressBarColor('red')
    } else if (profileCompleteness > 50 && profileCompleteness < 80) {
      setProgressBarColor('#f57f17')
    } else if (profileCompleteness > 80) {
      setProgressBarColor('green')
    }
  }, [profileCompleteness, progressBarColor])


  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOk = () => {
    router.push('/');
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return delay === 0 ? (
    <LoadingAnimation />
  ) : (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
          },
          position: {
            lg: 'relative'
          },
          height: "100%",
        }}

      >

        <Head>
          <title>CV Builder</title>
        </Head>
        <DataContext.Provider
          value={{
            image: [images, setImages],
            imageUrls: [imageURLs, setImageURLs],
            personalInformation: [personalDetails, setPersonalDetails],
            summary: [professionalSummary, setProfessionalSummary],
            employment: [employmentDetails, setEmploymentDetails],
            education: [educationDetails, setEducationDetails],
            socials: [socialLinksDetails, setSocialLinksDetails],
            skills: [skillDetails, setSkillDetails],
            project: [projectDetails, setProjectDetails],
            extraCurricular: [extraCurricularDetails, setExtraCurricularDetails],
            languages: [languageDetails, setLanguageDetails],
            hobbies: [hobbiesDetails, setHobbiesDetails],
            reference: [referenceDetails, setReferenceDetails],
            skillExpLevel: [showExpLevel, setShowExpLevel],
            langLevel: [showLangLevel, setShowLangLevel],
            previewTemplate: [showTemplate, setShowTemplate],
            completed: [completedSections, setCompletedSections]
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "100%",
                lg: "50%",
                xl: "50%",
              },
              height: {
                lg: "100%",
                xl: "100%",
              },
              padding: {
                xs: '5%',
                lg: '2%',
                xl: '2%'
              },
              position: {
                sm: 'relative',
                lg: 'fixed',
                xl: 'fixed'
              },
              overflowY: {
                lg: 'scroll'
              },
              backgroundColor: "white",
            }}
          >

            {!showTemplate || windowWidth > 1199 ?
              <div
                className="animate-slide-from-left"
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingTop: {
                      xs: '20px',
                      sm: '0px'
                    },
                    margin: "auto",
                  }}>
                  <Box
                    sx={{
                      position: 'fixed',
                      top: 0,
                      left: {
                        xs: 0,
                        sm: 5,
                        md: 10,
                        lg: 15
                      },
                      width: {
                        xs: '100%',
                        sm: '90%',
                        lg: '45%'
                      },
                      zIndex: 1000,
                      padding: '25px',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      transition: 'background-color 0.3s ease',
                      ...(isScrolled && { backgroundColor: 'rgb(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' })
                    }}
                  >
                    <Typography>Profile Completeness <span style={{ color: progressBarColor }}>{profileCompleteness}</span>&nbsp;%</Typography>
                    <Box sx={{ marginTop: '15px' }}>
                      <LinearProgress
                        sx={{
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: progressBarColor
                          },
                          '& .MuiLinearProgress-root': {
                            backgroundColor: 'rgb(213 218 223)',
                          },
                        }}
                        variant="determinate"
                        value={profileCompleteness} />
                    </Box>
                  </Box>
                  <ImageUpload />
                  <PersonalDetails />
                  <ProfessionalSummary />
                  {allSections.map((item) => (
                    <List key={item.id}> {item.name}</List>
                  ))}
                  {customSection.map((item, index) => (
                    <List key={index}> {item.name}</List>
                  ))}
                  <AddSection
                    allSections={allSections}
                    setAllSections={setAllSections}
                    customSection={customSection}
                    setCustomSection={setCustomSection}
                    deleteCustomSection={deleteCustomSection}
                  />
                  <Button
                    sx={{
                      zIndex: 200,
                      cursor: "pointer",
                      position: "fixed",
                      bottom: {
                        xs: 85,
                        sm: 105
                      },
                      right: 20,
                      background: "linear-gradient(to right bottom, #64b5f6, #1565c0)",
                      borderRadius: "50%",
                      padding: '15px',
                      scale: {
                        xs: "75%",
                        sm: '100%'
                      }
                    }}
                    onClick={handleOpen}><Home /></Button>

                  {/* modal section */}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={modalStyles}>
                      <Typography id="modal-modal-title" variant="h6" component="h2">
                        Leaving the Page
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        All progress will be lost
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
                  <Tooltip title="Preview" placement="top">
                    <Box
                      onClick={() => setShowTemplate(!showTemplate)}
                      sx={{
                        zIndex: 200,
                        cursor: "pointer",
                        position: "fixed",
                        bottom: 25,
                        right: 20,
                        background: "linear-gradient(to right bottom, #64b5f6, #1565c0)",
                        borderRadius: "50%",
                        padding: '15px',
                        scale: {
                          xs: "75%",
                          sm: '100%'
                        }
                      }}
                    >
                      <Preview />
                    </Box>
                  </Tooltip>
                </Box>
              </div> : null}

            {showTemplate && windowWidth < 1199 ?
              <div className={`${showTemplate && windowWidth < 1199 && 'animate-slide-from-right'} z-100 absolute top-0 right-0 left-0 bottom-0 custom-end:hidden `}>
                <Template />
              </div> : null
            }
          </Box>
          {/* template section start */}
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "100%",
                lg: "50%",
                xl: "50%",
              },
              position: {
                lg: "fixed",
                xl: "fixed",
              },
              top: {
                lg: "0%",
                xl: 0,
              },
              right: 0,
              height: "100%",
            }}
          >
            <TemplateView />
          </Box>
          {/* template section end */}
        </DataContext.Provider >
      </Box >
    </>
  );
}
