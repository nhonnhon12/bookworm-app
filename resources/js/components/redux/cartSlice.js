import {createSelector, createSlice} from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: JSON.parse(localStorage.getItem('book-cart')) || [],
    },
    reducers: {
        setItem: (state, action) => {
            var i = 0;
            for(i = 0; i < state.items.length; i++){
                if(state.items[i].id === action.payload.id) break;
            }
            state.items[i] = {id: action.payload.id, num: action.payload.num};
            localStorage.setItem('book-cart', JSON.stringify(state.items));
            console.log(state.items.length);
        },
    },
})

export const { setItem } = cartSlice.actions

export const selectCart = (state) => state.cart.items

export default cartSlice.reducer
