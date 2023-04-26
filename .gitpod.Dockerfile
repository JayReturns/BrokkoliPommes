FROM gitpod/workspace-mysql

USER gitpod

RUN sudo apt-get update -q \
    && sudo apt-get install automake autoconf netcat -y