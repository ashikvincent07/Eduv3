import React, { useState } from "react";
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
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Mstudents = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("OS");

  const handleAlertClose = () => setAlert({ ...alert, open: false });

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const studentsData = [
    { name: "John Doe", OS: [85, 78], CN: [90, 88], Android: [78, 84], LifeSkill: [88, 91] },
    { name: "Jane Smith", OS: [92, 84], CN: [88, 76], Android: [84, 70], LifeSkill: [91, 75] },
    { name: "Alice Johnson", OS: [76, 70], CN: [80, 75], Android: [70, 72], LifeSkill: [75, 78] },
  ];

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
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
            Students List
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

        {/* Table for Students List */}
        <Card sx={{ width: "90%", maxWidth: "1200px", marginTop: "80px" }}>
          <CardContent>
            {/* Subject Selection Dropdown */}
            <Box sx={{ marginBottom: "20px", textAlign: "right" }}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="select-subject-label">Subject</InputLabel>
                <Select
                  labelId="select-subject-label"
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                >
                  <MenuItem value="OS">OS</MenuItem>
                  <MenuItem value="CN">CN</MenuItem>
                  <MenuItem value="Android">Android</MenuItem>
                  <MenuItem value="LifeSkill">Life Skill</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell align="center"><strong>Assignment 1</strong></TableCell>
                    <TableCell align="center"><strong>Assignment 2</strong></TableCell>
                    <TableCell align="center"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentsData.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell align="center">{student[selectedSubject]?.[0]}</TableCell>
                      <TableCell align="center">{student[selectedSubject]?.[1]}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() =>
                            setAlert({
                              open: true,
                              type: "warning",
                              message: `${student.name} has been kicked out!`,
                            })
                          }
                        >
                          Kick Out
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>

      {/* Snackbar Alert for Actions */}
      <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleAlertClose} severity={alert.type}>
          {alert.message}
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default Mstudents;
