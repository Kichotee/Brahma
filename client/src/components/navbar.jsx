import {Link, NavLink}  from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { faUser, faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Logout, reset } from '../features/userSlice';
const Navbar = () => {
  const dispatch= useDispatch()
  
  const navigate= useNavigate()
  
  const {user}= useSelector(state=>{
    return state.user
  })
  const onLogout =()=>{
    dispatch(Logout())
    dispatch(reset())
    navigate('/')
  }

    return ( 
        <div className='flex justify-between items-center h-[10%] w-full  text-slate-100 bg-teal-700'>
          <h1 className='font-bold text-2xl text-slate-100 px-2 '>
            Daily Brahma
          </h1>
          <div className=" w-1/3 flex justify-end gap-5">
      
        {user? (<>
          <button className='btn flex px-2  h-full items-center gap-4' onClick={onLogout} >
          Logout
          <FontAwesomeIcon icon={faSignOutAlt}/>
        </button></>):(<>
          <NavLink className='flex px-2  h-full items-center ' to='/Login'>
          Login
          <FontAwesomeIcon className='pl-2' icon={faUser}/>
        </NavLink>
      
        <NavLink className='flex px-2  h-full items-center ' to='/Register'>
          Signup
          <FontAwesomeIcon className='pl-2' icon={faSignInAlt}/>
          
        </NavLink></>)}

       
          </div>
      </div>
     );
}
 
export default Navbar;