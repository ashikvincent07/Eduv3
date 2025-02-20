import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
  Snackbar,
  Alert,
  IconButton,
  Menu,
  MenuItem as MuiMenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const Classrooms = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const semesters = ["S1", "S2", "S3", "S4", "S5", "S6"];
  const batches = ["BCA", "B.Sc"];
  const subjects = ["OS", "Android Programming", "CN", "Life Skill"];

  const handleSemSelect = (event) => setSelectedSemester(event.target.value);
  const handleBatchSelect = (event) => setSelectedBatch(event.target.value);
  const handleSubjectSelect = (event) => setSelectedSubject(event.target.value);

  const handleCreateClassroom = async () => {
    setOpenConfirmDialog(false);

    if (!selectedSemester || !selectedBatch || !selectedSubject) {
      setAlert({ open: true, type: "error", message: "Please select semester, batch, and subject!" });
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Get JWT token

      if (!token) {
        setAlert({ open: true, type: "error", message: "Unauthorized: Please log in first." });
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/classrooms/create",
        { semester: selectedSemester, batch: selectedBatch, subject: selectedSubject },
        { headers: { Authorization: `Bearer ${token}` } } // Attach JWT token
      );

      setAlert({
        open: true,
        type: "success",
        message: `Classroom created successfully: ${response.data.semester} - ${response.data.batch} - ${response.data.subject}`,
      });

      setSelectedSemester("");
      setSelectedBatch("");
      setSelectedSubject("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setAlert({ open: true, type: "error", message: error.response.data.message });
      } else {
        setAlert({ open: true, type: "error", message: "Failed to create classroom. Please try again." });
      }
    }
  };

  const handleAlertClose = () => setAlert({ ...alert, open: false });

  const handleMenuOpen = (event) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.8 }} style={{ minHeight: "100vh", width: "100vw" }}>
      <Box sx={{ minHeight: "100vh", width: "100vw", background: "linear-gradient(to right, #e7cccc, #ede8dc)", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0" }}>
        {/* Header */}
        <Box sx={{ width: "100%", textAlign: "center", padding: "2 0", position: "relative" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>Create Classroom</Typography>
          <img src="/images/edu.png" alt="Logo" style={{ height: "auto", width: "90px", objectFit: "contain", marginTop: "5px" }} />

          {/* Home Button / Menu */}
          <Box sx={{ position: "absolute", top: "10px", right: "20px" }}>
            {isSmallScreen ? (
              <>
                <IconButton onClick={handleMenuOpen} sx={{ color: "#5a3d31" }}>
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                  <MuiMenuItem onClick={() => navigate("/teacher")}>Home</MuiMenuItem>
                </Menu>
              </>
            ) : (
              <Button variant="outlined" onClick={() => navigate("/teacher")} sx={{ color: "#5a3d31", borderColor: "#5a3d31", "&:hover": { backgroundColor: "#e7dccd" } }}>
                Home
              </Button>
            )}
          </Box>
        </Box>

        {/* Form Card */}
        <Card sx={{ width: "70%", maxWidth: "900px", marginTop: "80px" }}>
          <CardContent>
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <TextField select label="Select Semester" fullWidth value={selectedSemester} onChange={handleSemSelect} sx={{ marginBottom: "20px", backgroundColor: "#ede8dc", borderRadius: "8px" }}>
                {semesters.map((sem, index) => (<MenuItem key={index} value={sem}>{sem}</MenuItem>))}
              </TextField>
              <TextField select label="Select Batch" fullWidth value={selectedBatch} onChange={handleBatchSelect} sx={{ marginBottom: "20px", backgroundColor: "#ede8dc", borderRadius: "8px" }}>
                {batches.map((batch, index) => (<MenuItem key={index} value={batch}>{batch}</MenuItem>))}
              </TextField>
              <TextField label="Enter Subject" fullWidth value={selectedSubject} onChange={handleSubjectSelect} sx={{ marginBottom: "20px", backgroundColor: "#ede8dc", borderRadius: "8px" }}>
                
              </TextField>

              {/* Show confirmation dialog before creating class */}
              <Button variant="contained" onClick={() => setOpenConfirmDialog(true)} sx={{ backgroundColor: "#5a3d31", color: "#fff", "&:hover": { backgroundColor: "#7a5e51" } }} fullWidth>
                Create Class
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
          <DialogTitle>Confirm Creation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to create the classroom for <b>{selectedSemester} - {selectedBatch} - {selectedSubject}</b>?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirmDialog(false)} color="error">Cancel</Button>
            <Button onClick={handleCreateClassroom} color="primary" autoFocus>Create</Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for Alerts */}
        <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleAlertClose}>
          <Alert onClose={handleAlertClose} severity={alert.type} sx={{ width: "100%" }}>{alert.message}</Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default Classrooms;
