#!/bin/bash
node build.js
fswatch -o templates/* entries/* build.js | xargs -n1 -I{} node build.js
