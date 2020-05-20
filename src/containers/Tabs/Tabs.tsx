import React, {useEffect, useRef} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Col } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import classnames from 'classnames';

import onChangeTab from "../../../src/store/actionCreators/onChangeTab";
import onSynchronizeStates from "../../store/actionCreators/onSynchronizeStates";
import ChatInput from "../../components/ChatInput/ChatInput";
import UserInput from "../../components/UserInput/UserInput";
import hasCurrentUser from "../../utils/hasCurrentUser";
import MessageItem from "../../components/MessageItem/MessageItem";

import styles from './Tabs.module.scss';
import Participants from "../../components/Participants/Participants";
import {State} from "../../types/State";
import {Message} from "../../types/Message";

const Tabs = () => {
    const { ws, activeTab, currentUser, users, messages } = useSelector((state: State) => state);
    const dispatch = useDispatch();

    const changeTab = (activeTab: '1' | '2') => dispatch(onChangeTab(activeTab));
    const synchronizeStates = (data: State) => dispatch(onSynchronizeStates(data));

    const toggle = (tab: '1' | '2') => {
        if(activeTab !== tab) changeTab(tab);
    }

    useEffect(() => {
        ws.onopen = () => {
            console.log("connected");
        };
        ws.onmessage = (event: any) => {
            const data = JSON.parse(event.data);
            synchronizeStates(data);
        };
        if(activeTab === '2') scrollToBottom();
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        if (null !== messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"})
        }
    };
    useEffect(scrollToBottom, [messages]);

    const ChatInputContainerStyle = classnames(styles.ChatInputContainer, 'pt-2', 'pl-3','pr-3','pb-3',);
    const HeaderTextStyle = classnames(styles.HeaderText, "text-center", "p-3");

    const renderMessages = messages.map((msg: Message, index: any) => {
        const name = users.filter((usr: any) => usr.id === msg.userId)[0];
        return(
            <MessageItem key={index} user={name} message={msg} />
        )
    })
    const renderChatInput = (activeTab === '2') ? (<div className={ChatInputContainerStyle}>
        { !hasCurrentUser(currentUser) ? <UserInput /> : <ChatInput />}
    </div>) : null;

    const countActiveUsers = users.filter((usr: any) => !usr.isDeleted && usr.id !== '100').length;

    return (
        <div className={styles.TabsContainer}>
            <div className={styles.TabsHeader}>
                <Col sm="12" className={HeaderTextStyle}>
                    Status Meeting Standup
                </Col>
                <Nav tabs className={styles.TabNav}>
                    <NavItem className={styles.TabNavItem}>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => {
                                toggle('1');
                            }}
                        >
                            Participants ({countActiveUsers})
                        </NavLink>
                    </NavItem>
                    <NavItem className={styles.TabNavItem}>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Chat
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
            <TabContent activeTab={activeTab} className={styles.TabContent}>
                <TabPane tabId="1">
                    <Participants />
                </TabPane>
                <TabPane tabId="2">
                    <div className='pl-3 pr-3'>
                        {renderMessages}
                        <div ref={messagesEndRef} />
                    </div>
                </TabPane>
            </TabContent>
            {renderChatInput}
        </div>
    );
}

export default Tabs;
