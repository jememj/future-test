import styled from 'styled-components'
import { Link, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CurrentBook from './CurrentBook';

export default function ResultList() {
    const books = useSelector((state) => state.bookSlice.books);

    console.log(books);
    if(!books?.length) {
        return <p>нет книжек</p>
    }
    return (
        <>
        <p>found {books.length} items</p>
        <List>
        {books.map(book=>(
            <Item key={book.id}>
                <Link to={`/books/${book.id}`}>
                <Img src={book.volumeInfo.imageLinks.thumbnail}/>
                <Info>
                    <Categories>{book.volumeInfo.categories}</Categories>
                    <Title>{book.volumeInfo.title}</Title>
                    <Authors>{book.volumeInfo.authors}</Authors>
                </Info>
                </Link>
            </Item>
        ))}
        </List>
        {/* <Route 
            path="/books/:id"
            component={CurrentBook}
        /> */}
        </>
    );
}

const List = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    align-content: center;
    text-decoration: none;
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
    text-decoration: underline
`