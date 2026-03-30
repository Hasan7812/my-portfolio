# 1. Node.js imajını kullan
FROM node:20-alpine AS builder
WORKDIR /app

# 2. Bağımlılıkları yükle
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

# 3. Kodu kopyala ve build al
COPY . .
RUN npx prisma generate
RUN npm run build

# 4. Çalıştırma aşaması
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "start"]