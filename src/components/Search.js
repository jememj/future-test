import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { fetchBooks, setSearchValue, setStatus, setCategorySelected, setSortByValueSelected } from '../redux/bookSlice';

export default function Search() {
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch(setSearchValue(e.target.value));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(fetchBooks());
        dispatch(setStatus(false));
    }
    const handleChangeSortingBySelected = (e) => {
        dispatch(setSortByValueSelected(e.target.value));
        handleSubmit(e);
    }
    const handleChangeCategorySelected = (e) => {
        dispatch(setCategorySelected(e.target.value));
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
