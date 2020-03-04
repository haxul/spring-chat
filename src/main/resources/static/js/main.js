let username = null
let stompClient = null

const createConnection = (e) => {
    e.preventDefault()
    username = document.querySelector('#name').value.trim();
    if (!username) return
    stompClient = Stomp.over(new SockJS("/ws"))
    stompClient.connect({}, onConnected, () => alert("error with connection"))
};

function onConnected() {
    stompClient.subscribe("/topic/public", onMessageReceived)
    const body = {sender: username, type: 'JOIN'}
    stompClient.send("/app/chat.addUser", {}, JSON.stringify(body))
    switchOnChatScreen()
}

function onMessageReceived(payload) {
    const message = JSON.parse(payload.body)
    console.log(message)
    const ul = document.querySelector("#messageArea")
    const li = document.createElement("li")
    li.innerHTML = message.content
    ul.append(li)
}

function sendMessage(e) {
    e.preventDefault()
    const input = document.querySelector("#message")
    const content = input.value;
    const body = {sender: username, type:"CHAT", content: content}
    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(body))
    input.value = ""
}

document
    .querySelector("#usernameForm")
    .addEventListener('submit',  createConnection)

document
    .querySelector("#messageForm")
    .addEventListener("submit", sendMessage)