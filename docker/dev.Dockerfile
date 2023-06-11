FROM node:18-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD npx wrangler pages dev \
        --proxy 5173 \
        --compatibility-date=2023-05-18 \
        -- vite