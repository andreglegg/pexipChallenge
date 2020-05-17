const WebSocket = require("ws");
const isMessages = require('./validation/isMessages');

let Store = require('./store');

Store = new Store();

const wss = new WebSocket.Server({port: 4000});

const date = new Date(Date.now()).toDateString();

const initialState = {
    messages: [
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
],
    users: [{
        id: '100',
        name: 'Steve'
    },{
        id: '101',
        name: "Ian"
    }
    ]
}

wss.on('connection', function connection(ws) {

    ws.on('message', function incoming(data) {
        const parsedData = JSON.parse(data);
        switch (parsedData.type) {
            case 'addMessage': {
                Store.addNewMessage(parsedData.payload);
                break;
            }
            case 'addUser': {
                Store.addUser(parsedData.payload);
                break;
            }
            default: {
                break;
            }
        }


        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(Store.state));
            }
        });

    });

    initialState.messages.map((msg) => Store.addNewMessage(msg))
    initialState.users.map((usr) => Store.addUser(usr))

    ws.send(JSON.stringify(Store.state));
});


/*

json data to test with

NEW MESSAGE
{
  "type": "addMessage",
  "payload": {
    "id": "6",
    "userId": "100",
    "message": "testing hello pexip!",
    "createdAt": "Sun May 17 2020",
    "updatedAt": "Sun May 17 2020"
  }
}

ADD USER

{
  "type": "addUser",
  "payload": {
    "name":"Mark"
  }
}


 */
