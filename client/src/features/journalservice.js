import axios from "axios";

const API_URL = 'http://localhost:8000/api/goals';

const create= async (journalData, token)=>{
    const config= {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
  
    const response = await axios.post(API_URL, journalData, config)
    return response.data
}

const journalService = {create}
export default journalService
