import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { register, reset } from "../../store/user-store/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Register = () => {
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = formData;

  const [passwordType, setPasswordType] = useState("password");
  const pass = useRef();
  const showPassword = () => {
    if (passwordType == "password") {
      setPasswordType("text");
    } else if (passwordType == "text") {
      setPasswordType("password");
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isLoading, message, isSuccess } = useSelector(
    (state) => {
      return state.user;
    }
  );
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length == 0 || password.length == 0 || email.length == 0) {
      setError(true);
    } else {
      const userData = {
        name: username,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  //  useEffect(()=>{
  // 		if (isError) {
  // 			toast.error(message)
  // 		}
  // 		if (isSuccess|| user) {
  // 			navigate('/')

  // 		}
  // 		dispatch(reset())

  // 		// dispatch(reset())
  // 	}, [user, isError,isLoading,message, navigate,dispatch])

  return (
    <div className="h-[90%] w-full  flex justify-center flex-col gap-2 items-center overflow-hidden ">
      <form
        className="border border-teal-700 
            rounded-2xl md:shadow-sm flex flex-col w-full max-w-[80vw] py-6 px-4 lg:max-w-[30vw] justify-center 
            items-center gap-4"
        onSubmit={handleSubmit}
      >
        <fieldset className="flex flex-col items-start w-full">
          <label htmlFor="email " className="text-sm text-black/60">
            Name
          </label>

          <div className="border rounded-lg focus-within:border-teal-600 text-xs duration-200 overflow-hidden focus:outline-none text-[#181818ab]  focus:border-teal-500 w-full">
            <input
              className="w-full  focus:outline-none px-2 py-1 focus:border-none"
              name="username"
              value={username}
              onChange={onChange}
            />
          </div>
          {error && username.length == 0 ? (
            <span className="text-red-700 self-start text-xs">{`userName is empty`}</span>
          ) : (
            ""
          )}
        </fieldset>
        <fieldset className="flex flex-col w-full item-start">
          <label htmlFor="email " className="text-sm text-black/60">
            Email
          </label>
          <div className="border rounded-lg focus-within:border-teal-600 text-xs duration-200 overflow-hidden focus:outline-none text-[#181818ab]  focus:border-teal-500 w-full">
            <input
              className="w-full  focus:outline-none px-2 py-1 focus:border-none"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          {error && email.length == 0 ? (
            <span className="text-red-700 self-start text-xs">{`email is empty`}</span>
          ) : (
            ""
          )}
        </fieldset>
        <fieldset className="flex flex-col w-full items-start relative">
          <label htmlFor="email " className="text-sm text-black/60">
            Password
          </label>
          <div className="relative w-full">
            <div className="border relative rounded-lg focus-within:border-teal-600 text-xs duration-200 overflow-hidden focus:outline-none text-[#181818ab]  focus:border-teal-500 w-full">
              <input
                className="w-full  focus:outline-none px-2 py-1 focus:border-none"
                name="password"
                type={passwordType}
                value={password}
                onChange={onChange}
              />
            </div>
          <button className="absolute right-2 bottom-[20%] text-sm cursor-pointer">
            {passwordType == "password" ? <LuEye /> : <LuEyeOff />}
          </button>
          </div>


          {error && password.length == 0 ? (
            <span className="text-red-700 text-xs">{`password is empty`}</span>
          ) : (
            ""
          )}
        </fieldset>

        <Button
          className="bg-teal-500 w-28 mt-4 rounded-md text-slate-100"
          type="Submit"
        >
          Login
        </Button>
      </form>

      <span className=" text-xs ">
        <span>Already have an account?</span>
        <Link to={"/login"} className="text-cyan-900"> Login</Link>
      </span>
    </div>
  );
};

export default Register;
