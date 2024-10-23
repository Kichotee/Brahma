
import {
	useDispatch,
	useSelector,
} from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,  faRobot,faEnvelope } from "@fortawesome/free-solid-svg-icons";
import JournalPage from "./journalPage";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getJournals } from "../features/journals";
import { reset } from "../features/userSlice";
import Journal from "./Journal";
import '../App.css'



const Main = () => {
	const {user}= useSelector((state)=>{
		return state.user
	})	
	const {journals, isLoading, isError, message}= useSelector((state)=>{
		return state.journals
	})	
	const dispatch = useDispatch()
	const navigate = useNavigate()
	// dispatch(getJournals())
	useEffect(()=>{
		if(!user){
			navigate('/Login')
		}
		if (isError) {
			console.log(message);

		}
		return()=>{
			dispatch(reset)
		}
		
	}, []);
	useEffect(()=>{
		if (!isError) {
			
		}
	},[user])
	console.log(journals);
	return (
		<div className="grid grid-cols-[20%_40%_40%] h-[90%] max-h-[90%] overflow-hidden">
			<aside className="bg-teal-700 h-full border-t-2 w-full ">
			<nav className="w-full h-full mt-4 flex items-center">
				<ul className="flex flex-col items-center w-full h-1/2 justify-between text-slate-100">
					<li className="flex w-full">
						<FontAwesomeIcon
							icon={faUser}
							className=" mr-6 text-3xl basis-1/4"
						/>
						<h2>Your journals</h2>
					</li>
					<li className="flex w-full">
						<FontAwesomeIcon
							icon={faEnvelope}
							className=" mr-6 text-3xl basis-1/4"
						/>
						<h2>Mail a journal</h2>
					</li>
					<li className="flex w-full">
						<FontAwesomeIcon
							icon={faRobot}
							className=" mr-6 text-3xl basis-1/4"
						/>
						<h2>
							Get answers to a thought
						</h2>
					</li>
				</ul>
			</nav>
		</aside>
		<JournalPage/>
		<>
			<section>
				{journals.length>0? 
				<>
					{journals.map((journal)=>{
						<>
						<Journal key={journal._id} journal={journal}></Journal>
						
						<>
							{journal[0]}
						</>
						</>
					})}
					{/* {journals[0][0]._id} */}
				
				
				</>
				:
				
				
				<>
				
				
				</>}
			</section>
		</>
		</div>
	);
};

export default Main;
