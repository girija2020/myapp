import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Data from "./components/users/Data";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import Tempdata from "./components/users/Tempdata";
import One from "./components/common/one";
import D from "./components/users/d";
import Login from "./components/common/Login";
import  Home2 from "./components/common/Home2";
import Nav from "./components/templates/Nav";

const Layout = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="data" element={<D />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tempdata" element={<Tempdata />} />
          <Route path="one" element={<One />} />
          <Route path="Login" element={<Login />} />
          <Route path="Home" element={<Home />} />
          <Route path="Home2" element={<Home2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
