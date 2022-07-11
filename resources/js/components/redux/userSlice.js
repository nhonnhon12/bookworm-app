import {createSelector, createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: -1,
        name: '',
    },
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
    },
})

export const { setId, setName } = userSlice.actions

export const selectId = (state) => state.user.id
export const selectName = (state) => state.user.name

export default userSlice.reducer
