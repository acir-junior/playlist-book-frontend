# Estágio 1: Build
FROM node:22-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
ENV NEXT_BUILD_WORKERS=2
RUN npm run build

# Limpa arquivos desnecessários
RUN rm -rf node_modules/.cache

# Estágio 2: Produção
FROM node:22-alpine

WORKDIR /app
COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm install --production

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

EXPOSE 3000

# Comando para rodar a aplicação em produção
CMD ["npm", "start"]