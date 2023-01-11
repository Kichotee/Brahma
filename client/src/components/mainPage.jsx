import {
	addJournal,
	deleteJournal,
} from "../features/journals";
import {
	useDispatch,
	useSelector,
} from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,  faRobot,faEnvelope } from "@fortawesome/free-solid-svg-icons";
import JournalPage from "./journalPage";
import { RouterProvider } from "react-router";

const Main = () => {
	
	
	return (
		<div className="grid grid-cols-[20%_80%] h-[90%] max-h-[90%] overflow-hidden">
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
		</div>
	);
};

export default Main;
