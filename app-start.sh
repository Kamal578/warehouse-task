#!/bin/bash
echo "Starting app..."
npm run migration:generate --name-products
npm run migration:run --name-products
node dist/src/main.js