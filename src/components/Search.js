import styled from 'styled-components'
import { useState } from "react";
import axios from 'axios';
import { useDispatch  } from 'react-redux';
import { fetchAsyncBooks, saveEditSearchValue } from '../redux/bookSlice';

export default function Search() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(saveEditSearchValue(e.target.value));
    }
    const handleSubmit = (e) => {
        dispatch(fetchAsyncBooks());
        e.preventDefault();
        // setLoading(true);
        // axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}$maxResults=30`)
        // .then(data => {
        //     setData(data.data.items);
        //     setLoading(false);
        // }).catch(err => {
        //     console.log(err.response);
        //     setLoading(true);
        // })
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
                <select>
                    <option>relevance</option>
                    <option>newest</option>
                </select>
            </Form>
            <Form>
                <p>categories</p>
                <select>
                    <option>all</option>
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
