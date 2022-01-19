import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import {fetchBookById} from '../redux/bookSlice'

const selectCurrentBook = state => state.bookSlice.currentBook;

export default function CurrentBook() {
    const dispatch = useDispatch();
    let { id } = useParams();
    const book = useSelector(selectCurrentBook);

    useEffect(() => {
            if(!book){
                dispatch(fetchBookById(id));
            }
        },[book, id]);

    if (!book) {
        return <Preloader>wait</Preloader>;
    }

    return (
        <Form>
            <a href={book.saleInfo.buyLink}>
                <Img src={book.volumeInfo.imageLinks.thumbnail}/>
            </a>
            <div>
                <Categories>{book.volumeInfo.categories}</Categories>
                <a href={book.saleInfo.buyLink}>
                    <Title>{book.volumeInfo.title}</Title>
                </a>
                <Authors>{book.volumeInfo.authors}</Authors>
            </div>
            <Link to={`/`}>X</Link>
        </Form>
    );
}

const Form = styled.div`
    justify-content: space-around;
    width: 60%;
    height: 500px;
    margin-top: 20px;
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.3);
    display: flex;
    flex-direction: row;
    align-items: start;
    padding-top: 100px;
`
const Img = styled.img`
    margin: 15px;
`
const Title = styled.div`
    font-weight: bold;
    width: 60%;
    margin-top: 10px;
    margin-bottom: 15px;
    font-size: 22px;
`
const Authors = styled.div`
    color: grey;
    font-size: 18px;
`
const Categories = styled.div`
    text-decoration: underline;
`
const Preloader = styled.div`
    font-size: 25px;
    margin-top: 150px;
`