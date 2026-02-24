import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/site/Home.jsx";
import Login from "./pages/site/Login.jsx";
import Register from "./pages/site/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/admin/layout/AdminLayout.jsx";
import BrandsIndex from "./pages/admin/brands/BrandsIndex.jsx";
import GuestRoute from "./components/GuestRoute";
import BrandEdit from "./pages/admin/brands/BrandEdit.jsx";
import BrandCreate from "./pages/admin/brands/BrandCreate.jsx";
import BrandShow from "./pages/admin/brands/BrandShow.jsx";
import CategoriesIndex from "./pages/admin/categories/CategoriesIndex";
import CategoryCreate from "./pages/admin/categories/CategoryCreate.jsx";
import CategoryEdit from "./pages/admin/categories/CategoryEdit.jsx";
import CategoryShow from "./pages/admin/categories/CategoryShow.jsx";


export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>

            <Route
                path="/login"
                element={
                    <GuestRoute>
                        <Login/>
                    </GuestRoute>
                }
            />

            <Route
                path="/register"
                element={
                    <GuestRoute>
                        <Register/>
                    </GuestRoute>
                }
            />

            <Route path="*" element={<Navigate to="/" replace/>}/>

            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="brands" element={<BrandsIndex />} />
                <Route path="brands/create" element={<BrandCreate />} />
                <Route path="brands/:id" element={<BrandShow />} />
                <Route path="brands/:id/edit" element={<BrandEdit />} />

                <Route path="categories" element={<CategoriesIndex />} />
                <Route path="categories/create" element={<CategoryCreate />} />
                <Route path="categories/:id" element={<CategoryShow />} />
                <Route path="categories/:id/edit" element={<CategoryEdit />} />
            </Route>
        </Routes>
    );
}