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
const getJournals= async ( token)=>{
    const config= {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
  
    const response = await axios.get(API_URL, config)
    return response.data.journals
}

const journalService = {create, getJournals}
export default journalService
