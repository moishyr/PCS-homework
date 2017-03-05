/* global $, io */
(function () {
    'use strict';

    const socket = io(), // io.connect('localhost:80')
        loginForm = $('#loginForm'),
        nameInput = $('#nameInput'),
        messagesPage = $('#messagesPage'),
        messagesDiv = $('#messages');

    let userName = '';

    socket.on('message', msg => {
        if (typeof msg === 'object') {
            messagesDiv.append('<span><strong>' + msg.name + '</strong>: ' + msg.msg + '</span><br/>');
        } else if (typeof msg === 'string') {
            messagesDiv.append('<span>' + msg + '</span><br/>');
        }
    });

    socket.on('disconnect', msg => {
        console.log('in the js disconnect message event');
        messagesDiv.append('<span>hello ' + msg + '</span><br/>');
        socket.emit('disconnect', userName + ' disconnected from the chat');
    });

    const messageInput = $('#message');
    $('#messageForm').submit(e => {
        e.preventDefault();
        socket.emit('message', {
            user: userName,
            msg: messageInput.val()
        });
        messageInput.val('');
    });


    loginForm.submit(e => {
        e.preventDefault();
        userName = nameInput.val();
        socket.emit('user', userName);
        nameInput.val('');
        loginForm.hide();
        messagesPage.show();
    });
}());