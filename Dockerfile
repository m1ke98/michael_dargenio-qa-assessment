FROM node:lts
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .env
RUN chmod +x ./run.sh
CMD ["./run.sh"]