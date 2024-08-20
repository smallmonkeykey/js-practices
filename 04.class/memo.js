#!/usr/bin/env node

import MemoApp from "./memoApp.js";

(async () => {
  const memoApp = new MemoApp();
  await memoApp.run();
})();
