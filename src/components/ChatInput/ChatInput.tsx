import React, {useEffect} from 'react';
import { Col, Form, FormGroup, Input } from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import onChangeChatInput from "../../store/actionCreators/onChangeChatInput";

const ChatInput = () => {
    const { ws, chatInput } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const changeChatInput = (input: string) => dispatch(onChangeChatInput(input));

    const onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const message = {
            id: '8',
            userId: '100',
            message: chatInput,
            createdAt: new Date(Date.now()).toDateString(),
            updatedAt: new Date(Date.now()).toDateString(),
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
                <Input type="text" name="chatInput" value={chatInput} onChange={(event) => changeChatInput(event.target.value)}/>
            </FormGroup>
        </Form>
    )
}

export default ChatInput;
