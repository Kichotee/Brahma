import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addJournal, deleteJournal } from "../features/journals";

const JournalPage = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
    const journalData = useSelector(
		(state) => state.journals.value
	);
    const {user} = useSelector(
		(state) => state
	);
	
    
    return ( 
        <div className="grid grid-cols-3">
				<div className="add-journal flex items-center justify-center gap-4 pt-2 h-full max-h-full col-span-2 ">
					<textarea
						className="text-sm px-2 focus:outline-teal-700 border border-teal-800 rounded-lg w-48"
						name=""
						id=""
						onChange={(event) =>
							setName(event.target.value)
						}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								dispatch(
									addJournal({
										name,
										id: journalData.length + 1,
									})
								);
							}
						}}
					></textarea>
					<button
						className="bg-teal-700 px-2 rounded text-slate-100 "
						onClick={() => {
							dispatch(
								addJournal({
									name,
									id: journalData.length + 1,
								})
							);
						}}
					>
						Add
					</button>
				</div>
				<div className="  w-full h-auto overflow-y-scroll">
					{journalData.map((journal) => (
						<div  key={journal.id} className=" flex flex-col items-center justify-center gap-4 mt-4 h-32 min-h-32 px-2 overflow-hidden rounded-xl shadow-md w-[95%] bg-slate-50 ">
							<p className="first-letter:capitalize ">
								{journal.name}
							</p>
							<button
								className="bg-teal-700 px-2 rounded text-slate-50 "
								onClick={() => {
									dispatch(
										deleteJournal({
											id: journal.id,
										})
									);
								}}
							>
								Delete this
							</button>
						</div>
					))}
				</div>
			</div>
     );
}
 
export default JournalPage;