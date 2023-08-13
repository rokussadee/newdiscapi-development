FROM alpine
WORKDIR /app
COPY package*.json .
RUN apk add --update nodejs npm
RUN apk add python3
RUN npm install
RUN apk --no-cache add bash g++ gcc libgcc make python3 chromium yarn  
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true    
RUN yarn global add nodemon    
COPY . .
CMD [ "npm", "run", "start" ]
