import { MainController } from "./controllers/MainController.js";
import { ChatView } from "./views/ChatView.js";

const chatView = new ChatView(null);
const mainController = new MainController(chatView);

mainController.start();
