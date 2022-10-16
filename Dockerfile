FROM node:13
ENV HOME /backend
WORKDIR /backend
COPY . .

# Download dependancies
RUN npm install
EXPOSE 8000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && npm start