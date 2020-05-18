import React, {useEffect, useState} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import classnames from 'classnames';

import onChangeTab from "../../../src/store/actionCreators/onChangeTab";
import onSynchronizeStates from "../../store/actionCreators/onSynchronizeStates";
import ChatInput from "../../components/ChatInput/ChatInput";
import UserInput from "../../components/UserInput/UserInput";
import hasCurrentUser from "../../utils/hasCurrentUser";

const Tabs = () => {
    const { ws, activeTab, currentUser, users } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const changeTab = (activeTab: string) => dispatch(onChangeTab(activeTab));
    const synchronizeStates = (data: any) => dispatch(onSynchronizeStates(data));

    const toggle = (tab: string) => {
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
    });

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Participants ({users.length})
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Chat
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <h4>Tab 1 Contents</h4>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            { !hasCurrentUser(currentUser) ? <UserInput /> : <ChatInput />}
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    );
}

export default Tabs;
