const isMessage = require('./validation/isMessage');

class Store {
    constructor() {
        this.state = {
            messages: [],
            users: []
        }
    }

    addNewMessage = (message) => {
        const newMessage = {
            ...message
        }
        isMessage.assert(newMessage);
        this.state.messages = [...this.state.messages, newMessage]
    }

    deleteMessage = (messageId) => {
        const toBeDeleted = this.state.messages.filter((message) => message.id === messageId)[0];
        toBeDeleted.message = 'DELETED';
        toBeDeleted.updatedAt = Date.now();
        // this.state.users = [...this.state.messages, ...toBeDeleted];
    }

    addUser = (user) => {
        // isMessage.assert(newUser);
        this.state.users = [...this.state.users, user]
    }
}

module.exports = Store;
