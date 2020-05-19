const isMessage = require('./validation/isMessage');

class Store {
    constructor() {
        this.state = {
            messages: [],
            users: [{
                id:'100',
                name: 'Meetingbot',
                isDeleted: false,
            }]
        }
    }

    addNewMessage = (message) => {
        console.log('message: ', message);
        const newMessage = {
            ...message,
            isDeleted: false,
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
        toBeDeleted.isDeleted = true;
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

    deleteUser = (userId) => {
        const toBeDeleted = this.state.users.filter((usr) => usr.id === userId).slice()[0];
        toBeDeleted.isDeleted = true;

        this.state.users = this.state.users.map(usr =>
            usr.id === toBeDeleted.id ? toBeDeleted : usr
        );
    }
}

module.exports = Store;
