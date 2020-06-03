import React from 'react';
import {Button, ButtonGroup} from "reactstrap";
import styles from './MessageItem.module.scss'
import {useDispatch, useSelector} from "react-redux";
import onChangeEditInput from "../../store/actionCreators/onChangeEditMessage";
import {State} from "../../types/State";
import {Message} from "../../types/Message";

interface IProps {
    message: Message;
}

const EditBox = (props: IProps) => {
    const ws = useSelector((state: State) => state.ws);
    const dispatch = useDispatch();
    const { message } = props;
    const changeEditInput = (input: Message) => dispatch(onChangeEditInput(input));

    const onDeleteMessage = () => {

        const messageToDelete = {
            id: message.id,
        }
        const data = {
            type: 'deleteMessage',
            payload: {...messageToDelete}
        }
        ws.send(JSON.stringify(data))
    }

    return(
        <ButtonGroup size="sm" className={styles.EditBox}>
            <Button onClick={() => changeEditInput(message)}>Edit</Button>
            <Button color="danger" onClick={() => onDeleteMessage()}>Delete</Button>
        </ButtonGroup>
    )
}

export default EditBox;
