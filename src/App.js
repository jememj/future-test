import styled from 'styled-components';
import ResultList from './components/ResultList';
import Search from "./components/Search";

export default function App() {
  return (
    <>
    <Container>
      <Title>search for books</Title>
      <Search/>
      <ResultList />
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
