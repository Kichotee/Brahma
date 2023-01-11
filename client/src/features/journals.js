import {createSlice} from '@reduxjs/toolkit'
import { useReducer } from 'react'

export const journalSlice = createSlice({
    name:'journals',
    initialState:{value:[]},
    reducers:{
        addJournal:(state, action)=>{
            state.value.push(action.payload)
        },
        deleteJournal:(state, action)=>{
           state.value= state.value.filter((journal)=>
            journal.id !== action.payload.id
           )
        },
        editJournal:(state, action)=>{
            state.value.map((journal)=>{
                if(journal.id===action.payload.id){
                    journal.name===action.payload.name
                }
            })        
        }
    }
})
export default journalSlice.reducer
export const {addJournal, deleteJournal} = journalSlice.actions