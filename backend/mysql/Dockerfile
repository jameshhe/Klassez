FROM mysql:5.7

ENV MYSQL_DATABASE=foogle
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password
ENV MYSQL_RANDOM_ROOT_PASSWORD=yes

COPY ./init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306