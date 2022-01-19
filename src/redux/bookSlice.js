import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (_,{getState}) => {
        const {bookSlice} = getState();
        const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${bookSlice.searchValue}+subject:${bookSlice.categorySelected}&orderBy=${bookSlice.sortByValueSelected}&maxResults=30&&startIndex=${bookSlice.startIndex}`);
        return res.data;
    }
)

export const fetchBookById = createAsyncThunk(
    'books/fetchBookById',
    async (bookId) => {
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        return res.data;
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
        startIndex: 0,
        totalItems: 0,
        currentBook: null,
    },
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setStatus(state, action){
            state.status = action.payload;
        },
        setCategorySelected(state, action) {
            state.categorySelected = action.payload;
        },
        setSortByValueSelected(state, action) {
            state.sortByValueSelected = action.payload;
        },
        setStartIndex(state, action) {
            state.startIndex = action.payload;
        },
        setCurrentBook(state, action) {
            state.currentBook = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.fulfilled, (state, action) => {
            state.books = [...state.books, ...action.payload.items];
            state.status = true;
            state.totalItems = action.payload.totalItems;
        })
        builder.addCase(fetchBookById.fulfilled, (state, action)=>{
            state.currentBook = action.payload;
        })
    },
});

export const { setSearchValue, setStatus, setCategorySelected, setSortByValueSelected, setStartIndex, setCurrentBook } = bookSlice.actions;

export default bookSlice.reducer;
