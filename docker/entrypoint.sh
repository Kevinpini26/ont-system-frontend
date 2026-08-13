#!/bin/sh
set -e

if [ ! -d node_modules ] || [ -z "$(ls -A node_modules 2>/dev/null)" ]; then
    echo "[entrypoint] Installation des dépendances Node (npm install)…"
    npm install
fi

if [ ! -f .env ] && [ -f .env.example ]; then
    echo "[entrypoint] Création de .env à partir de .env.example…"
    cp .env.example .env
fi

exec "$@"
