import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {Form, FormGroup, Input, InputGroup} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import onChangeChatInput from "../../store/actionCreators/onChangeChatInput";
import {State} from "../../types/State";

const ChatInput = () => {
    const { ws, chatInput, currentUser } = useSelector((state: State) => state);
    const dispatch = useDispatch();

    const changeChatInput = (input: string) => dispatch(onChangeChatInput(input));

    const onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const message = {
            id: uuidv4(),
            userId: currentUser.id,
            message: chatInput,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
        const data = {
            type: 'addMessage',
            payload: message
        }
        ws.send(JSON.stringify(data));
        changeChatInput('');
    }

    return(
        <Form onSubmit={(event) => onSubmit(event)}>
            <FormGroup className='m-0'>
                <InputGroup size="lg">
                    <Input type="text" name="chatInput" placeholder="Message" value={chatInput} onChange={(event) => changeChatInput(event.target.value)}/>
                </InputGroup>
            </FormGroup>
        </Form>
    )
}

export default ChatInput;
