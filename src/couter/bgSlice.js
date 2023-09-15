import { createSlice } from '@reduxjs/toolkit'
import { action } from '../routes/root'

export const bgSlice = createSlice({
    // tên của slice Reducer
    name: 'bg',
    //giá trị state ban đầu
    initialState: {
        backgroundColor: 'red'
    },
    // phương thức tính toán reducer
    reducers: {
        updateBg: (state, action) => {
            state.backgroundColor = action.payload;
        },
    }
})

// Action creators are generated for each case reducer function
export const { updateBg } = bgSlice.actions

export default bgSlice.reducer