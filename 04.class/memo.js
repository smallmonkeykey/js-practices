#!/usr/bin/env node

import ReceiveStdin from "./receiveStdin.js";
import MemoApp from "./memoApp.js";

const receivedStdin = new ReceiveStdin();
const option = receivedStdin.getOption();

const memoApp = new MemoApp(option);
memoApp.run();
