import { Box } from "@chakra-ui/react";
import { LuTrash } from "react-icons/lu";
import {
  deleteJournals,
  getJournals,
} from "../store/journal-store/journal-slice";
import { useDispatch } from "react-redux";

const Journal = ({ journal }) => {
  console.log(journal);

  const dispatch = useDispatch();
  function onDelete() {
   dispatch(deleteJournals(journal._id))
    // dispatch(getJournals());
    console.log(journal);
  }
  return (
    <>
      <Box
        p={4}
        bg={"white"}
        minW={234}
        rounded={"xl"}
        className=""
        pos={"relative"}
      >
        <div className=""></div>
        <h2>{new Date(journal._id).toLocaleString}</h2>

        <div className="flex justify-between items-center">
          <h2 className="text-sm first-letter:capitalize font-semibold text-teal-500">{journal.title || "Title"}</h2>
          <button onClick={onDelete}>
            <LuTrash size={16} color="#ddd" />
          </button>
        </div>
        <p className=" max-w-[194px] truncate text-[#181818cc] text-xs">{journal.text}</p>
      </Box>
    </>
  );
};

export default Journal;
