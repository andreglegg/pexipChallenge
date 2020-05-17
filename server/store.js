const isMessage = require('./validation/isMessage');

class Store {
    constructor() {
        this.state = {
            messages: []
        }
    }

    addNewMessage = (message) => {
        const newMessage = {
            ...message
        }
        isMessage.assert(newMessage);
        this.state.messages = [...this.state.messages, newMessage]
    }
}

module.exports = Store;
