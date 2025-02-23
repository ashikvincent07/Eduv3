import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Sannouncements = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [announcements, setAnnouncements] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openImageDialog, setOpenImageDialog] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) return;

        const response = await axios.get(
          `http://localhost:5000/api/announcements/student/${user.id}`
        );
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
      style={{ minHeight: "100vh", width: "100vw" }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          overflowX: "hidden",
          background: "linear-gradient(to right, #e7cccc, #ede8dc)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 0",
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            position: "absolute",
            top: "10px",
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          {/* Responsive Home Button */}
          <Box
            sx={{
              position: "absolute",
              top: "20px",
              right: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {isSmallScreen ? (
              <>
                <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)} sx={{ color: "#5a3d31" }}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={() => setMenuAnchor(null)}
                >
                  <MenuItem onClick={() => navigate("/student")}>Home</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                onClick={() => navigate("/student")}
                sx={{
                  color: "#5a3d31",
                  borderColor: "#5a3d31",
                  "&:hover": { backgroundColor: "#e7dccd", borderColor: "#7a5e51" },
                }}
              >
                Home
              </Button>
            )}
          </Box>
          <Box sx={{ textAlign: "center", flex: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31", marginBottom: "5px" }}>
              Announcements
            </Typography>
            <img src="/images/edu.png" alt="Logo" style={{ height: "auto", width: "90px", objectFit: "contain" }} />
          </Box>
        </Box>

        {/* Announcement Cards */}
        <Grid container spacing={2} sx={{ maxWidth: "800px", marginTop: "100px" }}>
        {announcements.map((announcement) => (
          <Grid item xs={12} sm={6} key={announcement._id}>
            <Paper elevation={3} sx={{ padding: "15px", borderRadius: "12px", backgroundColor: primaryColor }}>
              
              {/* Display Class Information */}
              <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#7a5c58", marginBottom: "5px" }}>
                {announcement.classId?.batch} - {announcement.classId?.semester} ({announcement.classId?.subject})
              </Typography>
            
              {/* Display Image */}
              {announcement.imageUrl && (
                <Box
                  onClick={() => handleImageClick(`http://localhost:5000${announcement.imageUrl}`)}
                  sx={{
                    width: "100%",
                    paddingTop: "56.25%",
                    backgroundImage: `url(http://localhost:5000${announcement.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                />
              )}

              

              {/* Display Heading */}
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#5a3d31", marginBottom: "10px" }}>
                {announcement.heading}
              </Typography>

              {/* Display Text */}
              <Typography variant="body2" sx={{ color: "#5a3d31", marginBottom: "10px" }}>
                {announcement.text}
              </Typography>
              
            </Paper>
          </Grid>
        ))}

        </Grid>

        {/* Fullscreen Image Dialog */}
        <Dialog open={openImageDialog} onClose={handleCloseImageDialog} maxWidth="lg">
          <DialogContent>
            {selectedImage && (
              <Box component="img" src={selectedImage} alt="Announcement" sx={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }} />
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </motion.div>
  );
};

export default Sannouncements;