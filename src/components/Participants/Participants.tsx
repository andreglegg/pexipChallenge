import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {useSelector} from "react-redux";
import {State} from "../../types/State";
import {User} from "../../types/User";

const Participants = () => {
    const users = useSelector((state: State) => state.users);

    const renderActiveUsers = users.filter((usr: User) => !usr.isDeleted && usr.id !== '100')
        .map((usr: User, index: number) =>
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
