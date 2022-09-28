import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar >
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            // onClick={() => navigate("/")}
          >
            Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={() => navigate("/Home2")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/data")}>
            Data
          </Button>
          <Button color="inherit" onClick={() => navigate("/register")}>
            Graphs
          </Button>
          <Button color="inherit" onClick={() => navigate("/profile")}>
            Analysis
          </Button>
          <Button color="inherit" onClick={() => navigate("/")}>
            Logout
          </Button>
          
          
          
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
