import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {useSelector} from "react-redux";

const Participants = () => {
    const users = useSelector((state: any) => state.users);

    const renderActiveUsers = users.filter((usr: any) => !usr.isDeleted && usr.id !== '100')
        .map((usr: any, index: number) =>
            <ListGroupItem key={index} className='border-top-0 rounded-0'>
                {usr.name}
            </ListGroupItem>);
    return (
        <ListGroup>
            {renderActiveUsers}
        </ListGroup>
    );

}

export default Participants;
