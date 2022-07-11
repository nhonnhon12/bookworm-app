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
        setEmpty: (state) => {
            state.items = [];
            localStorage.setItem('book-cart', JSON.stringify(state.items));
        },
    },
})

export const { setItem, setEmpty } = cartSlice.actions

export const selectCart = (state) => state.cart.items

export const selectList = (state) => {
    var listId = '';
    var listNum = '';
    for(var i = 0; i < state.items.length; i++){
        if(state.items[i].num !== 0){
            listId += state.items[i].id + ',';
            listNum += state.items[i].num + ',';
        }
    }
    return({
        id: listId,
        num: listNum,
    });
}

export default cartSlice.reducer
