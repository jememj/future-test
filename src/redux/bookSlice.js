import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAsyncBooks = createAsyncThunk(
    'books/fetchAsyncBooks',
    async (query) => {
        const response = await 
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}$maxResults=30`)
        return response.data
    }
)

const bookSlice = createSlice({
    name: 'bookSlice',
    initialState: {
        books: [],
        status: 'loading',
        searchValue: '',
    },
    reducers: {
        saveEditSearchValue(state, action) {
            state.searchValue = action.payload;
        },
    },
});

export const { saveEditSearchValue} = bookSlice.actions;

export default bookSlice.reducer;
