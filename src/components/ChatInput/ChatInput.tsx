import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {Button, Form, FormGroup, Input, InputGroup} from 'reactstrap';
import {BaseEmoji, Emoji, Picker} from 'emoji-mart';
import {useDispatch, useSelector} from "react-redux";
import onChangeChatInput from "../../store/actionCreators/onChangeChatInput";
import {State} from "../../types/State";

const ChatInput = () => {
    const [selection, setSelection] = useState({start: 0, end: 0});
    const [openEmoji, setOpenEmoji] = useState(false);
    const ws = useSelector((state: State) => state.ws);
    const chatInput = useSelector((state: State) => state.chatInput);
    const currentUser = useSelector((state: State) => state.currentUser);
    const dispatch = useDispatch();

    const changeChatInput = (input: string) => dispatch(onChangeChatInput(input));
    const toggleEmojiPicker = () => setOpenEmoji(!openEmoji);

    const onSelectEmoji = (selectedEmoji: BaseEmoji) => {
        const msgWithEmoji = chatInput.slice(0,selection.start)+selectedEmoji.native+chatInput.slice(selection.end);
        dispatch(onChangeChatInput(msgWithEmoji))
        toggleEmojiPicker();
    };

    const handleOnSelect = (event: any) => {
        setSelection({
            start: event.target.selectionStart,
            end: event.target.selectionEnd
        });
    }

    const handleOnSubmit = (event: { preventDefault: () => void; }) => {
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
        <Form onSubmit={(event) => handleOnSubmit(event)}>
            <FormGroup className='m-0'>
                <InputGroup size="lg">
                    <Input
                        type="text"
                        name="chatInput"
                        placeholder="Message"
                        value={chatInput}
                        onSelect={handleOnSelect}
                        onChange={(event) => changeChatInput(event.target.value)}
                    />
                    <Button
                        onClick={toggleEmojiPicker}
                        color="none"
                        className={"emoji-button"}
                    >
                        <Emoji emoji=':smile::skin-tone-3:' size={28} />
                    </Button>
                    {openEmoji ? <Picker onSelect={onSelectEmoji} title='Select an emoji' emoji='point_up' style={{ position: 'absolute', bottom: '20px', right: '20px' }} /> : null}
                </InputGroup>
            </FormGroup>
        </Form>
    )
}

export default ChatInput;
