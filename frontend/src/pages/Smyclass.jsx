import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";

const Smyclass = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const studentId = user?.id;
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [menuAnchor, setMenuAnchor] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/classrooms/students/${studentId}/classes`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    if (studentId) fetchClasses();
  }, [studentId]);

  return (
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

      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: "#5a3d31", marginTop: "20px", marginBottom: "20px" }}
      >
        My Classes
      </Typography>

      {classes.length > 0 ? (
        classes.map((classroom) => (
          <Card key={classroom._id} sx={{ width: "90%", maxWidth: "600px", marginBottom: "20px" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "#5a3d31" }}>
                {classroom.subject} ({classroom.batch} - {classroom.semester})
              </Typography>
              <Typography variant="body2" sx={{ color: "#5a3d31" }}>
                Teacher: {classroom.teacherName}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No classes found.</Typography>
      )}
    </Box>
  );
};

export default Smyclass;
