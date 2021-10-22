#!/bin/sh

cd /app
npm ci --production
node start.js
