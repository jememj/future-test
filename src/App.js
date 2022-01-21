import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import CurrentBook from './components/CurrentBook';
import ResultList from './components/ResultList';
import Search from "./components/Search";

export default function App() {
    return (
    <Container>
      <Switch>
        <Route path="/" exact>
          <Title>search for books</Title>
          <Search/>
          <ResultList/>
        </Route>
        <Route path="/:id">
          <CurrentBook/>
        </Route>
      </Switch>
      <ToastContainer/>
    </Container>
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
