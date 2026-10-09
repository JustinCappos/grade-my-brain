#!/bin/sh
# Starts the Grade My Brain server at http://localhost:8080 (or $PORT).
# Usage: ./start.sh        or        PORT=9000 ./start.sh
cd "$(dirname "$0")" || exit 1
exec node serve.js
