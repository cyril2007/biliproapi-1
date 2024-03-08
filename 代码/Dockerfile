# 使用官方的Node.js镜像作为基础
FROM node:latest

# 设置工作目录
WORKDIR /app

# 复制应用文件到工作目录
COPY . /app

RUN npm install express body-parser cors axios

COPY . .

# 定义环境变量，可以为空
ENV COOKIE1=
ENV COOKIE2=
ENV COOKIE3=
ENV COOKIE4=
ENV COOKIE5=
ENV COOKIE6=

# 暴露端口
EXPOSE 23233

# 运行应用
CMD [ "node", "bilipro.js" ]