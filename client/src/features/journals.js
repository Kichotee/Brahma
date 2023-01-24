import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { useReducer } from 'react'
import journalService from './journalservice'

const initialState={
    journals:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const createJournal = createAsyncThunk('journal/create',
    async(journalData, thunkApi)=>{
        try {
            const token = thunkApi.getState().user.user.token
            return await journalService.create(journalData, token)
            
        } catch (error) {
            const message = (err.response && err.response.data && err.response.data.message) ||
            err.message || err.toString

            return thunkAPI.rejectWithValue(message)
        }
    }

)

export const journalSlice = createSlice({
    name:'journals',
    reducers:{
        addJournal:(state, action)=>{
            state.goals.push(action.payload)
        },
        deleteJournal:(state, action)=>{
           state.goals= state.goals.filter((journal)=>
            journal.id !== action.payload.id
           )
        },
        editJournal:(state, action)=>{
            state.goals.map((journal)=>{
                if(journal.id===action.payload.id){
                    journal.name===action.payload.name
                }
            })        
        }
    }
})
export default journalSlice.reducer
export const {addJournal, deleteJournal} = journalSlice.actions