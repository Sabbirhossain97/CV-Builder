import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Navbar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        height: "80px",
        justifyContent: "center",
        color: "#0f172a",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderBottom: "1px solid rgba(226, 232, 240, 0.9)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        zIndex: 1200,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            minHeight: "80px !important",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            href="/"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.2,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                width: 44,
                height: 44,
                overflow: "hidden",
                borderRadius: "11px",
                backgroundColor: "#eff6ff",
                boxShadow: "0 6px 15px rgba(37, 99, 235, 0.12)",
              }}
            >
              <Image
                src="/favicon.ico"
                alt="CV Builder logo"
                width={38}
                height={38}
                priority
              />
            </Box>

            <Typography
              component="span"
              sx={{
                fontSize: { xs: "18px", sm: "21px" },
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              CV{" "}
              <Box component="span" sx={{ color: "#2563eb" }}>
                Builder
              </Box>
            </Typography>
          </Box>

          {/* Desktop navigation */}
          <Box
            component="nav"
            aria-label="Main navigation"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 4,
            }}
          >
            <Typography
              component="a"
              href="/#features"
              sx={navLinkStyles}
            >
              Features
            </Typography>

            <Typography
              component="a"
              href="/#how-it-works"
              sx={navLinkStyles}
            >
              How It Works
            </Typography>

            <Typography
              component="a"
              href="/#faq"
              sx={navLinkStyles}
            >
              FAQ
            </Typography>
          </Box>

          {/* CTA */}
          <Button
            component={Link}
            href="/CVBuilder"
            variant="contained"
            endIcon={
              <ArrowForwardIcon
                sx={{ display: { xs: "none", sm: "block" } }}
              />
            }
            sx={{
              minHeight: { xs: "42px", sm: "46px" },
              px: { xs: 2, sm: 2.8 },
              borderRadius: "9px",
              backgroundColor: "#2563eb",
              textTransform: "none",
              whiteSpace: "nowrap",
              fontSize: { xs: "13px", sm: "15px" },
              fontWeight: 700,
              boxShadow: "0 8px 18px rgba(37, 99, 235, 0.22)",
              "&:hover": {
                backgroundColor: "#1d4ed8",
                boxShadow: "0 10px 22px rgba(37, 99, 235, 0.3)",
              },
            }}
          >
            Create Resume
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const navLinkStyles = {
  position: "relative",
  color: "#475569",
  fontSize: "15px",
  fontWeight: 650,
  textDecoration: "none",
  transition: "color 180ms ease",
  "&::after": {
    content: '""',
    position: "absolute",
    right: 0,
    bottom: "-7px",
    left: 0,
    height: "2px",
    borderRadius: "999px",
    backgroundColor: "#2563eb",
    transform: "scaleX(0)",
    transition: "transform 180ms ease",
  },
  "&:hover": {
    color: "#2563eb",
    "&::after": {
      transform: "scaleX(1)",
    },
  },
};