import React, {useMemo, useState} from "react";
import {Link as RouterLink, Outlet, useLocation} from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";

export default function AdminLayout() {
    const location = useLocation();

    const [brandsAnchor, setBrandsAnchor] = useState(null);
    const brandsOpen = Boolean(brandsAnchor);

    const openBrandsMenu = (e) => setBrandsAnchor(e.currentTarget);
    const closeBrandsMenu = () => setBrandsAnchor(null);

    const brandsActive = useMemo(() => {
        return location.pathname.startsWith("/admin/brands");
    }, [location.pathname]);

    return (
        <>
            {/* TOP BAR */}
            <AppBar position="sticky" elevation={0}>
                <Toolbar className="min-h-[64px]">
                    <Container maxWidth={false} className="px-4">
                        <div className="flex items-center justify-between gap-3">
                            {/* Left: back to site */}
                            <div className="flex items-center gap-2">
                                <IconButton
                                    component={RouterLink}
                                    to="/"
                                    color="inherit"
                                    edge="start"
                                    aria-label="Back to site"
                                    className="rounded-xl"
                                >
                                    <ArrowBackRoundedIcon/>
                                </IconButton>

                                <Typography
                                    component={RouterLink}
                                    to="/admin"
                                    variant="h6"
                                    className="font-semibold"
                                >
                                    Admin
                                </Typography>
                            </div>

                            {/* Center: menus */}
                            <div className="flex items-center gap-2">
                                <Button
                                    color="inherit"
                                    onClick={openBrandsMenu}
                                    endIcon={<KeyboardArrowDownRoundedIcon/>}
                                    className={`rounded-xl px-4 ${
                                        brandsActive ? "bg-white/15" : ""
                                    }`}
                                >
                                    Бренди
                                </Button>

                                <Menu
                                    anchorEl={brandsAnchor}
                                    open={brandsOpen}
                                    onClose={closeBrandsMenu}
                                    anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                                    transformOrigin={{vertical: "top", horizontal: "center"}}
                                    PaperProps={{
                                        className: "rounded-2xl shadow-lg",
                                    }}
                                >
                                    <MenuItem
                                        component={RouterLink}
                                        to="/admin/brands/create"
                                        onClick={closeBrandsMenu}
                                        className="gap-2"
                                    >
                                        <AddRoundedIcon fontSize="small"/>
                                        Створити бренд
                                    </MenuItem>

                                    <Divider/>

                                    <MenuItem
                                        component={RouterLink}
                                        to="/admin/brands"
                                        onClick={closeBrandsMenu}
                                        className="gap-2"
                                    >
                                        <ListAltRoundedIcon fontSize="small"/>
                                        Перегляд брендів
                                    </MenuItem>
                                </Menu>
                            </div>

                            {/* Right: placeholder (можно потом user info / logout) */}
                            <Box className="min-w-[40px]"/>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>

            {/* PAGE CONTENT */}
            <main className="w-full">
                <div className="w-full px-4 py-6">
                    <Outlet/>
                </div>
            </main>
        </>
    );
}