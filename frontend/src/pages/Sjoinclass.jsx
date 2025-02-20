import React, { useState, useEffect } from "react";
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
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Sjoinclass = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [menuAnchor, setMenuAnchor] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/classrooms/classes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClasses(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        setAlert({ open: true, type: "error", message: "Failed to load classes" });
      }
    };
    fetchClasses();
  }, []);

  const handleRequestApproval = async () => {
    if (!selectedClass) {
      setAlert({ open: true, type: "error", message: "Please select a class!" });
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(`http://localhost:5000/api/classrooms/join/${selectedClass}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlert({ open: true, type: "success", message: "Request sent successfully!" });
    } catch (error) {
      setAlert({
        open: true,
        type: "error",
        message: error.response?.data?.message || "Error sending request",
      });
    }
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
          background: "linear-gradient(to right, #e7cccc, #ede8dc)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 0",
          position: "relative",
        }}
      >
        {/* Home Button */}
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
                "&:hover": { backgroundColor: "#e7dccd", borderColor: buttonHoverColor },
              }}
            >
              Home
            </Button>
          )}
        </Box>

        {/* Header */}
        <Box sx={{ textAlign: "center", padding: "20px 0" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
            Join Classrooms
          </Typography>
          <img
            src="/images/edu.png"
            alt="Logo"
            style={{ width: "90px", objectFit: "contain", marginTop: "5px" }}
          />
        </Box>

        {/* Classroom Selection */}
        <Card sx={{ width: "70%", maxWidth: "900px", marginTop: "80px" }}>
          <CardContent>
            <Box sx={{ textAlign: "center" }}>
              <TextField
                select
                label="Select Class"
                fullWidth
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                sx={{ marginBottom: "20px", backgroundColor: secondaryColor, borderRadius: "8px" }}
              >
                {classes.length > 0 ? (
                  classes.map((cls) => (
                    <MenuItem key={cls._id} value={cls._id}>
                      {cls.subject} - {cls.semester} ({cls.batch}) - {cls.teacher}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No classes available</MenuItem>
                )}
              </TextField>

              <Button
                variant="contained"
                onClick={handleRequestApproval}
                sx={{
                  backgroundColor: "#5a3d31",
                  color: "#fff",
                  "&:hover": { backgroundColor: buttonHoverColor },
                }}
                fullWidth
              >
                Send Request for Approval
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Snackbar Alerts */}
        <Snackbar open={alert.open} autoHideDuration={3000} onClose={() => setAlert({ ...alert, open: false })}>
          <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.type} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default Sjoinclass;
