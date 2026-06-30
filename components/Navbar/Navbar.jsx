import Box from "@mui/material/Box";
import Image from "next/image";
import { Typography } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1, position: 'fixed', left: 0, right: 0, top: 0, zIndex: 1000 }}>
      <AppBar position="static"
        style={{
          height: "80px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          background: "linear-gradient(to right bottom, #64b5f6, #1565c0)"
        }}
      >
        <Toolbar variant="dense" sx={{marginLeft: '20px'}}>
          <Image src="/favicon.ico" alt="error" width={45} height={45} />
          <Typography variant="h6" color="inherit" component="div"
            sx={{
              fontWeight: "700",
              marginTop: "5px",
              marginLeft: "5px",
              fontSize: "20px",
            }}
          >
            CV Builder
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
