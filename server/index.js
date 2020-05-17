const WebSocket = require("ws");

const wss = new WebSocket.Server({port: 4000});

const date = new Date(Date.now()).toDateString();

const testChatData = [
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
    console.log('connected!!!');
    ws.on('message', function incoming(data) {
        console.log('data: ', data);
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {

                client.send(data);
            }
        });
    });

    ws.send(JSON.stringify(testChatData));
});
