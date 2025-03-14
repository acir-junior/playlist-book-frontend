# Use a imagem oficial do Node.js como base
FROM node:22-alpine

# Instala o Git, wget
RUN apk update && \
    apk add --no-cache git wget

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o resto dos arquivos do projeto
COPY . .

# Instale as dependências do projeto
RUN npm install

# Compile o projeto TypeScript
RUN npm run build

# RUN mv .env.example .env

# Exponha a porta que a aplicação vai usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
