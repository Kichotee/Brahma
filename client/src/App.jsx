import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Main from "./components/mainPage";
import { BrowserRouter, Routes, Route, NavLink, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Register from "./components/register";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from "./components/Login";


function App() {
		
	return (
		<div className="h-screen w-screen bg-slate-100  font-sans">
			
	<BrowserRouter>
	
			<Navbar></Navbar>
			<Routes>
				<Route index element={<Main/>} />
				<Route path="/Register" element={<Register/>} />
				<Route path="/Login" element={<Login/>} />
				
			</Routes>
	<ToastContainer/>
	</BrowserRouter>


			
		</div>
	);
}

export default App;
