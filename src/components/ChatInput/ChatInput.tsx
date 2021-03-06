import React, {ChangeEvent, useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {Button, Form, FormGroup, Input, InputGroup, InputProps} from 'reactstrap';
import {BaseEmoji, Emoji, Picker} from 'emoji-mart';
import {useDispatch, useSelector} from "react-redux";
import onChangeChatInput from "../../store/actionCreators/onChangeChatInput";
import {State} from "../../types/State";
import {DataType} from '../../enums';
import {WsProps} from '../../types/WsProps';

const ChatInput = (props: WsProps) => {
    const { send } = props;
    const [selection, setSelection] = useState({start: 0, end: 0});
    const [openEmoji, setOpenEmoji] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
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

    const handleOnSelect = (event: InputProps | React.SyntheticEvent<HTMLInputElement>) => {
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
            type: DataType.addMessage,
            payload: message
        }
        send(JSON.stringify(data));
        changeChatInput('');
    }

    const handleOnFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        const reader = new FileReader();
        reader.onload = function(event) {
            setSelectedFile(event.target?.result);
        };

        // @ts-ignore
        reader.readAsDataURL(file);


    }

    const handleSendFile = () => {
        const message = {
            id: uuidv4(),
            userId: currentUser.id,
            message: selectedFile,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }

        const data = {
            type: DataType.addMessage,
            payload: message
        }
        send(JSON.stringify(data));
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
                        onSelect={(event) => handleOnSelect(event)}
                        onChange={(event) => changeChatInput(event.target.value)}
                    />
                    <Input type="file" name="file" onChange={(event) => handleOnFileChange(event)} />
                    <Button onClick={handleSendFile}>
                        send file
                    </Button>
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
