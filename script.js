// Get the input field and button
var inputField = document.getElementById("user-input");
var sendButton = document.querySelector("button");

// Add event listener to input field
inputField.addEventListener("keypress", function(event) {
  // Check if the pressed key is Enter (key code 13)
  if (event.key === "Enter") {
    // Trigger the click event of the button
    sendButton.click();
  }
});


function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    var chatBox = document.getElementById("chat-box");
    var messageDiv = document.createElement("div");
    messageDiv.className = "user-message";
    messageDiv.innerHTML = "<img src='question.png' class='chatbot-photo'>" + userInput;
    chatBox.appendChild(messageDiv);
    document.getElementById("user-input").value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // Show loading indicator
    var loadingDiv = document.createElement("div");
    loadingDiv.className = "loading";
    for (var i = 0; i < 3; i++) {
        var dot = document.createElement("span");
        dot.className = "dot";
        loadingDiv.appendChild(dot);
  }
  chatBox.appendChild(loadingDiv);

    chatBox.appendChild(loadingDiv);
    // Make request to the server and get response
    var url = "https://d3fd-2405-201-d018-a022-c01c-73e4-cb88-62e2.ngrok-free.app/query?query=" + userInput;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        // Remove loading indicator
        chatBox.removeChild(loadingDiv);
        if (xhr.status == 200) {
            console.log(xhr.responseText)
            var response = xhr.responseText;
            var botMessageDiv = document.createElement("div");
            botMessageDiv.className = "chat-bot-message";
            botMessageDiv.innerHTML = "<img src='chatbot.png' class='chatbot-photo'>" + response;
            chatBox.appendChild(botMessageDiv);
        }
        else if (xhr.status == 500) {
            // Handle 500 response
            var errorDiv = document.createElement("div");
            errorDiv.className = "error";
            errorDiv.textContent = "An error occurred. Please try again.";
            var tryAgainButton = document.createElement("button");
            tryAgainButton.textContent = "Try Again";
            tryAgainButton.onclick = function() {
              // Retry sending the message
              chatBox.removeChild(errorDiv);
              sendMessage();
            };
            errorDiv.appendChild(tryAgainButton);
            chatBox.appendChild(errorDiv);
          } else {
            // Handle other errors if necessary
            console.error("Error:", xhr.statusText);
          }
      }
      chatBox.scrollTop = chatBox.scrollHeight;
    };
    xhr.send();
  }
  