import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Tlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To display error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      const { token, user } = response.data;
  
      console.log("Login Response:", response.data); // Debugging
  
      if (user.role !== "teacher") {
        setError("Access denied. Only teachers can log in.");
        return;
      }
  
      console.log("Teacher ID:", user.id); // Debugging
  
      // Store teacherId properly
      localStorage.setItem("teacherId", user.id); // ✅ Ensure this is stored
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      navigate("/teacher");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials, please try again.");
    }
  };
  

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#e7cccc",
          padding: 2,
          position: "relative",
        }}
      >
        <Button
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "#a5b68d",
            color: "#5a3d31",
            "&:hover": { backgroundColor: "#c1cfa1", transform: "scale(1.05)" },
            fontSize: "0.9rem",
            borderRadius: "20px",
            padding: "8px 20px",
            transition: "transform 0.3s ease",
          }}
        >
          Home
        </Button>

        <Box
          sx={{
            position: "absolute",
            top: "20px",
            left: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="./images/edu.png" alt="EduConnect Logo" style={{ width: "80px", height: "auto" }} />
        </Box>

        <Box
          sx={{
            backgroundColor: "#ede8dc",
            padding: 3,
            borderRadius: "10px",
            width: "100%",
            maxWidth: "400px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            "@media (max-width: 600px)": { maxWidth: "90%", padding: "2rem" },
          }}
        >
          <Typography color="purple" variant="h5" align="center" sx={{ marginBottom: 3 }}>
            Teacher Login
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#a5b68d", color: "#5a3d31", "&:hover": { backgroundColor: "#c1cfa1" } }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Tlogin;
