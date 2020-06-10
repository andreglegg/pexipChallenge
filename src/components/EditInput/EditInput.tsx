import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, InputGroup, InputProps} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import onChangeEditInput from "../../store/actionCreators/onChangeEditMessage";
import {State} from "../../types/State";
import {BaseEmoji, Emoji, Picker} from 'emoji-mart';
import {DataType} from '../../enums';
import {WsProps} from '../../types/WsProps';

const EditInput = (props: WsProps) => {
    const { send } = props;
    const [selection, setSelection] = useState({start: 0, end: 0});
    const [openEmoji, setOpenEmoji] = useState(false);
    const editMessage = useSelector((state: State) => state.editMessage);
    const dispatch = useDispatch();

    const changeEditMessage = (message: string) => dispatch(onChangeEditInput(
        {
            ...editMessage,
            message: message,
        }
    ));
    const toggleEmojiPicker = () => setOpenEmoji(!openEmoji);

    const onSelectEmoji = (selectedEmoji: BaseEmoji) => {
        const msgWithEmoji = editMessage.message.slice(0,selection.start)+selectedEmoji.native+editMessage.message.slice(selection.end);
        changeEditMessage(msgWithEmoji)
        toggleEmojiPicker();
    };

    const handleOnSelect = (event: InputProps | React.SyntheticEvent<HTMLInputElement>) => {
        setSelection({
            start: event.target.selectionStart,
            end: event.target.selectionEnd
        });
    }

    const emptyEditMessage = () => dispatch(onChangeEditInput(''));

    const handleOnSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const message = {
            ...editMessage,
        }
        const data = {
            type: DataType.editMessage,
            payload: message
        }
        send(JSON.stringify(data));
        emptyEditMessage();
    }

    return(
        <Form onSubmit={(event) => handleOnSubmit(event)}>
            <FormGroup className='m-0'>
                <InputGroup>
                    <Input
                        type="text"
                        name="editInput"
                        placeholder="Message"
                        value={editMessage.message}
                        onSelect={(event) => handleOnSelect(event)}
                        onChange={(event) => changeEditMessage(event.target.value)}
                    />
                    <Button
                        onClick={toggleEmojiPicker}
                        color="none"
                        className={"emoji-button"}
                    >
                        <Emoji emoji=':smile::skin-tone-3:' size={16} />
                    </Button>
                    {openEmoji ? <Picker onSelect={onSelectEmoji} title='Select an emoji' emoji='point_up' style={{ position: 'absolute', bottom: '20px', right: '20px' }} /> : null}
                </InputGroup>
            </FormGroup>
        </Form>
    )
}

export default EditInput;
