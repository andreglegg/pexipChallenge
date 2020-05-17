const WebSocket = require("ws");
const isMessages = require('./validation/isMessages');

let Store = require('./store');

Store = new Store();

const wss = new WebSocket.Server({port: 4000});

const date = new Date(Date.now()).toDateString();

const messages = [
    {
        id: '1',
        userId: '100',
        message: 'hello pexip!',
        createdAt: date,
        updatedAt: date,
    },
    {
        id: '2',
        userId: '101',
        message: 'Hi!',
        createdAt: date,
        updatedAt: date,
    },
    {
        id: '3',
        userId: '100',
        message: 'hows it going?!',
        createdAt: date,
        updatedAt: date,
    },
]

wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(data) {
        const parsedData = JSON.parse(data);
        Store.addNewMessage(parsedData);

        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(Store.state.messages));
            }
        });

    });


    messages.map((msg) => Store.addNewMessage(msg))

    ws.send(JSON.stringify(Store.state.messages));
});
