FROM node:18-alpine AS builder
WORKDIR /usr/src/app
COPY . .
ENV CI=true
RUN npm ci
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/src/app
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
COPY --chown=node:node schema ./schema
COPY --chown=node:node functions ./functions
COPY --chown=node:node package.json package-lock.json ./
ENV NODE_ENV=production
RUN npm ci
RUN mkdir node_modules/.mf && chown -R node:node node_modules/.mf

ENV ADMIN_PASSWORD=admintest
ENV SECRET=secrettest
EXPOSE 8788
USER node
CMD npx wrangler pages dev dist \
        --compatibility-date=2023-05-18 \
        --binding STRIPE_API_KEY=$STRIPE_API_KEY \
        --binding ADMIN_PASSWORD=$ADMIN_PASSWORD \
        --binding SECRET=$SECRET
