import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";

import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../../app/authSlice";

const Header = () => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);

  const menuIsOpen = Boolean(anchorEl);

  const closeMeu = () => setAnchorEl(null);
  const onMenuClickHandler = (e) => setAnchorEl(e.target);

  const logout = () => {
    dispatch(logoutAction());
    closeMeu();
    router.replace("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          variant="h6"
        >
          <Link href="/">
            <a>Product Management App</a>
          </Link>
        </Typography>
        <Link href="/">
          <a>
            <CatchingPokemonIcon sx={{ display: { sm: "none" } }} />
          </a>
        </Link>

        <IconButton
          sx={{ flexGrow: 0, ml: "auto" }}
          color="inherit"
          onClick={onMenuClickHandler}
        >
          <MenuIcon />
        </IconButton>
        {!auth.isLoggedIn && (
          <Menu open={menuIsOpen} onClose={closeMeu} anchorEl={anchorEl}>
            <MenuItem>
              <Link href="/login">Login</Link>
            </MenuItem>
          </Menu>
        )}
        {auth.isLoggedIn && (
          <Menu
            open={menuIsOpen}
            onClose={closeMeu}
            anchorEl={anchorEl}
            transformOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <MenuItem>
              <Link href="/add-product">
                Add a New Product
              </Link>
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
