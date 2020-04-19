FROM node
EXPOSE 5000
WORKDIR /app
RUN mkdir /app/build
COPY build /app/build
RUN npm install -g serve
CMD ["serve", "build"]