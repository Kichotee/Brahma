import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { login } from "../../store/user-store/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Button, Heading } from "@chakra-ui/react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Login = () => {
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
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
    if (password.length == 0 || email.length == 0) {
      setError(true);
    } else {
      const userData = {
        email,
        password,
      };
      dispatch(login(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    // dispatch(reset())
  }, [user, isError, isLoading, message, navigate, dispatch]);

  return (
    <>
      <div className="h-[90%] w-full  flex justify-center items-center overflow-hidden ">
        <form
          className="   border border-teal-700 
            rounded-2xl md:shadow-sm flex flex-col w-full max-w-[80vw] py-6 lg:max-w-[40vw] justify-center 
            items-center gap-2 "
          onSubmit={handleSubmit}
        >
			<Heading fontSize={18} className="text-lg font-bold ">Login to your account</Heading>
          <fieldset className="flex flex-col items-start w-1/2">
            <label htmlFor="email " className="">
              Email
            </label>
            <input
              className="w-full py-2 px-1 focus:outline-none focus:border-teal-500 rounded-md border text-sm text-[#181818ab]"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
            />
            {error && email.length == 0 ? (
              <span className="text-red-700 text-xs">{`email is empty`}</span>
            ) : (
              ""
            )}
          </fieldset>
          <fieldset className="flex flex-col w-1/2 relative">
            <label htmlFor="password" className="">
              Password
            </label>
            <input
              ref={pass}
              className="w-full py-2 px-1 focus:outline-none focus:border-teal-500 rounded-md border text-sm text-[#181818ab]"
              type={passwordType}
              value={password}
              name="password"
              onChange={onChange}
            />
            {/* <FontAwesomeIcon
              onClick={showPassword}
              icon={passwordType == "password" ? faEye : faEyeSlash}
              className="absolute right-2 bottom-[10%] cursor-pointer"
            /> */}
			<button className="absolute right-2 bottom-[20%] text-sm cursor-pointer">
				{
					passwordType == "password" ?<LuEye/>:<LuEyeOff/>
				}
			</button>
            {error && password.length == 0 ? (
              <span className="text-red-700 text-xs">{`password is empty`}</span>
            ) : (
              ""
            )}
            {/* {error &&
					!password.includes(
						"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
					) ? (
						<span className="text-red-700 text-xs">{`password does not contain a number, uppercase or lowercase letter`}</span>
					) : (
						""
					)} */}
          </fieldset>

          <Button
            className="bg-teal-500 w-28 mt-4 rounded-md text-slate-100"
            type="Submit"
          >
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
