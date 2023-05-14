import { Utils } from "../services/Utils.js";

export class MainController {
  constructor(chatView) {
    this.chatView = chatView;

    this.answers = ["yes", "yeap", "sure"];
    this.picked = 0;
  }

  pick() {
    this.picked = Utils.random(1, 101);
  }

  async play(message) {
    if (!this.picked) {
      const lower = message.toLowerCase();
      const yes = this.answers.findIndex((answer) => answer === lower) > -1;

      if (yes) {
        this.pick();

        await this.chatView.assistantSaying("Ready?");
        await this.chatView.assistantSaying("Go!");
      }

      return;
    }

    const guessed = parseInt(message);

    if (isNaN(guessed)) {
        this.chatView.assistantSaying(
        "To be honest, I cannot to recognize a number which you are guessing"
      );

      return;
    }

    if (guessed === this.picked) {
        await this.chatView.assistantSaying("That's right!");
        await this.chatView.assistantSaying(`I picked ${this.picked}`);
  
        this.picked = 0;
  
        await this.chatView.assistantSaying("Do you want to play one more time?");

        return;
      }

    guessed > this.picked
      ? this.chatView.assistantSaying("Less")
      : this.chatView.assistantSaying("No. More");
  }

  async start() {
    this.chatView.setController(this);

    await this.chatView.assistantSaying("Hi");
    await this.chatView.assistantSaying("I'm your assistant");
    await this.chatView.assistantSaying("Nice to meet you!");
    await this.chatView.assistantSaying(
      'I want to play with you in the "Guess a number" game'
    );
    await this.chatView.assistantSaying(
      "I'll pick a number (from 1 to 100) randomly"
    );
    await this.chatView.assistantSaying("You should guess it");
    await this.chatView.assistantSaying("Ready?");

    this.pick();

    await this.chatView.assistantSaying("Go!");

    this.chatView.initListeners();
  }
}
