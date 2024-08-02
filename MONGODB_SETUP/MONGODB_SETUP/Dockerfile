FROM mongo:latest 
ENV MONGO_INITDB_ROOT_USERNAME=dummyuser 
ENV MONGO_INITDB_ROOT_PASSWORD=user123 
COPY init-mongo.js /docker-entrypoint-initdb.d/ 
EXPOSE 27017 
