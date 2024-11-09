import axios from "axios";

const API_URL= import.meta.env.VITE_BASEURL+'api/users/'


const register = async(userData)=>{
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))

    }
    return response.data
}
const login = async(userData)=>{
    const response = await axios.post(API_URL +'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))

    }
    return response.data
}
const Logout = ()=>{ localStorage.removeItem('user')}
const userService = {register,Logout, login}
export default userService