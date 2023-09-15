import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './couter/couterSlice'
import bgReducer from './couter/bgSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        // Có thể add thêm các Reducer khác nhau
        // contact: contactReducer,
        // cart: cartReducer
        bg: bgReducer,
    }
})