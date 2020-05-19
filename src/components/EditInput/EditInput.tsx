import React from 'react';
import {Form, FormGroup, Input, InputGroup} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import onChangeEditInput from "../../store/actionCreators/onChangeEditMessage";

const EditInput = () => {
    const { ws, editMessage } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const changeEditMessage = (message: any) => dispatch(onChangeEditInput(
        {
            ...editMessage,
            message: message,
        }
    ));

    const emptyEditMessage = () => dispatch(onChangeEditInput(''));

    const onSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const message = {
            ...editMessage,
        }
        const data = {
            type: 'editMessage',
            payload: message
        }
        ws.send(JSON.stringify(data));
        emptyEditMessage();
    }

    return(
        <Form onSubmit={(event) => onSubmit(event)}>
            <FormGroup className='m-0'>
                <InputGroup>
                    <Input type="text" name="editInput" placeholder="Message" value={editMessage.message} onChange={(event) => changeEditMessage(event.target.value)}/>
                </InputGroup>
            </FormGroup>
        </Form>
    )
}

export default EditInput;
