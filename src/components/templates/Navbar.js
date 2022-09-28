import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar >
          <Typography
            variant="h5"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Dashboard
          </Typography>
          {/* <h1>Smart Farming</h1> */}
          <Box sx={{ flexGrow: 2 }} />
          {/* <Button color="inherit" onClick={() => navigate("/data")}>
            Data
          </Button>
          <Button color="inherit" onClick={() => navigate("/register")}>
            Graphs
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            Analysis
          </Button>
          <Button color="inherit" onClick={() => navigate("/one")}>
            SMTHG
          </Button> */}
          <Button color="inherit" onClick={() => navigate("/Login")}>
            Login 
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
