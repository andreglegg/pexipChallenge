const isMessage = require('./validation/isMessage');
const { v4: uuidv4 } = require('uuid');

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
        const newUser = {
            id: user.id || uuidv4(),
            name: user.name,
        }
        // isMessage.assert(newUser);
        this.state.users = [...this.state.users, newUser]
    }
}

module.exports = Store;
