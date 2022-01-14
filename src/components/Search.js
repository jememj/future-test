import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncBooks, editSearchValue, editStatus, editCategorySelected, editSortByValueSelected } from '../redux/bookSlice';

export default function Search() {
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch(editSearchValue(e.target.value));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchAsyncBooks());
        dispatch(editStatus(false));
    }
    const handleChangeSortingBySelected = (e) => {
        dispatch(editSortByValueSelected(e.target.value));
        handleSubmit(e);
    }
    const handleChangeCategorySelected = (e) => {
        dispatch(editCategorySelected(e.target.value));
        handleSubmit(e);
    }
    
    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange}/>
            <button type="submit">поиск</button>
        </form>
        <Wrapper>
            <Form>
                <p>sorting by</p>
                <select onChange={handleChangeSortingBySelected}>
                    <option>relevance</option>
                    <option>newest</option>
                </select>
            </Form>
            <Form>
                <p>categories</p>
                <select onChange={handleChangeCategorySelected}>
                    <option value="">all</option>
                    <option>art</option>
                    <option>biography</option>
                    <option>computers</option>
                    <option>history</option>
                    <option>medical</option>
                    <option>poetry</option>
                </select>
            </Form>
        </Wrapper>
        </>
    );
}
const Form = styled.form`
    margin-left: 15px;
    text-align: center;
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`
