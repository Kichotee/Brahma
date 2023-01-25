import { useState } from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";
import { createJournal,  } from "../features/journals";

const JournalPage = () => {
	const dispatch = useDispatch();
	const [text, setText] = useState("");
	

	const onSubmit = (e) => {
		e.preventDefault()
		dispatch(createJournal({text}))
		setText('')
	};

	return (
		<div className="grid grid-cols-3">
			<form onSubmit={onSubmit}>


			<div className="add-journal flex items-center justify-center gap-4 pt-2 h-full max-h-full col-span-2 ">
				<textarea
					className="text-sm px-2 focus:outline-teal-700 border border-teal-800 rounded-lg w-48"
					name=""
					id=""
					onChange={(event) =>
						setText(event.target.value)
					}
					
				></textarea>
				<button
					className="bg-teal-700 px-2 rounded text-slate-100 "
					
				>
					Add
				</button>
			</div>



			</form>
		
		</div>
	);
};

export default JournalPage;
