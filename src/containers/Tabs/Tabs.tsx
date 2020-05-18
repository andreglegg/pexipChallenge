import React, {useEffect, useState} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import classnames from 'classnames';

import onChangeTab from "../../../src/store/actionCreators/onChangeTab";
import ChatInput from "../../components/ChatInput/ChatInput";

const Tabs = () => {
    const { ws, activeTab } = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const changeTab = (activeTab: string) => dispatch(onChangeTab(activeTab));

    const toggle = (tab: string) => {
        if(activeTab !== tab) changeTab(tab);
    }

    useEffect(() => {
        ws.onopen = () => {
            console.log("connected");
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
                        Participants (0)
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
                            <ChatInput />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    );
}

export default Tabs;
