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
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Mgradecard = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [menuAnchor, setMenuAnchor] = useState(null);

  // Static data for subjects and teachers
  const staticData = [
    { subject: "Operating Systems", teacher: "Dr. John Doe" },
    { subject: "Computer Networks", teacher: "Prof. Jane Smith" },
    { subject: "Android Development", teacher: "Mr. Alex Brown" },
    { subject: "Life Skills", teacher: "Ms. Emily White" },
  ];

  // State for total marks and exam name
  const [gradeCardData, setGradeCardData] = useState(
    staticData.map((item) => ({ ...item, total: "" })) // Add a `total` field for each row
  );
  const [examName, setExamName] = useState("");  // State for exam name input

  const handleAlertClose = () => setAlert({ ...alert, open: false });

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleTotalMarkChange = (index, event) => {
    const updatedData = [...gradeCardData];
    updatedData[index].total = event.target.value;
    setGradeCardData(updatedData);
  };

  const handleSendToTeachers = () => {
    const isValid = gradeCardData.every((row) => row.total);
    if (examName && isValid) {
      setAlert({
        open: true,
        type: "success",
        message: "Gradecard details have been sent to teachers successfully!",
      });
    } else {
      setAlert({
        open: true,
        type: "error",
        message: "Please fill all Total Marks fields before submitting.",
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
          padding: "px 0",
        }}
      >
        {/* Top Section with Heading and Logo */}
        <Box sx={{ width: "100%", textAlign: "center", padding: "px 0" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
            Create Gradecard
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
              onClick={() => navigate("/teacher/manageclass/gradecard/manage")}
              sx={{
                color: "#5a3d31",
                borderColor: "#5a3d31",
                "&:hover": {
                  backgroundColor: "#e7dccd",
                  borderColor: buttonHoverColor,
                },
              }}
            >
              Manage Gradecard
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
                <MenuItem onClick={() => navigate("/teacher/manageclass/gradecard/manage")}>Manage Gradecard</MenuItem>
                <MenuItem onClick={() => navigate(-1)}>Back</MenuItem>
              </Menu>
            </>
          ) : (
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
          )}
        </Box>

        {/* Gradecard Table */}
        <Card sx={{ width: "90%", maxWidth: "1200px", marginTop: "px" }}>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <TextField
                        variant="outlined"
                        fullWidth
                        value={examName}
                        onChange={(e) => setExamName(e.target.value)}
                        label="Exam Name"
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><strong>Subject Name</strong></TableCell>
                    <TableCell align="center"><strong>Teacher Name</strong></TableCell>
                    <TableCell align="center"><strong>Total Marks</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gradeCardData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell align="center">{row.teacher}</TableCell>
                      <TableCell align="center">
                        <TextField
                          variant="outlined"
                          size="small"
                          value={row.total}
                          onChange={(e) => handleTotalMarkChange(index, e)}
                          sx={{ maxWidth: "80px" }}
                          label="Total Marks"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ textAlign: "center", marginTop: "20px" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: buttonHoverColor,
                  "&:hover": {
                    backgroundColor: "#5a3d31",
                  },
                }}
                onClick={handleSendToTeachers}
              >
                Send to Teachers
              </Button>
            </Box>
          </CardContent>
        </Card>

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

export default Mgradecard;
