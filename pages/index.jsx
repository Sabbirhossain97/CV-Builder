import Home from "../components/Home/Home";
import Navbar from "../components/Navbar/Navbar"
import Head from "next/head";
import Box from "@mui/material/Box";
import LoadingAnimation from "../components/StyleComponents/LoadingAnimation";
import { useState } from "react";

export default function Index() {

  const [delay, setDelay] = useState(0);

  setTimeout(() => setDelay(1), 1000);
  return delay === 0 ? (
    <LoadingAnimation />
  ) : (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Head>
        <title>CV Builder</title>
      </Head>
      <Box>
        <Navbar />
      </Box>
      <Home />
    </Box>
  );
}
