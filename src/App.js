import styled from 'styled-components';
import { useSelector } from 'react-redux';

import ResultList from './components/ResultList';
import Search from "./components/Search";

export default function App() {
  const status = useSelector((state) => state.bookSlice.status);
  
  return (
    <>
    <Container>
      <Title>search for books</Title>
      <Search/>
      {status === false ? <b>wait</b> : <ResultList />}
    </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.h1`
  background-color: #eeeaea;
  padding: 5px;
`
