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
  IconButton,
  Menu,
  useMediaQuery,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const buttonHoverColor = "#7a5e51";

const Smark = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const marksData = [
    { subject: "Mathematics", assignment1: 85, assignment2: 90 },
    { subject: "Science", assignment1: 88, assignment2: 92 },
    { subject: "History", assignment1: 78, assignment2: 85 },
  ];

  const studentName = "Adam White"; // Student name as heading

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
        }}
      >
        {/* Top Navigation Section */}
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "10px",
            display: "flex",
            justifyContent: isSmallScreen ? "flex-end" : "space-between",
            padding: "0 20px",
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
                <MenuItem onClick={() => navigate(-1)}>Back</MenuItem>
                <MenuItem onClick={() => navigate("/student")}>Home</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => navigate(-1)} // Go back button
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
              <Button
                variant="outlined"
                onClick={() => navigate("/student")}
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
            </>
          )}
        </Box>

        {/* Student Name as Heading */}
        <Box sx={{ textAlign: "center", padding: "20px 0" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
            {studentName}
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

        {/* Responsive Table Layout */}
        <Card
          sx={{
            width: "90%",
            maxWidth: "1200px",
            marginTop: "20px",
          }}
        >
          <CardContent sx={{ flex: 1, minWidth: "280px" }}>
            <Typography variant="h6" sx={{ color: "#5a3d31", marginBottom: "10px" }}>
              Marks Table
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 300, overflowX: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><strong>Subject</strong></TableCell>
                    <TableCell align="center"><strong>Assignment 1</strong></TableCell>
                    <TableCell align="center"><strong>Assignment 2</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {marksData.map((data, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{data.subject}</TableCell>
                      <TableCell align="center">{data.assignment1}</TableCell>
                      <TableCell align="center">{data.assignment2}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </motion.div>
  );
};

export default Smark;
