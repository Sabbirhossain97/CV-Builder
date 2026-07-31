import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import Footer from "../Footer/Footer";

const features = [
  {
    title: "Easy Resume Builder",
    description:
      "Build your professional resume step by step with a simple and user-friendly editor.",
    icon: DescriptionOutlinedIcon,
    color: "#2563eb",
    background: "#eff6ff",
  },
  {
    title: "Live Resume Preview",
    description:
      "See your changes instantly while editing and know exactly how your final resume will look.",
    icon: VisibilityOutlinedIcon,
    color: "#7c3aed",
    background: "#f5f3ff",
  },
  {
    title: "Templates and Styling",
    description:
      "Choose from different templates and personalize your resume using custom colors and fonts.",
    icon: PaletteOutlinedIcon,
    color: "#db2777",
    background: "#fdf2f8",
  },
  {
    title: "Save and Load Drafts",
    description:
      "Save your resume progress as a draft and continue editing it later without starting over.",
    icon: SaveOutlinedIcon,
    color: "#059669",
    background: "#ecfdf5",
  },
  {
    title: "Import and Export JSON",
    description:
      "Export your resume data as a JSON file and import it whenever you want to restore your content.",
    icon: ImportExportOutlinedIcon,
    color: "#d97706",
    background: "#fffbeb",
  },
  {
    title: "Print and Download",
    description:
      "Print your completed resume or download a clean, professional PDF completely free.",
    icon: DownloadOutlinedIcon,
    color: "#0891b2",
    background: "#ecfeff",
  },
];

const steps = [
  {
    number: "01",
    title: "Add your information",
    description:
      "Complete your profile, education, employment, skills, and other resume sections.",
  },
  {
    number: "02",
    title: "Customize the design",
    description:
      "Select a template, choose your preferred font, and customize the resume colors.",
  },
  {
    number: "03",
    title: "Download your resume",
    description:
      "Review the live preview and print or download your finished professional resume.",
  },
];

const faqs = [
  {
    question: "Is the resume builder free to use?",
    answer:
      "Yes. You can create, customize, print, and download your resume without paying any fee.",
  },
  {
    question: "Can I save my resume and continue later?",
    answer:
      "Yes. The Save Draft option stores your current resume progress. You can load the saved draft later and continue editing.",
  },
  {
    question: "What is the JSON import and export feature?",
    answer:
      "The Import JSON option lets you restore previously exported resume data. The Export JSON button becomes available only when your profile reaches 100% completeness by completing all 7 core resume sections. Once available, you can export your resume data as a reusable JSON file.",
  },
  {
    question: "Can I customize the resume design?",
    answer:
      "Yes. You can choose from different resume templates and personalize the appearance using the available font and color options.",
  },
  {
    question: "Can I see changes while editing?",
    answer:
      "Yes. The live preview updates as you edit your information, allowing you to review the resume before downloading it.",
  },
  {
    question: "How can I download my resume?",
    answer:
      "After completing your resume, use the Print and Download option to save it as a PDF or print it directly.",
  },
];

