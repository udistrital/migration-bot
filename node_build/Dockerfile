FROM node:8.11.1
ENV http_proxy http://10.20.4.15:3128
ENV https_proxy http://10.20.4.15:3128
#ARG USER_ID
#RUN apt-get update && apt-get install -y sudo

#RUN export uid=$USER_ID && \
#    mkdir -p /home/developer && \
#    echo "developer:x:${uid}:0:developer,,,:/home/developer:/bin/bash" >> /etc/passwd && \
#    echo "developer:x:${uid}:" >> /etc/group && \
#    echo "developer ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/developer && \
#    chmod 0440 /etc/sudoers.d/developer && \
#    chown ${uid}:0 -R /home/developer
RUN npm install -g express-mongoose-generator
RUN npm install -g express-generator-api
#RUN npm install -g react-static
RUN npm install -g nodemon
#USER developer
#WORKDIR /app
