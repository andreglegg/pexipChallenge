const WebSocket = require("ws");
const { v4: uuidv4 } = require('uuid');

const isMessages = require('./validation/isMessages');
let Store = require('./store');

Store = new Store();

const wss = new WebSocket.Server({port: 4000});

const date = Date.now();

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
    console.log('connected')
    ws.on('message', function incoming(data) {
        const parsedData = JSON.parse(data);
        console.log('parsedData: ', parsedData);
        switch (parsedData.type) {
            case 'addMessage': {
                Store.addNewMessage(parsedData.payload);
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(Store.state));
                    }
                });
                break;
            }
            case 'addUser': {
                const newUser = {
                    id: parsedData.payload.id || uuidv4(),
                    name: parsedData.payload.name,
                }
                Store.addUser(newUser);
                wss.clients.forEach(function each(client) {
                    // send currentUser to the correct user
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(Store.state));
                    } else {
                        client.send(JSON.stringify({...Store.state, currentUser: newUser}));
                    }
                });
                break;
            }
            case 'deleteMessage': {
                Store.deleteMessage(parsedData.payload.id);
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(Store.state));
                    }
                });
                break;
            }
            default: {
                break;
            }
        }


        /*
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(Store.state));
            }
        });
        */

    });

    // initialState.messages.map((msg) => Store.addNewMessage(msg))
    // initialState.users.map((usr) => Store.addUser(usr))

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
