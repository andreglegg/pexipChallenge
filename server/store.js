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

    addUser = (user) => {
        // isMessage.assert(newUser);
        this.state.users = [...this.state.users, user]
    }
}

module.exports = Store;
