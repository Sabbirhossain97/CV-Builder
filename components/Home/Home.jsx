import React from "react";
import Image from "next/legacy/image";
import Button from "@mui/material/Button";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import HandymanIcon from "@mui/icons-material/Handyman";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import Footer from "../Footer/Footer";

export default function Home() {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "200px",
          width: {
            xs: "100%",
            sm: "100%",
            md: "100%",
            lg: "100%",
            xl: "100%",
          },
        }}
      >
        <Typography
          sx={{
            paddingBottom: "20px",
            fontWeight: "700",
            fontSize: "40px",
            textAlign: "center",
          }}
        >
          Build a professional resume for free
        </Typography>
        <Typography
          sx={{ fontSize: "20px", fontWeight: "400", textAlign: "center" }}
        >
          Create your resume easily with this free builder
        </Typography>
        <Link href="/CVBuilder" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            component="span"
            sx={{
              marginTop: "25px",
              background: "#1976d2",
              ":hover": {
                background: "#0d47a1",
              },
            }}
          >
            <Typography>Create Resume</Typography>
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          background: "#e6ecf7",
          display: "flex",
          flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row'
          },
          justifyContent: "center",
          marginTop: "150px",
          flexWrap: {
            xs: 'wrap',
            sm: 'wrap',
            md: 'nowrap'
          },
          position: "relative",
          padding: "25px",
        }}
      >
        <Box
          style={{
            width: {
              xs: '100%',
              sm: '100%',
              md: '50%'
            },
            display: 'flex',
          }}
        >
          <Image
            src="/Images/sample.jpg"
            alt="cv"
            priority
            width={750}
            height={750}
            layout="intrinsic"
          />
        </Box>
        <Box
          style={{
            width: {
              xs: '100%',
              sm: '100%',
              md: '50%'
            },
            padding: "20px",
            fontSize: "25px",
            fontFamily: "Segoe UI",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "30px",
              width: "100%",
              gap: '15px',
            }}
          >
            <HandymanIcon
              style={{ width: "32px", height: "32px", opacity: "0.6" }}
            />
            <Typography
              style={{
                fontWeight: "600",
                fontSize: {
                  xs: '15px',
                  sm: "18px",
                  md: '20px',
                  lg: '25px'
                },
                textAlign: "left",
              }}
            >
              Build your resume easily with step by step
            </Typography>
          </Box>
          <Box
            style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}
          >
            <PictureAsPdfIcon
              style={{ width: "32px", height: "32px", opacity: "0.6" }}
            />
            <Typography
              style={{
                marginLeft: "19px",
                fontWeight: "600",
                fontSize: {
                  xs: '15px',
                  sm: "18px",
                  md: '20px',
                  lg: '25px'
                },
              }}
            >
              Live PDF Viewer
            </Typography>
          </Box>
          <Box
            style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}
          >
            <DownloadOutlinedIcon
              style={{ width: "32px", height: "32px", opacity: "0.6" }}
            />
            <Typography
              style={{
                marginLeft: "15px",
                fontWeight: "600",
                fontSize: {
                  xs: '15px',
                  sm: "18px",
                  md: '20px',
                  lg: '25px'
                },
              }}
            >
              Free Download
            </Typography>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
