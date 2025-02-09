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

const Smyclass = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const teachersData = [
    { name: "Mr. John Doe", subject: "Mathematics" },
    { name: "Ms. Jane Smith", subject: "Science" },
    { name: "Mrs. Alice Johnson", subject: "History" },
  ];

  const studentsData = [
    { rollNo: 101, name: "Adam White" },
    { rollNo: 102, name: "Emma Green" },
    { rollNo: 103, name: "Olivia Brown" },
  ];

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
        {/* Top Section with Heading and Logo */}
        <Box sx={{ width: "100%", textAlign: "center", padding: "20px 0" }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
            My Class
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

        {/* Home Button or Dropdown for Smaller Screens */}
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "10px",
            right: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {isSmallScreen ? (
            <Box
              sx={{
                position: "absolute",
                right: "20px",
                top: "10px",
              }}
            >
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
                <MenuItem onClick={() => navigate("/student")}>Home</MenuItem>
                <MenuItem onClick={() => navigate("/student/myclass/mark")}>
                  Assignment Mark
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => navigate("/student/myclass/mark")}
                sx={{
                  color: "#5a3d31",
                  borderColor: "#5a3d31",
                  marginLeft: "40px",
                  "&:hover": {
                    backgroundColor: "#e7dccd",
                    borderColor: buttonHoverColor,
                  },
                }}
              >
                Assignment Mark
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

        {/* Responsive Table Layout */}
        <Card
          sx={{
            width: "90%",
            maxWidth: "1200px",
            marginTop: "80px",
            display: "flex",
            flexWrap: isSmallScreen ? "wrap" : "nowrap",
            gap: "20px",
          }}
        >
          {/* Teacher Table */}
          <CardContent sx={{ flex: 1, minWidth: "280px" }}>
            <Typography variant="h6" sx={{ color: "#5a3d31", marginBottom: "10px" }}>
              Teacher List
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 300, overflowX: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Subject</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teachersData.map((teacher, index) => (
                    <TableRow key={index}>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell align="center">{teacher.subject}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>

          {/* Student Table */}
          <CardContent sx={{ flex: 1, minWidth: "280px" }}>
            <Typography variant="h6" sx={{ color: "#5a3d31", marginBottom: "10px" }}>
              Student List
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 300, overflowX: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Roll No</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Name</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentsData.map((student, index) => (
                    <TableRow key={index}>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell align="center">{student.name}</TableCell>
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

export default Smyclass;
