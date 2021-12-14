FROM mongo

WORKDIR /usr/db

# seed MongoDB database with starting collections
COPY *.js /docker-entrypoint-initdb.d

EXPOSE 27017