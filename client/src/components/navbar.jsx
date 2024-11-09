import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  faUser,
  faSignInAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Logout, reset } from "../store/user-store/userSlice";
import { Button, Flex } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
const Navbar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => {
    return state.user;
  });
  const onLogout = () => {
    dispatch(Logout());
    dispatch(reset());
    navigate("/login ");
  };

  return (
    <div className="flex justify-between items-center  w-full h-full pt-3 text-slate-100 bg-cyan-800">
      <h1 className="font-bold text-2xl text-slate-100  px-2 ">Daily Brahma</h1>
      <div className="flex items-stretch  h-full w-1/3 justify-center  gap-5  ">
        <NavLink className="flex px-2  h-full py-2.5  duration-300 hover:bg-cyan-600 rounded-t-xl items-center " to="/Login">
          Groups
         
        </NavLink>

        <NavLink className="flex px-2 py-2.5 h-full items-center rounded-t-[16px]  duration-300 hover:bg-cyan-600" to="/Register">
          Settings
         
        </NavLink>
      </div>
      <div className="  flex justify-end gap-5">
        <Flex gap={5}>
          <Button
            variant={"text"}
            className="!font-light flex px-2 text-sm  h-full items-center gap-4"
            onClick={onLogout}
          >
            <p>Logout</p>
            <LuLogOut />
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default Navbar;
