import React from "react";
import Link from "next/link";

import { Box, Container, Divider, Typography } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                color: "#cbd5e1",
                backgroundColor: "#0f172a",
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        py: { xs: 6, md: 7 },
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "minmax(0, 1.5fr) minmax(180px, 0.5fr)",
                        },
                        gap: { xs: 5, md: 8 },
                    }}
                >
                    {/* Brand information */}
                    <Box>
                        <Typography
                            component={Link}
                            href="/"
                            sx={{
                                display: "inline-block",
                                color: "#ffffff",
                                fontSize: "23px",
                                fontWeight: 800,
                                letterSpacing: "-0.02em",
                                textDecoration: "none",
                            }}
                        >
                            CV{" "}
                            <Box component="span" sx={{ color: "#60a5fa" }}>
                                Builder
                            </Box>
                        </Typography>

                        <Typography
                            sx={{
                                maxWidth: "470px",
                                mt: 2,
                                color: "#94a3b8",
                                fontSize: "15px",
                                lineHeight: 1.75,
                            }}
                        >
                            Create, customize, save, and download a professional resume
                            using flexible templates and a simple live editor.
                        </Typography>
                    </Box>

                    {/* Footer links */}
                    <Box>
                        <Typography
                            sx={{
                                mb: 2,
                                color: "#ffffff",
                                fontSize: "15px",
                                fontWeight: 750,
                            }}
                        >
                            Quick Links
                        </Typography>

                        <Box
                            component="nav"
                            aria-label="Footer navigation"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: 1.5,
                            }}
                        >
                            <FooterLink href="/#features">Features</FooterLink>
                            <FooterLink href="/#how-it-works">How It Works</FooterLink>
                            <FooterLink href="/#faq">FAQ</FooterLink>
                            <FooterLink href="/CVBuilder">Create Resume</FooterLink>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ borderColor: "rgba(148, 163, 184, 0.2)" }} />

                {/* Bottom section */}
                <Box
                    sx={{
                        py: 2.8,
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1.5,
                        textAlign: "center",
                    }}
                >
                    <Typography sx={{ color: "#94a3b8", fontSize: "14px" }}>
                        © {new Date().getFullYear()} CV Builder. All rights reserved.
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: 0.7,
                            color: "#94a3b8",
                        }}
                    >
                        <Typography component="span" sx={{ fontSize: "14px" }}>
                            Designed and developed with
                        </Typography>

                        <FavoriteRoundedIcon
                            aria-label="love"
                            sx={{
                                color: "#f87171",
                                fontSize: "17px",
                            }}
                        />

                        <Box
                            component="a"
                            href="https://github.com/Sabbirhossain97"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 0.6,
                                color: "#ffffff",
                                fontSize: "14px",
                                fontWeight: 700,
                                textDecoration: "none",
                                transition: "color 180ms ease",
                                "&:hover": {
                                    color: "#60a5fa",
                                },
                            }}
                        >
                            <GitHubIcon sx={{ fontSize: "18px" }} />
                            Sabbir Hossain
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

function FooterLink({ href, children }) {
    return (
        <Typography
            component={Link}
            href={href}
            sx={{
                color: "#94a3b8",
                fontSize: "15px",
                textDecoration: "none",
                transition: "color 180ms ease, transform 180ms ease",
                "&:hover": {
                    color: "#60a5fa",
                    transform: "translateX(3px)",
                },
            }}
        >
            {children}
        </Typography>
    );
}