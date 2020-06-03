import React from 'react';
import {Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import onChangeUsernameInput from '../../store/actionCreators/onChangeUsernameInput';
import {User} from '../../types/User';
import {State} from "../../types/State";

const UserInput = () => {
    const ws = useSelector((state: State) => state.ws);
    const usernameInput = useSelector((state: State) => state.usernameInput);
    const dispatch = useDispatch();

    const changeUsernameInput = (input: User | string) => dispatch(onChangeUsernameInput(input));

    const onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const user = {
            name: usernameInput,
        }
        const data = {
            type: 'addUser',
            payload: user
        }
        ws.send(JSON.stringify(data));
        changeUsernameInput('');
    }

    return(
        <Form onSubmit={(event) => onSubmit(event)}>
            <FormGroup className='m-0'>
                <InputGroup size="lg">
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                <Input type="text" name="usernameInput" placeholder="Enter username" value={usernameInput} onChange={(event) => changeUsernameInput(event.target.value)}/>
                </InputGroup>
            </FormGroup>
        </Form>
    )
}

export default UserInput;
