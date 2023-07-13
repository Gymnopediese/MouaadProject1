FROM nginx:latest

# WORKDIR /app
COPY ./nginx.conf .
COPY ./script ./script

CMD ["sh", "script"]
