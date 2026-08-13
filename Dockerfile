# Image de développement local : sert le serveur de développement Vite avec
# rechargement à chaud. Ne construit pas de bundle de production.
FROM node:20-alpine

WORKDIR /app

COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
