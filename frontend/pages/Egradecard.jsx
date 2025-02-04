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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "framer-motion";

const primaryColor = "#e7cccc";
const secondaryColor = "#ede8dc";
const buttonHoverColor = "#7a5e51";

const Egradecard = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const [alert, setAlert] = useState({ open: false, type: "", message: "" });
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editSubjectIndex, setEditSubjectIndex] = useState(null);
  const [newTotalMark, setNewTotalMark] = useState("");

  const [gradeCardData, setGradeCardData] = useState([
    { subject: "Operating Systems", teacher: "Dr. John Doe", total: "100", mark: "80" },
    { subject: "Computer Networks", teacher: "Prof. Jane Smith", total: "100", mark: "90" },
    { subject: "Android Development", teacher: "Mr. Peter Brown", total: "100", mark: "75" },
    { subject: "Life Skills", teacher: "Ms. Emma White", total: "50", mark: "40" },
  ]);

  const handleAlertClose = () => setAlert({ ...alert, open: false });
  const handleMenuOpen = (event) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  const handlePublishClick = () => {
    setIsPublished(!isPublished);
    setAlert({
      open: true,
      type: "success",
      message: isPublished ? "Gradecard has been unpublished!" : "Gradecard has been published!",
    });
  };

  const handleEditClick = (index) => {
    setEditSubjectIndex(index);
    setNewTotalMark(gradeCardData[index].total);
    setOpenEditDialog(true);
  };

  const handleEditSave = () => {
    const updatedData = [...gradeCardData];
    updatedData[editSubjectIndex].total = newTotalMark;
    setGradeCardData(updatedData);
    setOpenEditDialog(false);
    setAlert({
      open: true,
      type: "success",
      message: "Total marks updated successfully!",
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
            Gradecard
          </Typography>
          <img
            src="/images/edu.png"
            alt="Logo"
            style={{
              height: "auto",
              width: "90px",
              objectFit: "contain",
              marginTop: "px",
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

        {/* Internal 1 Caption */}
        <Box sx={{ width: "100%", textAlign: "center", padding: "10px 0" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#5a3d31" }}>
            Internal 1
          </Typography>
        </Box>

        {/* Gradecard Table */}
        <Card sx={{ width: "90%", maxWidth: "1200px", marginTop: "px" }}>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Subject Name</strong></TableCell>
                    <TableCell align="center"><strong>Teacher</strong></TableCell>
                    <TableCell align="center"><strong>Marks Obtained</strong></TableCell>
                    <TableCell align="center"><strong>Total Marks</strong></TableCell>
                    <TableCell align="center"><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gradeCardData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell align="center">{row.teacher}</TableCell>
                      <TableCell align="center">{row.mark}</TableCell>
                      <TableCell align="center">{row.total}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          onClick={() => handleEditClick(index)}
                          sx={{
                            color: "#5a3d31",
                            borderColor: "#5a3d31",
                            "&:hover": {
                              backgroundColor: "#e7dccd",
                              borderColor: buttonHoverColor,
                            },
                          }}
                        >
                          Edit
                        </Button>
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
                  backgroundColor: isPublished ? "#4caf50" : "#5a3d31",
                  "&:hover": {
                    backgroundColor: isPublished ? "#45a049" : buttonHoverColor,
                  },
                }}
                onClick={handlePublishClick}
              >
                {isPublished ? "Published" : "Publish"}
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

        {/* Edit Dialog */}
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Total Marks</DialogTitle>
          <DialogContent>
            <TextField
              label="Total Marks"
              type="number"
              value={newTotalMark}
              onChange={(e) => setNewTotalMark(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </motion.div>
  );
};

export default Egradecard;
