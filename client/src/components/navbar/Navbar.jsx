import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setRole, setUser } from "../../store/auth";
import Cookies from "js-cookie";
import LogoutIcon from "@mui/icons-material/Logout";
import { Card, CardMedia } from "@mui/material";
import { toast } from "react-toastify";

const drawerWidth = 240;

function DrawerAppBar(props) {
  // navLink active status
  let activeStyle = {
    textDecoration: "none",
    backgroundColor: "#FFB4B4",
    borderRadius: ".4rem",
    minWidth: '4rem',
    padding: '0.1rem',
    fontColor: '#7f18c8'
  };

  let nonActiveStyle = {
    textDecoration: "none",
  };

  // customised functionalities
  const userName = useSelector((state) => state.auth.userName);
  // redux functions importing
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  const [navItems, setNavItems] = React.useState([]);
  const studentNavItems = [
    // {
    //   title: "Home",
    //   link: "student",
    // },
    {
      title: "Class-Room",
      link: "/student/courses",
    },
    {
      title: "Posts",
      link: "/student/post",
    },
    {
      title: "Certificates",
      link: "/student/certificate",
    },
    {
      title: 'Chat',
      link: '/chat'
    }
  ];

  const publicNavItems = [
    // {
    //   title: "Home",
    //   link: "/public",
    // },
    {
      title: "Class-Room",
      link: "/public/sheduleCourses",
    },
    {
      title: "Post",
      link: "/public/addPost",
    },
    {
      title: "Certificate",
      link: "/public/certificateUpload",
    },
    {
      title: 'Chat',
      link: '/chat'
    }
  ];

  const adminNavItems = [
    // {
    //   title: "Home",
    //   link: "/admin",
    // },
    {
      title: "Public",
      link: "/admin/publicList",
    },
    {
      title: "Students",
      link: "/admin/studentList",
    },
    {
      title: "Posts",
      link: "/admin/adminPosts",
    },
    {
      title: 'Chat',
      link: '/chat'
    }
  ];

  // const Token = Cookies.get('Token')
  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("Token");
    navigate("/");
    toast.success("Logout Successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" color="primary" sx={{ my: 2, fontWeight: 700 }}>
        Hive
      </Typography>
      <Divider />

      {role === "student" && (
        <>
          <Card
            sx={{
              height: "8rem",
              width: "8rem",
              borderRadius: "50%",
              backgroundColor: "yellow",
              mt: 3,
              mb: 2,
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: "100%", height: "100%" }}
              image="https://media.istockphoto.com/photos/headshot-portrait-of-smiling-ethnic-businessman-in-office-picture-id1300512215?b=1&k=20&m=1300512215&s=612x612&w=0&h=pP5ksvhx-gIHFVAyZTn31H_oJuhB0nX4HnLLUN2kVAg="
              alt="Live from space album cover"
            />
          </Card>
          <Typography variant="body1" color="primary" sx={{ fontWeight: 500 }}>
            {userName}
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            Bsc Computer Science
          </Typography>

          <Button
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            size="small"
          >
            Logout
          </Button>
        </>
      )}
      {role === "admin" && (
        <List>
          {adminNavItems.map((item, val) => (
            <ListItem key={val} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }} onClick={() => navigate(item.link)}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      {
        role === 'public' &&
        <List>
          {publicNavItems.map((item, val) => (
            <ListItem key={val} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }} onClick={() => navigate(item.link)}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      }

      {/* profile ui while student Login */}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {/* <CssBaseline /> */}
      <AppBar component="nav" sx={{ mb: 3 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "block", fontWeight: 600 } }}
          >
            HIVE
          </Typography>
          {
            isAuthenticated && <Typography variant="subtitle1 " color="white" sx={{ mr: '20rem' }}>
              Welcome, {userName}
            </Typography>
          }

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {/* navbar for students */}
            {role === "student" &&
              studentNavItems.map((item, val) => {
                return (
                  <NavLink
                    to={item.link}
                    style={({ isActive }) =>
                      isActive ? activeStyle : nonActiveStyle
                    }
                  >
                    <Button key={val} sx={{ color: "#fff" }}>
                      {item.title}
                    </Button>
                  </NavLink>
                );
              })}

            {/* navbar for students */}
            {role === "public" &&
              publicNavItems.map((item, val) => {
                return (
                  <NavLink
                    to={item.link}
                    style={({ isActive }) =>
                      isActive ? activeStyle : nonActiveStyle
                    }
                  >
                    <Button key={val} sx={{ color: "#fff" }}>
                      {item.title}
                    </Button>
                  </NavLink>
                );
              })}

            {/* navbar for students */}
            {role === "admin" &&
              adminNavItems.map((item, val) => {
                return (
                  <NavLink
                    to={item.link}
                    style={({ isActive }) =>
                      isActive ? activeStyle : nonActiveStyle
                    }
                  >
                    <Button key={val} sx={{ color: "#fff" }}>
                      {item.title}
                    </Button>
                  </NavLink>
                );
              })}
            {isAuthenticated && (
              <Button
                startIcon={<LogoutIcon />}
                onClick={handleLogout}
                sx={{ color: "#fff", ml: 4 }}
              >
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ mb: "6rem" }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