export default function Home() {
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        color: "#0f172a",
        overflow: "hidden",
      }}
    >
      {/* Hero section */}
      <Box
        component="section"
        sx={{
          position: "relative",
          pt: { xs: 10, sm: 12, md: 16 },
          pb: { xs: 9, md: 14 },
          background:
            "linear-gradient(180deg, #eff6ff 0%, #ffffff 85%)",
        }}
      >
        {/* Decorative backgrounds */}
        <Box
          sx={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 320,
            height: 320,
            borderRadius: "50%",
            backgroundColor: "rgba(37, 99, 235, 0.08)",
            filter: "blur(8px)",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 40,
            right: -140,
            width: 360,
            height: 360,
            borderRadius: "50%",
            backgroundColor: "rgba(124, 58, 237, 0.08)",
            filter: "blur(8px)",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative" }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "minmax(0, 1fr) minmax(380px, 0.85fr)",
              },
              alignItems: "center",
              gap: { xs: 7, md: 10 },
            }}
          >
            {/* Hero content */}
            <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 0.8,
                  mb: 3,
                  borderRadius: "999px",
                  color: "#1d4ed8",
                  backgroundColor: "#dbeafe",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                <CheckCircleOutlineIcon sx={{ fontSize: "18px" }} />
                Free online resume builder
              </Box>

              <Typography
                component="h1"
                sx={{
                  maxWidth: "760px",
                  mx: { xs: "auto", md: 0 },
                  fontSize: {
                    xs: "38px",
                    sm: "50px",
                    md: "58px",
                  },
                  lineHeight: 1.1,
                  letterSpacing: "-0.04em",
                  fontWeight: 800,
                }}
              >
                Build a resume that helps you{" "}
                <Box component="span" sx={{ color: "#2563eb" }}>
                  stand out
                </Box>
              </Typography>

              <Typography
                sx={{
                  maxWidth: "640px",
                  mx: { xs: "auto", md: 0 },
                  mt: 3,
                  color: "#475569",
                  fontSize: { xs: "17px", sm: "19px" },
                  lineHeight: 1.75,
                }}
              >
                Create, customize, save, and download a professional resume
                with live preview, multiple templates, and flexible styling
                options.
              </Typography>

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { xs: "center", md: "flex-start" },
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Button
                  component={Link}
                  href="/CVBuilder"
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    minHeight: "52px",
                    px: 3.5,
                    borderRadius: "10px",
                    backgroundColor: "#2563eb",
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 700,
                    boxShadow: "0 12px 25px rgba(37, 99, 235, 0.25)",
                    "&:hover": {
                      backgroundColor: "#1d4ed8",
                      boxShadow: "0 14px 28px rgba(37, 99, 235, 0.32)",
                    },
                  }}
                >
                  Create Your Resume
                </Button>

                <Button
                  href="#features"
                  variant="outlined"
                  sx={{
                    minHeight: "52px",
                    px: 3.5,
                    borderRadius: "10px",
                    borderColor: "#cbd5e1",
                    color: "#334155",
                    textTransform: "none",
                    fontSize: "16px",
                    fontWeight: 700,
                    "&:hover": {
                      borderColor: "#2563eb",
                      backgroundColor: "#eff6ff",
                    },
                  }}
                >
                  Explore Features
                </Button>
              </Box>

              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                  flexWrap: "wrap",
                  gap: { xs: 2, sm: 3 },
                  color: "#64748b",
                }}
              >
                {["No payment required", "Multiple templates", "PDF download"].map(
                  (item) => (
                    <Box
                      key={item}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                      }}
                    >
                      <CheckCircleOutlineIcon
                        sx={{ color: "#16a34a", fontSize: "20px" }}
                      />

                      <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                        {item}
                      </Typography>
                    </Box>
                  )
                )}
              </Box>
            </Box>

            {/* Resume preview */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: "510px",
                mx: "auto",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: { xs: 10, sm: 18 },
                  borderRadius: "24px",
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  transform: "rotate(4deg)",
                  opacity: 0.18,
                }}
              />

              <Box
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  p: { xs: 1, sm: 1.5 },
                  border: "1px solid #e2e8f0",
                  borderRadius: "20px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 30px 70px rgba(15, 23, 42, 0.18)",
                }}
              >
                <Image
                  src="/Images/sample.jpg"
                  alt="Professional resume preview"
                  priority
                  width={750}
                  height={750}
                  layout="responsive"
                  objectFit="contain"
                />
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  left: { xs: -5, sm: -35 },
                  bottom: { xs: -30, sm: 35 },
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  px: 2,
                  py: 1.5,
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0 15px 35px rgba(15, 23, 42, 0.15)",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 40,
                    height: 40,
                    borderRadius: "10px",
                    color: "#ffffff",
                    backgroundColor: "#16a34a",
                  }}
                >
                  <CheckCircleOutlineIcon />
                </Box>

                <Box>
                  <Typography sx={{ fontSize: "13px", color: "#64748b" }}>
                    Resume status
                  </Typography>

                  <Typography sx={{ fontWeight: 700 }}>
                    Ready to download
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features */}
      <Box
        id="features"
        component="section"
        sx={{
          py: { xs: 9, md: 13 },
          scrollMarginTop: "30px",
        }}
      >
        <Container maxWidth="lg">
          <SectionHeading
            label="Powerful features"
            title="Everything you need to build your resume"
            description="From entering your information to choosing a design and downloading the final PDF, everything is available in one place."
          />

          <Box
            sx={{
              mt: { xs: 5, md: 7 },
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(3, minmax(0, 1fr))",
              },
              gap: 3,
            }}
          >
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Box
                  key={feature.title}
                  sx={{
                    height: "100%",
                    p: { xs: 3, sm: 3.5 },
                    border: "1px solid #e2e8f0",
                    borderRadius: "18px",
                    backgroundColor: "#ffffff",
                    transition:
                      "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      borderColor: "#bfdbfe",
                      boxShadow: "0 20px 45px rgba(15, 23, 42, 0.09)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      width: 54,
                      height: 54,
                      mb: 2.5,
                      borderRadius: "14px",
                      color: feature.color,
                      backgroundColor: feature.background,
                    }}
                  >
                    <Icon sx={{ fontSize: "29px" }} />
                  </Box>

                  <Typography
                    component="h3"
                    sx={{
                      mb: 1.2,
                      fontSize: "20px",
                      fontWeight: 750,
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.75,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* How it works */}
      <Box
        id="how-it-works"
        component="section"
        sx={{
          py: { xs: 9, md: 13 },
          backgroundColor: "#f8fafc",
        }}
      >
        <Container maxWidth="lg">
          <SectionHeading
            label="How it works"
            title="Create your resume in three simple steps"
            description="You do not need design experience. Add your information, customize the appearance, and download your resume."
          />

          <Box
            sx={{
              mt: { xs: 5, md: 7 },
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: 3,
            }}
          >
            {steps.map((step) => (
              <Box
                key={step.number}
                sx={{
                  position: "relative",
                  p: { xs: 3, sm: 4 },
                  border: "1px solid #e2e8f0",
                  borderRadius: "18px",
                  backgroundColor: "#ffffff",
                }}
              >
                <Typography
                  sx={{
                    mb: 2,
                    color: "#2563eb",
                    fontSize: "38px",
                    lineHeight: 1,
                    fontWeight: 800,
                    opacity: 0.25,
                  }}
                >
                  {step.number}
                </Typography>

                <Typography
                  component="h3"
                  sx={{
                    mb: 1.2,
                    fontSize: "21px",
                    fontWeight: 750,
                  }}
                >
                  {step.title}
                </Typography>

                <Typography sx={{ color: "#64748b", lineHeight: 1.75 }}>
                  {step.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* FAQ */}
      <Box
        id="faq"
        component="section"
        sx={{
          py: { xs: 9, md: 13 },
        }}
      >
        <Container maxWidth="md">
          <SectionHeading
            label="FAQ"
            title="Frequently asked questions"
            description="Find answers to common questions about creating, saving, customizing, and downloading your resume."
          />

          <Box sx={{ mt: { xs: 5, md: 7 } }}>
            {faqs.map((faq) => (
              <Accordion
                key={faq.question}
                disableGutters
                elevation={0}
                sx={{
                  mb: 2,
                  overflow: "hidden",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px !important",
                  backgroundColor: "#ffffff",
                  "&::before": {
                    display: "none",
                  },
                  "&.Mui-expanded": {
                    borderColor: "#bfdbfe",
                    boxShadow: "0 10px 25px rgba(15, 23, 42, 0.06)",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#2563eb" }} />}
                  sx={{
                    minHeight: "68px",
                    px: { xs: 2.5, sm: 3 },
                    "& .MuiAccordionSummary-content": {
                      my: 2,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      pr: 2,
                      fontSize: { xs: "16px", sm: "17px" },
                      fontWeight: 700,
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails
                  sx={{
                    px: { xs: 2.5, sm: 3 },
                    pt: 0,
                    pb: 3,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#64748b",
                      lineHeight: 1.75,
                    }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box
        component="section"
        sx={{
          px: 2,
          pb: { xs: 9, md: 13 },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            overflow: "hidden",
            px: { xs: 3, sm: 6, md: 10 },
            py: { xs: 7, md: 9 },
            borderRadius: { xs: "20px", md: "28px" },
            textAlign: "center",
            color: "#ffffff",
            background:
              "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #6d28d9 100%)",
            boxShadow: "0 25px 60px rgba(37, 99, 235, 0.25)",
          }}
        >
          <Typography
            component="h2"
            sx={{
              position: "relative",
              fontSize: { xs: "30px", sm: "40px" },
              lineHeight: 1.2,
              fontWeight: 800,
            }}
          >
            Ready to create your professional resume?
          </Typography>

          <Typography
            sx={{
              position: "relative",
              maxWidth: "650px",
              mx: "auto",
              mt: 2,
              color: "rgba(255,255,255,0.82)",
              fontSize: { xs: "16px", sm: "18px" },
              lineHeight: 1.7,
            }}
          >
            Start building your resume today and download it when you are
            ready. It is simple, customizable, and completely free.
          </Typography>

          <Button
            component={Link}
            href="/CVBuilder"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              position: "relative",
              mt: 4,
              minHeight: "52px",
              px: 4,
              borderRadius: "10px",
              color: "#1d4ed8",
              backgroundColor: "#ffffff",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 750,
              "&:hover": {
                backgroundColor: "#f8fafc",
              },
            }}
          >
            Build My Resume
          </Button>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

function SectionHeading({ label, title, description }) {
  return (
    <Box sx={{ maxWidth: "760px", mx: "auto", textAlign: "center" }}>
      <Typography
        sx={{
          mb: 1.5,
          color: "#2563eb",
          fontSize: "14px",
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </Typography>

      <Typography
        component="h2"
        sx={{
          fontSize: { xs: "30px", sm: "38px", md: "44px" },
          lineHeight: 1.2,
          letterSpacing: "-0.03em",
          fontWeight: 800,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          mt: 2,
          color: "#64748b",
          fontSize: { xs: "16px", sm: "18px" },
          lineHeight: 1.75,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}