import styled from 'styled-components'
import { useParams } from 'react-router-dom';

export default function CurrentBook() {
    let { id } = useParams();
    console.log(id)
    return (
        <Form>
            ppp
        </Form>
    );
}

const Form = styled.form`
    margin-right: 15px;
    text-align: center;
`
