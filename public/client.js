const socket = io(); //wrritng this sentence will connect the socket
let user_name;
let messageInp = document.querySelector("#messageInp");
let messageArea = document.querySelector(".container");
do {
  user_name = prompt("Enter your name ");
} while (!user_name);

messageInp.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});
function sendMessage(message) {
  let msg = {
    user: user_name,
    message: message.trim(),
  };
  //append the message in dom
  appendMessage(msg, "right"); //outgoing
  messageInp.value = ``;
  scrollToBottom();
  //send to server
  socket.emit("message", msg);
}
function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = ` <h4>${msg.user}</h4>
   <p>${msg.message}</p>`;

  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

//Recieve messages
//you will recieve this on browser
//if you recieve message from someone

socket.on("message", (msg) => {
  console.log(msg);
  appendMessage(msg, "left"); //incoming message
  scrollToBottom();
});

//function scroll to bottom
function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
