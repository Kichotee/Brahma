import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
	useDispatch,
	useSelector,
} from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {
	addJournal,
	deleteJournal,
} from "../features/journals";


const Login = () => {
	const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e)=>{
        e.preventDefault();
        if (username.length===0 || password.length===0|| email.length==0) {
            setError(true)
        }
    }
    const [passwordType, setPasswordType] = useState("password");
    const pass= useRef()
    const showPassword =()=>{
        if (passwordType=="password") {
           setPasswordType('text')
        }
        else if( passwordType=="text"){
            setPasswordType('password')
            
        } 
    }
    

    const journal = useSelector((state) => state.journal);  
	const dispatch = useDispatch();

	return (
		<div className="h-[90%] w-full overflow-hidden">
			<form className="h-3/4 w-1/2 mx-auto mt-12 bg-teal-700 
            rounded-2xl shadow-sm flex flex-col justify-center 
            items-center gap-2" onSubmit={handleSubmit}>
				<fieldset className="flex flex-col w-1/2">
					<label htmlFor='name'
                    className="self-center">Name</label>

					<input
						className="w-full  rounded-md border border-teal-40"
						type="text"
						onChange={(event) =>
							setUsername(event.target.value)
						}
					/>
                    {error&&username.length==0? <span className="text-red-700 text-xs">{`userName is empty`}</span>:''}
               
				</fieldset>
				<fieldset className="flex flex-col w-1/2">
					<label htmlFor='email '
                    className="self-center">Email</label>
					<input
						className="w-full rounded-md border border-teal-400"
						type="email"
						onChange={(event) =>
							setEmail(event.target.value)
						}
                        />
                        {error&&email.length==0? <span className="text-red-700 text-xs">{`email is empty`}</span>:''}
				</fieldset>
				<fieldset className="flex flex-col w-1/2 relative">
					<label htmlFor='password'
                    className="self-center">password</label>
					<input
                    ref={pass}
						className="w-full rounded-md border border-teal-400"
						type={passwordType}
						onChange={(event) =>
							setPassword(event.target.value)
						}
                        />
                        <FontAwesomeIcon onClick={showPassword} icon={passwordType=="password"? faEye:faEyeSlash} className="absolute right-2 bottom-[10%] cursor-pointer"/>
                        {error&&password.length==0? <span className="text-red-700 text-xs">{`password is empty`}</span>:''}
                        {error&&!password.includes("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")? <span className="text-red-700 text-xs">{`password does not contain a number, uppercase or lowercase letter`}</span>:''}
				</fieldset>

				<button className="bg-teal-500 w-28 mt-4 rounded-md text-slate-100">
                    { <NavLink onClick={handleSubmit} to="/">Login</NavLink>}
				</button>
			</form>
		</div>
	);
};

export default Login;
