
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const exists = require('vet/exists');
const { addMessage, editMessage, addUser, deleteMessage, initialData } = require('./enums');
const isMessages = require('./validation/isMessages');
let Store = require('./store');

Store = new Store();

const wss = new WebSocket.Server({port: 4000});

const date = Date.now();

const meetingBotMsg = (msg) => {
    return{
        'id': uuidv4(),
        'userId': '100',
        'message': msg,
        'createdAt': date,
        'updatedAt': date,
        'isDeleted': false,
    }}

console.log('websocket server started...')
wss.on('connection', function connection(ws) {
    console.log('connected');
    ws.on('message', function incoming(data) {
        const parsedData = JSON.parse(data);
        switch (parsedData.type) {
            case addMessage: {
                Store.addNewMessage(parsedData.payload);
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({type: addMessage, ...Store.state}));
                    }
                });
                break;
            }
            case editMessage: {
                Store.editMessage(parsedData.payload);
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({type: editMessage, ...Store.state}));
                    }
                });
                break;
            }
            case addUser: {
                const newUser = {
                    id: parsedData.payload.id || uuidv4(),
                    name: parsedData.payload.name,
                    isDeleted: false,
                }
                ws.user = Object.assign({}, newUser);
                Store.addUser(newUser);
                Store.addNewMessage(meetingBotMsg(`${newUser.name} joined.`));
                wss.clients.forEach(function each(client) {
                    // send currentUser to the correct user
                    if (client === ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({type: addUser, ...Store.state, currentUser: newUser}));
                    } else {
                        client.send(JSON.stringify(Store.state));
                    }
                });
                break;
            }
            case deleteMessage: {
                Store.deleteMessage(parsedData.payload.id);
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({type: deleteMessage, ...Store.state}));
                    }
                });
                break;
            }
            default: {
                break;
            }
        }

    });

    ws.on('close', function close(){
        if (exists(ws.user)){
            console.log('use left');
            Store.addNewMessage(meetingBotMsg(`${ws.user.name} left.`));
            Store.deleteUser(ws.user.id);

            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify({type: initialData, ...Store.state}));
            });
        }

    });

    ws.send(JSON.stringify({type: initialData, ...Store.state}));
});
