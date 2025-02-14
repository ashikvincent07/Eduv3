import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  Menu,
  useMediaQuery,
  MenuItem,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Mteachers = () => {
  const navigate = useNavigate();
  const { classId } = useParams();  // Get the classId from the URL
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [teachersData, setTeachersData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ name: "", subject: "" });

  // Mock function to simulate fetching teachers for the selected classId
  const fetchTeachersData = async () => {
    // Example mock data based on classId
    const mockData = {
      "class-1": [
        { name: "Mr. John", subject: "Operating Systems" },
        { name: "Ms. Jane", subject: "Computer Networks" },
      ],
      "class-2": [
        { name: "Mr. Smith", subject: "Android Development" },
        { name: "Ms. Alice", subject: "Life Skills" },
      ],
    };

    // Fetch the teachers data based on the classId
    setTeachersData(mockData[classId] || []);
  };

  useEffect(() => {
    fetchTeachersData();  // Fetch data when classId changes
  }, [classId]);

  const handleAlertClose = () => setAlert({ ...alert, open: false });

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleAddTeacherOpen = () => {
    setOpenDialog(true);
  };

  const handleAddTeacherClose = () => {
    setOpenDialog(false);
  };

  const handleTeacherInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.subject) {
      setTeachersData([...teachersData, newTeacher]);
      setAlert({
        open: true,
        type: "success",
        message: `${newTeacher.name} has been added!`,
      });
      setNewTeacher({ name: "", subject: "" });
      setOpenDialog(false);
    } else {
      setAlert({
        open: true,
        type: "error",
        message: "Please fill in both fields!",
      });
    }
  };

  const handleRemoveTeacher = (name) => {
    setTeachersData(teachersData.filter((teacher) => teacher.name !== name));
    setAlert({
      open: true,
      type: "warning",
      message: `${name} has been removed from the list!`,
    });
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
          padding: "px 0",
        }}
      >
        {/* Top Section with Heading and Logo */}
        <Box sx={{ width: "100%", textAlign: "center", padding: "20px 0" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
            Teachers List for {classId}
          </Typography>
          <img
            src="/images/edu.png"
            alt="Logo"
            style={{
              height: "auto",
              width: "90px",
              objectFit: "contain",
              marginTop: "5px",
            }}
          />
        </Box>

        {/* Back Button for Larger Screens */}
        {!isSmallScreen && (
          <Box
            sx={{
              position: "fixed",
              top: "10px",
              left: "20px",
              zIndex: 1000,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{
                color: "#5a3d31",
                borderColor: "#5a3d31",
                "&:hover": {
                  backgroundColor: "#e7dccd",
                  borderColor: buttonHoverColor,
                },
              }}
            >
              Back
            </Button>
          </Box>
        )}

        {/* Home Button or Dropdown for Smaller Screens */}
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "10px",
            right: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {isSmallScreen ? (
            <>
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  color: "#5a3d31",
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={() => navigate("/teacher")}>Home</MenuItem>
                <MenuItem onClick={() => navigate(-1)}>Back</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              variant="outlined"
              onClick={() => navigate("/teacher")}
              sx={{
                color: "#5a3d31",
                borderColor: "#5a3d31",
                "&:hover": {
                  backgroundColor: "#e7dccd",
                  borderColor: buttonHoverColor,
                },
              }}
            >
              Home
            </Button>
          )}
        </Box>

        {/* Add Teacher Button */}
        <Box sx={{ marginTop: "30px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTeacherOpen}
            sx={{
              backgroundColor: "#5a3d31",
              "&:hover": {
                backgroundColor: buttonHoverColor,
              },
            }}
          >
            Add Teacher
          </Button>
        </Box>

        {/* Table for Teachers List */}
        <Card sx={{ width: "90%", maxWidth: "1200px", marginTop: "30px" }}>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Teacher Name</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Subject</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Actions</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teachersData.map((teacher, index) => (
                    <TableRow key={index}>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell align="center">{teacher.subject}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemoveTeacher(teacher.name)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Add Teacher Dialog */}
        <Dialog open={openDialog} onClose={handleAddTeacherClose}>
          <DialogTitle>Add Teacher</DialogTitle>
          <DialogContent>
            <TextField
              label="Teacher Name"
              variant="outlined"
              fullWidth
              name="name"
              value={newTeacher.name}
              onChange={handleTeacherInputChange}
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              label="Subject"
              variant="outlined"
              fullWidth
              name="subject"
              value={newTeacher.subject}
              onChange={handleTeacherInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddTeacherClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAddTeacher} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar Alert */}
        <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleAlertClose}
            severity={alert.type}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default Mteachers;
