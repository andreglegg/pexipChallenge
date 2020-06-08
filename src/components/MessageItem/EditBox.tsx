import React from 'react';
import {Button, ButtonGroup} from "reactstrap";
import styles from './MessageItem.module.scss'
import {useDispatch} from "react-redux";
import onChangeEditInput from "../../store/actionCreators/onChangeEditMessage";
import {Message} from "../../types/Message";

interface IProps {
    message: Message;
    send: Function;
}

const EditBox = (props: IProps) => {
    const {send, message} = props;
    const dispatch = useDispatch();
    const changeEditInput = (input: Message) => dispatch(onChangeEditInput(input));

    const onDeleteMessage = () => {

        const messageToDelete = {
            id: message.id,
        }
        const data = {
            type: 'deleteMessage',
            payload: {...messageToDelete}
        }
        send(JSON.stringify(data))
    }

    return(
        <ButtonGroup size="sm" className={styles.EditBox}>
            <Button onClick={() => changeEditInput(message)}>Edit</Button>
            <Button color="danger" onClick={() => onDeleteMessage()}>Delete</Button>
        </ButtonGroup>
    )
}

export default EditBox;
