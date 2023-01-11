import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Main from "./components/mainPage";
import { createBrowserRouter, Routes, Route, NavLink, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Login from "./components/loginPage";


function App() {
	const router= createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route index element={<Main/>} />
				<Route path="/Login" element={<Login/>} />
				
			</Route>
		)
	)
	return (
		<div className="h-screen w-screen bg-slate-100  font-sans">
			<Navbar></Navbar>
			<RouterProvider router={router}/>
		</div>
	);
}

export default App;
