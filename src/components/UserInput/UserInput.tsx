import React, {useEffect} from 'react';
import {Col, Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import {useDispatch, useSelector} from 'react-redux';
import onChangeUsernameInput from '../../store/actionCreators/onChangeUsernameInput';
import {User} from '../../types/User';

const UserInput = () => {
    const { ws, usernameInput } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const changeUsernameInput = (input: User) => dispatch(onChangeUsernameInput(input));

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
