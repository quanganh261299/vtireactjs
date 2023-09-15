import { createSlice } from '@reduxjs/toolkit'
import { action } from '../routes/root'

export const counterSlice = createSlice({
    // tên của slice Reducer
    name: 'counter',
    //giá trị state ban đầu
    initialState: {
        value: 0,
        name: 'Super hero'
    },
    // phương thức tính toán reducer
    reducers: {
        increment: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        updateText: (state, action) => {
            state.name = action.payload;
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, updateText } = counterSlice.actions

export default counterSlice.reducer