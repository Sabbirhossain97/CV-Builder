import React from 'react'
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: 'column',
                alignItems: "center",
                width: "100%",
                height: "100px",
                background: "linear-gradient(to right bottom, #64b5f6, #1565c0)",
                fontFamily: "Segoe UI",
                position: "relative",
                bottom: 0,
                left: 0,
                right: 0
            }}
        >
            <Typography
                style={{ textAlign: "center", color: "white", fontWeight: "600" }}
            >
                &copy; 2026 CV Builder. All rights reserved
            </Typography>
            <Typography
                style={{ textAlign: "center", color: "white", fontWeight: "600" }}
            >
                Developed by <a className='underline' target='_blank' rel="noreferrer" href="https://github.com/Sabbirhossain97">Sabbir Hossain</a>
            </Typography>
        </Box>
    )
}
