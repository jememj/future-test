import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setStartIndex, setCurrentBook } from '../redux/bookSlice';

export default function ResultList() {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.bookSlice.books);
    const startIndex = useSelector((state) => state.bookSlice.startIndex);
    const totalItems = useSelector((state) => state.bookSlice.totalItems);
    const status = useSelector((state) => state.bookSlice.status);

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
        <p>found {totalItems} items</p>
        <List>
            {books.map(book=>(
                <Link to={`/${book.id}`} key={book.id} onClick={()=>{dispatch(setCurrentBook(book))}}>
                    <Item>
                    {book.volumeInfo?.imageLinks?.thumbnail ? <Img src={book.volumeInfo.imageLinks.thumbnail}/> : 'нет картинки'}
                    <Info>
                        <Categories>{book.volumeInfo.categories}</Categories>
                        <Title>{book.volumeInfo.title}</Title>
                        <Authors>{book.volumeInfo.authors}</Authors>
                    </Info>
                    </Item>
                </Link>
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