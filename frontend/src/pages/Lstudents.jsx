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
  MenuItem,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";
import axios from "axios";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Lstudents = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classDetails, setClassDetails] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/classrooms/${classId}/students`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
    
        console.log("Student API Response:", response.data); // 🔍 Debugging
        setStudentsData(response.data.approvedStudents || []); // ✅ Use approvedStudents
      } catch (error) {
        console.error("Failed to load students", error);
        setAlert({ open: true, type: "error", message: "Failed to load students" });
      } finally {
        setLoading(false);
      }
    };
    

    const fetchClassDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/classrooms/${classId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setClassDetails(response.data);
      } catch (error) {
        console.error("Failed to load class details", error);
      }
    };

    if (classId) {
      fetchStudents();
      fetchClassDetails();
    }
  }, [classId]);

  const handleKickStudent = async (studentId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/classrooms/${classId}/remove/${studentId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setStudentsData((prev) => prev.filter((student) => student._id !== studentId));
      setAlert({ open: true, type: "success", message: "Student removed successfully" });
    } catch (error) {
      setAlert({ open: true, type: "error", message: "Failed to remove student" });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.8 }}>
      <Box sx={{ width: "100vw", minHeight: "100vh", background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`, display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", p: 2 }}>
          {isSmallScreen ? (
            <>
              <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)} sx={{ color: "#5a3d31" }}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}>
                <MenuItem onClick={() => navigate("/teacher")}>Home</MenuItem>
                <MenuItem onClick={() => navigate(-1)}>Back</MenuItem>
              </Menu>
            </>
          ) : (
            <Button variant="outlined" onClick={() => navigate("/teacher")} sx={{ color: "#5a3d31", borderColor: "#5a3d31", "&:hover": { backgroundColor: "#e7dccd", borderColor: buttonHoverColor } }}>Home</Button>
          )}
        </Box>

        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#5a3d31", mb: 2 }}>Students List</Typography>
        <img src="/images/edu.png" alt="Logo" style={{ width: "80px", marginBottom: "20px" }} />

        {classDetails && (
          <Paper sx={{ p: 3, mb: 3, backgroundColor: "#f4f4f4", textAlign: "center", borderRadius: "10px", width: "80%" }}>
            <Typography variant="h6">Class: {classDetails.subject}</Typography>
            <Typography variant="body1">Batch: {classDetails.batch}</Typography>
            <Typography variant="body1">Semester: {classDetails.semester}</Typography>
          </Paper>
        )}

        <Card sx={{ width: "90%", maxWidth: "900px", boxShadow: 3 }}>
          <CardContent>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center"><strong>Name</strong></TableCell>
                      <TableCell align="center"><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {studentsData.length > 0 ? (
                      studentsData.map((student) => (
                        <TableRow key={student._id}>
                          <TableCell align="center">{student.name}</TableCell>
                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleKickStudent(student._id)}
                            >
                              Kick Out
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} align="center">No students found</TableCell>
                      </TableRow>
                    )}
                  </TableBody>

                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>
    </motion.div>
  );
};

export default Lstudents;