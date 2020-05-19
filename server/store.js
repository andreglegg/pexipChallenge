const isMessage = require('./validation/isMessage');

class Store {
    constructor() {
        this.state = {
            messages: [],
            users: [{
                id:'100',
                name: 'Meetingbot'
            }]
        }
    }

    addNewMessage = (message) => {
        const newMessage = {
            ...message
        }
        isMessage.assert(newMessage);
        this.state.messages = [...this.state.messages, newMessage]
    }

    editMessage = (message) => {
        const editedMessage = {
            ...message,
            updatedAt: Date.now(),
        }
        isMessage.assert(editedMessage);

        this.state.messages = this.state.messages.map(msg =>
            msg.id === editedMessage.id ? editedMessage : msg
        );
    }

    deleteMessage = (messageId) => {
        const toBeDeleted = this.state.messages.filter((message) => message.id === messageId).slice()[0];
        toBeDeleted.message = 'DELETED';
        toBeDeleted.updatedAt = Date.now();

        isMessage.assert(toBeDeleted);

        this.state.messages = this.state.messages.map(msg =>
            msg.id === toBeDeleted.id ? toBeDeleted : msg
        );
    }

    addUser = (user) => {
        // isMessage.assert(newUser);
        this.state.users = [...this.state.users, user]
    }
}

module.exports = Store;
