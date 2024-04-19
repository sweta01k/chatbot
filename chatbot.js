// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBRso8ud_R5JkX3Vzc52F5arvPE0MriId4",
    authDomain: "chatboot-8229b.firebaseapp.com",
    databaseURL: "https://chatboot-8229b-default-rtdb.firebaseio.com",
    projectId: "chatboot-8229b",
    storageBucket: "chatboot-8229b.appspot.com",
    messagingSenderId: "1032905136724",
    appId: "1:1032905136724:web:f63a44c2a3644d757b6bc1",
    measurementId: "G-NW1MK8RJ4X"
};
firebase.initializeApp(firebaseConfig);

const chatMessages = document.getElementById('chat_msg');

window.sendMessage = function() {
    const userInput = document.getElementById('user').value.trim();
    if (userInput !== '') {
        firebase.database().ref('messages').push({
            sender: 'user',
            message: userInput,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
        document.getElementById('user').value = '';
    }
}

function displayArr(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerText = message;
    if (sender === 'user') {
        messageElement.classList.add('user_msg');
    } else {
        messageElement.classList.add('bot_msg');
    }
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
}

firebase.database().ref('messages').orderByChild('timestamp').on('child_added', function (snapshot) {
    const messageData = snapshot.val();
    displayArr(messageData.sender, messageData.message);
});

firebase.database().ref('messages').on('child_added', function (snapshot) {
    const messageData = snapshot.val();
    if (messageData.sender !== 'user') {
        displayArr(messageData.sender, messageData.message);
    }
});