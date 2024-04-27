#!/bin/bash
echo "Starting app..."
npm run migration:generate --name=products &
wait
npm run migration:run --name=products &
wait
node dist/src/main.js