import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setStartIndex, setCurrentBook } from '../redux/bookSlice';

const selectBooks = state => state.bookSlice.books;
const selectStartIndex = state => state.bookSlice.startIndex;
const selectTotalBooks = state => state.bookSlice.totalBooks;
const selectStatus = state => state.bookSlice.status;

export default function ResultList() {
    const dispatch = useDispatch();
    const books = useSelector(selectBooks);
    const startIndex = useSelector(selectStartIndex);
    const totalBooks = useSelector(selectTotalBooks);
    const status = useSelector(selectStatus);

    const loadMore = (e) => {
        e.preventDefault();
        dispatch(setStartIndex(startIndex + 30));
        dispatch(fetchBooks());
    }

    if (!status) {
        return <Preloader>wait</Preloader>;
    }
    if(!books?.length) {
        return <p>нет книжек</p>;
    }
    
    return (
        <>
        <p>found {totalBooks} items</p>
        <List>
            {books.map(book=>(
            <Item key={book.id}>
                <Link to={`/${book.id}`} onClick={()=>{dispatch(setCurrentBook(book))}}>
                    {book.volumeInfo?.imageLinks?.thumbnail ? <Img src={book.volumeInfo.imageLinks.thumbnail}/> : 'нет картинки'}
                    <Info>
                        <Categories>{book.volumeInfo.categories}</Categories>
                        <Title>{book.volumeInfo.title}</Title>
                        <Authors>{book.volumeInfo.authors}</Authors>
                    </Info>
                </Link>
            </Item>
            ))}
        </List>
        <button onClick={loadMore}>еще</button>
        </>
    )
}

const List = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    align-content: center;
`
const Item = styled.div`
    margin: 20px;
    padding: 5px;
    box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.3);
    width: 300px;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Img = styled.img`
    margin-bottom: 5px;
`
const Info = styled.div`
    align-items: start;
    width: 80%;
    text-decoration: none;
`
const Title = styled.div`
    font-weight: bold;
`
const Authors = styled.div`
    color: grey;
`
const Categories = styled.div`
    text-decoration: underline;
`
const Preloader = styled.div`
    font-size: 25px;
    margin-top: 250px;
`