import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJournal } from "../../store/journal-store/journal-slice";
import { Button } from "@chakra-ui/react";

const JournalPage = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createJournal({ text, title }));
    setText("");
  };

  return (
    <div className="">
      <form onSubmit={onSubmit} className="f;e">
        <div className="  gap-4 pt-2 h-full max-h-full w-full flex flex-col items-start justify-start   ">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="text-sm px-2 bg-transparent py-2 text-stone-500 w-full focus:outline-teal-700 border border-teal-800 rounded-lg "
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            cols={6}
            placeholder="Details"
            rows={4}
            className="text-sm px-2 bg-transparent py-2 text-stone-500 w-full focus:outline-teal-700 border border-teal-800 rounded-lg "
            name=""
            id=""
            onChange={(event) => setText(event.target.value)}
          ></textarea>
          <Button
            variant={"outline"}
            color={"#F0f0f0"}
            type="submit"
            className="bg-teal-700 px-2 rounded text-slate-100 "
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JournalPage;
