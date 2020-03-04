const switchOnChatScreen = () => {
    document.querySelector('#username-page').classList.add('hidden')
    document.querySelector("#chat-page").classList.remove("hidden")
    document.querySelector(".connecting").style.display = "none"
}