import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const notifyError = (err) => toast.error(`Ошибка ${err}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
});

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (_,{getState}) => {
        const {bookSlice} = getState();
        const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${bookSlice.searchValue}+subject:${bookSlice.categorySelected}&orderBy=${bookSlice.sortByValueSelected}&maxResults=30&&startIndex=${bookSlice.startIndex}`)
            .then(res => res.data)
            .catch(err => notifyError(err));
        return res;
    }
)

export const fetchBookById = createAsyncThunk(
    'books/fetchBookById',
    async (bookId) => {
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then(res => res.data)
        .catch(err => notifyError(err));
        return res;
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
        totalBooks: 0,
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
            state.totalBooks = action.payload.totalBooks;
        })
        builder.addCase(fetchBookById.fulfilled, (state, action)=>{
            state.currentBook = action.payload;
        })
    },
});

export const { setSearchValue, setStatus, setCategorySelected, setSortByValueSelected, setStartIndex, setCurrentBook } = bookSlice.actions;

export default bookSlice.reducer;
