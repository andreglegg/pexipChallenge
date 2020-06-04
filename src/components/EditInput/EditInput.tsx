import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, InputGroup} from 'reactstrap';
import {useDispatch, useSelector} from "react-redux";
import onChangeEditInput from "../../store/actionCreators/onChangeEditMessage";
import {State} from "../../types/State";
import {BaseEmoji, Emoji, Picker} from 'emoji-mart';

const EditInput = () => {
    const [selection, setSelection] = useState({start: 0, end: 0});
    const [openEmoji, setOpenEmoji] = useState(false);
    const ws = useSelector((state: State) => state.ws);
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

    const handleOnSelect = (event: any) => {
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
            type: 'editMessage',
            payload: message
        }
        ws.send(JSON.stringify(data));
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
                        onSelect={handleOnSelect}
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
