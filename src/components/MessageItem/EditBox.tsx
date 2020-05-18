import React from 'react';
import {Button, ButtonGroup} from "reactstrap";
import styles from './MessageItem.module.scss'

interface EditBoxProps {
    id: string;
    userId: string;
    message: string;
    createdAt: string;
    updatedAt: string;
    style: object;
}

const EditBox = (props: EditBoxProps) => {
    const { id } = props;
    return(
        <ButtonGroup size="sm" className={styles.EditBox}>
            <Button>Edit</Button>
            <Button color="danger">Delete</Button>
        </ButtonGroup>
    )
}

export default EditBox;
