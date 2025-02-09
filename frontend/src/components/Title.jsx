import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Title = () => {
  const [isTeacher, setIsTeacher] = useState(false); // Set initial view to Student
  const [animate, setAnimate] = useState(false); // To trigger animation
  const navigate = useNavigate(); // Initialize navigate function

  const handleRoleSwitch = () => {
    setIsTeacher(!isTeacher); // Toggle between Teacher and Student
  };

  useEffect(() => {
    // Trigger animation after the component mounts
    setAnimate(true);
  }, []);

  // Navigation function
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        height: "100vh", // Full viewport height
        width: "100vw", // Full width to ensure the content takes full screen width
        display: "flex",
        flexDirection: "column",
        alignItems: "center", // Center horizontally
        justifyContent: "center", // Center vertically
        background: "#e7cccc",
        color: "#5a3d31",
        fontFamily: "'Arial', sans-serif",
        textAlign: "center",
        position: "relative",
        transition: "all 0.5s ease", // Smooth transition for all elements
        opacity: animate ? 1 : 0, // Fade-in effect based on animation state
        transform: animate ? "scale(1)" : "scale(0.9)", // Scale effect for page load
        animation: "fadeIn 1s ease-out forwards, scaleUp 1s ease-out forwards", // Animation applied to whole container
      }}
    >
      {/* Logo Section */}
      <Box
        mb={4}
        sx={{
          transition: "transform 0.5s ease-in-out",
          width: "100%", // Full width for the logo section
          maxWidth: "300px", // Max width for logo to ensure it's not too big
          textAlign: "center", // Ensure the text is centered
          opacity: animate ? 1 : 0, // Apply fade-in for logo
          transform: animate ? "scale(1)" : "scale(0.8)", // Apply scale animation to the logo
        }}
      >
        <img
          src="./images/edu.png"
          alt="EduConnect Logo"
          style={{
            width: "100%", // Full width for the logo
            maxWidth: "150px", // Make sure it doesn't get too large
            height: "auto",
            transition: "transform 0.5s ease-in-out", // Smooth zoom effect
          }}
        />
        <Typography
          variant="h5"
          sx={{
            mt: 2,
            fontStyle: "italic",
            fontWeight: 500,
            transition: "all 0.3s ease", // Smooth transition for text
            opacity: animate ? 1 : 0, // Apply fade-in for text
            transform: animate ? "scale(1)" : "scale(0.8)", // Apply scale effect to text
          }}
        >
          Dream big, learn more, achieve greatness.
        </Typography>
      </Box>

      {/* Role Switcher Button */}
      <Button
        onClick={handleRoleSwitch}
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: isTeacher ? "#a5b68d" : "#c1cfa1",
          color: "#5a3d31",
          "&:hover": {
            backgroundColor: isTeacher ? "#c1cfa1" : "#a5b68d",
            transform: "scale(1.05)", // Zoom effect on hover
          },
          fontSize: "0.9rem",
          borderRadius: "20px",
          padding: "8px 20px",
          transition: "transform 0.3s ease", // Zoom-in effect
          opacity: animate ? 1 : 0, // Apply fade-in
          transform: animate ? "scale(1)" : "scale(0.8)", // Apply scale animation
        }}
      >
        {isTeacher ? "Teacher" : "Student"}
      </Button>

      {/* Login and Signup Buttons */}
      <Stack
        spacing={2}
        direction="column" // Always vertical stacking for simplicity
        alignItems="center"
        sx={{
          transition: "all 0.3s ease", // Smooth transition for button stack
          width: "100%", // Full width to align buttons correctly
          maxWidth: "300px", // Max width to make buttons aligned properly
          opacity: animate ? 1 : 0, // Apply fade-in for button stack
          transform: animate ? "scale(1)" : "scale(0.8)", // Apply scale effect to buttons
        }}
      >
        {/* If it's Teacher view, only show Login */}
        {isTeacher ? (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#a5b68d",
              color: "#5a3d31",
              "&:hover": {
                backgroundColor: "#c1cfa1",
                transform: "scale(1.05)", // Zoom effect on hover
              },
              fontSize: "1rem",
              borderRadius: "20px",
              padding: "10px 30px",
              transition: "transform 0.3s ease", // Smooth transition
              width: "100%", // Full width for buttons
            }}
            onClick={() => handleNavigation("/teachers")} // Navigate to /teachers on Teacher Login
          >
            Login
          </Button>
        ) : (
          // If it's Student view, show both Login and Sign Up
          <>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#a5b68d",
                color: "#5a3d31",
                "&:hover": {
                  backgroundColor: "#c1cfa1",
                  transform: "scale(1.05)", // Zoom effect on hover
                },
                fontSize: "1rem",
                borderRadius: "20px",
                padding: "10px 30px",
                transition: "transform 0.3s ease", // Smooth transition
                width: "100%", // Full width for buttons
              }}
              onClick={() => handleNavigation("/login")} // Navigate to /login on Student Login
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#a5b68d",
                color: "#5a3d31",
                "&:hover": {
                  backgroundColor: "#c1cfa1",
                  transform: "scale(1.05)", // Zoom effect on hover
                },
                fontSize: "1rem",
                borderRadius: "20px",
                padding: "10px 30px",
                transition: "transform 0.3s ease", // Smooth transition
                width: "100%", // Full width for buttons
              }}
              onClick={() => handleNavigation("/signup")} // Navigate to /signup on Student Sign Up
            >
              Sign Up
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Title;
