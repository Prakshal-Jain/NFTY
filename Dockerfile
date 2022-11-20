FROM node:13
ENV HOME .
WORKDIR /
COPY . .

# Download dependancies
RUN npm install
EXPOSE 8000
EXPOSE 1234

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && cd ./frontend && npm install && npm run build && cd ../backend && npm start