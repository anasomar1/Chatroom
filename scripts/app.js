//DOM
const chatList = document.querySelector(".chat-list");
const newMsgForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-name");
const updateMsg = document.querySelector(".update-msg");
const rooms = document.querySelector(".chat-rooms");

//Add a new chat
newMsgForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = newMsgForm.message.value.trim();
  chatRoom
    .addChat(message)
    .then(() => newMsgForm.reset())
    .catch((err) => console.log(err));
});

//Set the name
newNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // update name via the chatroom class
  const newName = newNameForm.name.value.trim();
  chatRoom.updateName(newName);
  newNameForm.reset();
  updateMsg.textContent = `Welcome to our chatroom ${newName}`;
  setTimeout(() => {
    updateMsg.textContent = "";
  }, 3000);
});

//Update the chatroom
rooms.addEventListener("click", (e) => {
  switch (e.target.tagName) {
    case "BUTTON":
      chatUI.clear();
      chatRoom.updateRoom(e.target.getAttribute("id"));
      chatRoom.getChats((chat) => chatUI.render(chat));
      break;
  }
});

// Check local storage for a name
const username = localStorage.username
  ? localStorage.username
  : `User${Math.floor(Math.random(1) * 5000)}`;
//class instances
const chatUI = new ChatUI(chatList);

//get chats and render
const chatRoom = new Chatroom("gaming", username);

chatRoom.getChats((data) => chatUI.render(data));
