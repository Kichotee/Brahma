import { useDispatch, useSelector } from "react-redux";
import JournalPage from "../../auth/journal-page";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { getJournals } from "../../../store/journal-store/journal-slice";
import { reset } from "../../../store/user-store/userSlice";
import Journal from "../../../components/Journal";
import { HStack, VStack } from "@chakra-ui/react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  useEffect(()=>{
	dispatch(getJournals())

},[]);
  const { journals, isLoading, isError, message } = useSelector((state) => {
	  return state.journals;
	});
	

  const userJournals = useMemo(() => {
    return journals;
  }, [journals]);
  console.log(userJournals);

  return (
    <div className=" h-[90%] px-32 flex flex-col gap-8 max-h-[90%] overflow-hidden">
      <JournalPage />
      <>
        {userJournals.length > 0 ? (
          <HStack flexWrap={"wrap"}  gap={"12"}>
            <>
              {userJournals?.map((journal) => {
                return <Journal key={journal._id} journal={journal}></Journal>;
              })}
            </>
          </HStack>
        ) : (
          <></>
        )}
      </>
    </div>
  );
};

export default Dashboard;
