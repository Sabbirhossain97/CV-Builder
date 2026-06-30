import React from "react";
import { useState, useEffect, useContext, useCallback } from "react";
import Image from "next/image";
import { DataContext } from "../../pages/CVBuilder";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import { modalStyles } from "../helpers/helpers";

export default function Practice() {
  const getData = useContext(DataContext);
  const router = useRouter();
  const [imageData, setImageData] = getData.image;
  const [imageUrlData, setImageUrlData] = getData.imageUrls;
  const [completedSections, setCompletedSections] = getData.completed

  const [open, setOpen] = useState(false);

  const handleOk = () => {
    router.push('/');
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const imageHandler = (e) => {
    setImageData([...e.target.files]);
  };

  const deleteImage = () => {
    setImageUrlData([]);
    setImageData([]);
  };

  const imageLoader = () => {
    return imageUrlData;
  };

  const calculateProfileCompleteness = useCallback(() => {

    if (imageData.length > 0) {
      if (!completedSections.sections.includes("Image")) {
        setCompletedSections(prevState => ({
          ...prevState,
          sections: [...prevState.sections, "Image"]
        }));
      }
    } else {
      if (completedSections.sections.includes("Image")) {
        setCompletedSections(prevState => ({
          ...prevState,
          sections: prevState.sections.filter(section => section !== "Image")
        }));
      }
    }
  }, [imageData, completedSections, setCompletedSections])


  useEffect(() => {
    if (imageData.length < 1) {
      calculateProfileCompleteness()
      return
    };
    const newImageUrls = [];
    imageData.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageUrlData(newImageUrls);
    calculateProfileCompleteness()
  }, [imageData, setImageUrlData, calculateProfileCompleteness,setCompletedSections]);


  return (
    <Box style={{ marginTop: "60px" }}>
      <Button
        sx={{
          display: { xs: 'none', lg: 'flex' }
        }}
        onClick={handleOpen} color="primary" variant="contained" startIcon={<KeyboardBackspaceIcon />}>
        Back
      </Button>
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
      <Box sx={{ paddingTop: "20px" }}>
        <Typography
          sx={{
            width: "33%",
            paddingBottom: "20px",
            fontWeight: "700",
            fontSize: "20px",
          }}
        >
          Photo
        </Typography>
        {imageUrlData.length > 0 ? (
          <Box style={{ display: "flex" }}>
            <Image
              loader={imageLoader}
              src="/Images/resume_icon.png"
              width={90}
              height={90}
              alt="error"
              style={{ objectFit: "contain" }}
            />
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                accept="image/png, image/jpg "
                onChange={imageHandler}
              />
              <Box style={{ display: "flex", flexDirection: "column" }}>
                <Button color="primary" component="span">
                  <EditIcon />
                </Button>
                <Button onClick={deleteImage}>
                  <DeleteOutlineOutlinedIcon />
                </Button>
              </Box>
            </label>
          </Box>
        ) : (
          <label htmlFor="upload-photo">
            <input
              style={{ display: "none" }}
              id="upload-photo"
              name="upload-photo"
              type="file"
              onChange={imageHandler}
            />

            <Button color="primary" variant="contained" component="span">
              Upload
            </Button>
          </label>
        )}
      </Box>
    </Box>
  );
}
