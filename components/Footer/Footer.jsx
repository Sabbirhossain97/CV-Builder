import React from 'react'
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
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
                &copy; 2023 CV Builder. All rights reserved
            </Typography>
        </Box>
    )
}
