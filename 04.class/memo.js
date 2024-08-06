#!/usr/bin/env node

import Memo from "./memo2.js";

(async () => {
  const memo2 = new Memo();
  await memo2.run();
})();
