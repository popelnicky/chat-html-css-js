import { ChatView } from "./views/ChatView.js";

const chatView = new ChatView(null);
const assistantSaying = async () => {
  await chatView.assistantSaying("Hi");
  await chatView.assistantSaying("I'm your assistant");
  await chatView.assistantSaying("Nice to meet you!");
  await chatView.assistantSaying('I want to play with you in the "Guess a number" game');
  await chatView.assistantSaying("I'll pick a number (from 1 to 100) randomly");
  await chatView.assistantSaying("You should guess it");
  await chatView.assistantSaying("Ready?");
  await chatView.assistantSaying("Go!");

  chatView.initListeners();
};

assistantSaying();
