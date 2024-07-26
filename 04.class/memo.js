#!/usr/bin/env node

import ReceiveStdin from "./receive_stdin.js";
import Memo from "./memoApp.js";

const receivedStdin = new ReceiveStdin();
const option = receivedStdin.getOption();

const memo = new Memo(option);
memo.run();
