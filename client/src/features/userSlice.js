import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userservice.js'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}
// Register user
export const register = createAsyncThunk('user/register', 
    async (user, thunkAPI) => {
        try {
            return await userService.register(user)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) ||
            err.message || err.toString

            return thunkAPI.rejectWithValue(message)
    }
    }
)
// login user
export const login = createAsyncThunk('user/login', 
    async (user, thunkAPI) => {
        try {
            return await userService.login(user)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) ||
            err.message || err.toString

            return thunkAPI.rejectWithValue(message)
    }
    }
)

export const Logout = createAsyncThunk('user/logout',
    async ()=>{
        await userService.Logout()
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state)=>{
            state.isLoading=true
           
        })
        .addCase(register.fulfilled,(state, action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.user= action.payload
        })
        .addCase(register.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.message= action.payload
        })
        .addCase(login.pending, (state)=>{
            state.isLoading=true
           
        })
        .addCase(login.fulfilled,(state, action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.user= action.payload
        })
        .addCase(login.rejected, (state, action)=>{
            state.isLoading=false
            state.isError=true
            state.message= action.payload
        })
        .addCase(Logout.fulfilled, (state)=>{
            state.user=null
        })
    }
})

export default userSlice.reducer
export const { reset } = userSlice.actions
