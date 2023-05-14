import { MessageType } from "../constants/MessageType.js";

export class ChatView {
  constructor(controller) {
    this.controller = controller;

    this.$chatBox = document.querySelector(".chat-box");
    this.$messages = document.querySelector(".chat-box .messages");
    this.$inputMessage = document.querySelector(".bottom-panel input");
    this.$sendButton = document.querySelector(".bottom-panel button");

    this.$typingMessage = null;
  }

  assistantSaying(message) {
    return new Promise((resolve) => {
      this.typingMessage();

      const delay = message.length > 15 ? 75 : 150;

      setTimeout(() => {
        const $message = this.createMessageView(MessageType.INCOMING, message);

        this.$messages.append($message);

        this.typingMessage();
        this.scroll();

        resolve();
      }, message.length * delay);
    });
  }

  createMessageView(type, message) {
    const $message = document.createElement("div");

    $message.classList.add("message");
    $message.innerHTML = `<div class="capsule ${type}">
                            <span>${message}</span>
                         </div>`;

    return $message;
  }

  humanSaid(message) {
    const $message = this.createMessageView(MessageType.OUTGOING, message);

    this.$messages.append($message);

    this.scroll();
  }

  scroll() {
    this.$chatBox.scroll(0, this.$messages.clientHeight);
  }

  typingMessage() {
    if (this.$typingMessage) {
      this.$messages.removeChild(this.$typingMessage);
      this.$typingMessage = null;

      this.scroll();

      return;
    }

    this.$typingMessage = document.createElement("div");
    this.$typingMessage.classList.add("message");
    this.$typingMessage.innerHTML = `<div class="typing">
                                        <div class="point first"></div>
                                        <div class="point second"></div>
                                        <div class="point third"></div>
                                    </div>`;

    this.$messages.append(this.$typingMessage);

    this.scroll();
  }

  initListeners() {
    this.$inputMessage.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        this.humanSaid(this.$inputMessage.value);

        this.$inputMessage.value = "";
      }
    });

    this.$sendButton.addEventListener("click", () => {
      this.humanSaid(this.$inputMessage.value);

      this.$inputMessage.value = "";
    });
  }
}
