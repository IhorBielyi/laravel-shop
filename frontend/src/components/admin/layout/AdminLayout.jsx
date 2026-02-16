import React, {useMemo, useState} from "react";
import {Link as RouterLink, Outlet, useLocation} from "react-router-dom";
import AdminTopBar from "./AdminTopBar.jsx";



export default function AdminLayout() {
    return (
        <>
            {/* TOP BAR */}
            <AdminTopBar />

            {/* PAGE CONTENT */}
            <main className="w-full">
                <div className="w-full px-4 py-6">
                    <Outlet/>
                </div>
            </main>
        </>
    );
}