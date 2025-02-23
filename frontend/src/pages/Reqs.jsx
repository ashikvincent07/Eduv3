import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";

const primaryColor = "#e7cccc";

const Reqs = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [requests, setRequests] = useState([]);
  const [classDetails, setClassDetails] = useState(null);
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    if (classId) fetchJoinRequests();
  }, [classId]);

  const fetchJoinRequests = async () => {
    setLoading(true);
    setError(false);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/classrooms/pending/${classId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests(response.data.pendingStudents);
      setClassDetails({
        subject: response.data.subject || "Unknown Subject",
        batch: response.data.batch || "N/A",
        semester: response.data.semester || "N/A",
      });
    } catch (error) {
      console.error("Error fetching requests:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (studentId, action) => {
    setProcessing(studentId);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/classrooms/${action}/${classId}/${studentId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((prevRequests) => prevRequests.filter((request) => request._id !== studentId));
      setAlert({ open: true, type: "success", message: `Student ${action}d successfully!` });
    } catch (error) {
      console.error("Error updating request:", error);
      setAlert({ open: true, type: "error", message: "Action failed. Try again." });
    } finally {
      setProcessing(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.8 }} style={{ minHeight: "100vh", width: "100vw" }}>
      <Box sx={{ minHeight: "100vh", width: "100vw", background: "linear-gradient(to right, #e7cccc, #ede8dc)", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", position: "relative" }}>
        <Box sx={{ width: "100%", position: "absolute", top: "10px", left: 0, right: 0, display: "flex", justifyContent: "flex-end", padding: "0 20px" }}>
          {isSmallScreen ? (
            <IconButton onClick={() => navigate(-1)} sx={{ color: "#5a3d31" }}>
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <Button startIcon={<ArrowBackIcon />} variant="outlined" sx={{ color: "#5a3d31", borderColor: "#5a3d31", "&:hover": { backgroundColor: "#e7dccd" } }} onClick={() => navigate(-1)}>
              Back
            </Button>
          )}
        </Box>

        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31", textAlign: "center", '@media (max-width:600px)': { fontSize: "1.2rem" } }}>Student Join Requests</Typography>

        {classDetails && (
          <Paper sx={{ padding: "15px", marginTop: "20px", backgroundColor: "#f4f4f4", textAlign: "center", borderRadius: "10px", width: "80%", maxWidth: "500px" }}>
            <Typography variant="h6">Class: {classDetails.subject}</Typography>
            <Typography variant="body1">Batch: {classDetails.batch}</Typography>
            <Typography variant="body1">Semester: {classDetails.semester}</Typography>
          </Paper>
        )}

        {loading ? (
          <CircularProgress sx={{ marginTop: "20px", color: "#5a3d31" }} />
        ) : error ? (
          <Typography variant="body1" sx={{ marginTop: "20px", color: "red" }}>Failed to load requests. Please try again.</Typography>
        ) : requests.length > 0 ? (
          <Grid container spacing={3} sx={{ justifyContent: "center", marginTop: "50px", width: "100%", maxWidth: "900px" }}>
            {requests.map((request) => (
              <Grid item xs={12} sm={6} md={4} key={request._id}>
                <Paper elevation={3} sx={{ padding: "20px", backgroundColor: primaryColor, borderRadius: "12px", textAlign: "center" }}>
                  <Typography variant="h6">{request.name}</Typography>
                  <Typography variant="body1" sx={{ marginBottom: "10px" }}>Requested to join</Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                    <Button variant="contained" startIcon={<CheckIcon />} sx={{ backgroundColor: "#4caf50", color: "#fff", flex: "1", margin: "5px" }} onClick={() => handleRequestAction(request._id, "approve")} disabled={processing === request._id}>
                      {processing === request._id ? "Processing..." : "Accept"}
                    </Button>
                    <Button variant="contained" startIcon={<CloseIcon />} sx={{ backgroundColor: "#f44336", color: "#fff", flex: "1", margin: "5px" }} onClick={() => handleRequestAction(request._id, "decline")} disabled={processing === request._id}>
                      {processing === request._id ? "Processing..." : "Decline"}
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" sx={{ marginTop: "20px", color: "#5a3d31" }}>No pending requests.</Typography>
        )}
      </Box>
    </motion.div>
  );
};

export default Reqs;
