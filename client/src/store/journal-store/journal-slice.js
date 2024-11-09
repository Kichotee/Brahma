import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { useReducer } from 'react'
import journalService from './journal-service'

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
export const getJournals = createAsyncThunk('journal/getJournals',
    async(_, thunkApi)=>{
        try {
            const token = thunkApi.getState().user.user.token
            return await journalService.getJournals( token)
            
        } catch (error) {
            const message = (err.response && err.response.data && err.response.data.message) ||
            err.message || err.toString

            return thunkAPI.rejectWithValue(message)
        }
    }

)
export const deleteJournals = createAsyncThunk('journal/deleteJournal',
    async(id, thunkApi)=>{
        try {
            const token = thunkApi.getState().user.user.token
            return await journalService.deleteJournals( token,id)
            
        } catch (error) {
            const message = (err.response && err.response.data && err.response.data.message) ||
            err.message || err.toString

            return thunkAPI.rejectWithValue(message)
        }
    }

)

export const journalSlice = createSlice({
    name:'journals',
    initialState,
    reducers:{
        reset:(state)=>{
            state.initialState
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(createJournal.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(createJournal.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.journals=[action.payload,...state.journals]

        })
        .addCase(createJournal.rejected, (state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message= action.payload
        })
        .addCase(getJournals.pending, (state)=>{
            state.isLoading=true
        })
        .addCase(getJournals.fulfilled, (state,action)=>{

            state.isLoading=false
            state.isSuccess=true
            state.journals=action.payload.data.journals
            console.log(action)


        })
        .addCase(getJournals.rejected, (state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message= action.payload
        })
       .addCase(deleteJournals.pending, (state)=>{
            state.isLoading=true
            state.isSuccess=false

        }) 
        .addCase(deleteJournals.fulfilled, (state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.journals=[...state.journals.filter((journal)=>journal._id!==action.payload.data.id)]
            console.log(action)
        })
        .addCase(deleteJournals.rejected, (state,action)=>{


            state.isLoading=false
            state.isError=true
            state.message= action.payload
        })
    }
})
export default journalSlice.reducer
export const {reset} = journalSlice.actions