import React, {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Col, Form, FormGroup, Input } from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import onChangeChatInput from "../../store/actionCreators/onChangeChatInput";

const ChatInput = () => {
    const { ws, chatInput, currentUser } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const changeChatInput = (input: string) => dispatch(onChangeChatInput(input));

    const onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const message = {
            id: uuidv4(),
            userId: currentUser.id,
            message: chatInput,
            createdAt: new Date(Date.now()).toLocaleTimeString(),
            updatedAt: new Date(Date.now()).toLocaleTimeString(),
        }
        const data = {
            type: 'addMessage',
            payload: message
        }
        ws.send(JSON.stringify(data));
        changeChatInput('');
        //TODO: update state with chat messages
    }

    return(
        <Form onSubmit={(event) => onSubmit(event)}>
            <FormGroup>
                <Input type="text" name="chatInput" placeholder="Message" value={chatInput} onChange={(event) => changeChatInput(event.target.value)}/>
            </FormGroup>
        </Form>
    )
}

export default ChatInput;
