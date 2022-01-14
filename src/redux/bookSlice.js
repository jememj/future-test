import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAsyncBooks = createAsyncThunk(
    'books/fetchAsyncBooks',
    async (_,{getState}) => {
        const {bookSlice} = getState();
        console.log(bookSlice);
        return await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${bookSlice.searchValue}
            +subject:${bookSlice.categorySelected}
            &orderBy=${bookSlice.sortByValueSelected}`
            ).then(res => res.data)
    }
)

const bookSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        status: true,
        searchValue: '',
        categorySelected: '',
        sortByValueSelected: 'relevance',

    },
    reducers: {
        editSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        editStatus(state, action){
            state.status = action.payload;
        },
        editCategorySelected(state, action) {
            state.categorySelected = action.payload;
        },
        editSortByValueSelected(state, action) {
            state.sortByValueSelected = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncBooks.fulfilled, (state, action) => {
            state.books = [...action.payload.items];
            state.status = true;
        })
    }, 
});

export const { editSearchValue, editStatus, editCategorySelected, editSortByValueSelected } = bookSlice.actions;

export default bookSlice.reducer;
