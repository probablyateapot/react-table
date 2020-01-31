
FROM node:12-alpine AS builder

ARG GIT_REPO_URL=https://github.com/probablyateapot/react-table
ARG GIT_REPO_REF=master

RUN apk add --no-cache git
RUN git clone ${GIT_REPO_URL} /tmp

WORKDIR /tmp
RUN echo "REACT_APP_BUILD_DESCRIBE=$(git describe --always)" | tee -a .env
RUN echo "REACT_APP_REPO_URL=$GIT_REPO_URL" | tee -a .env
RUN git checkout ${GIT_REPO_REF}
RUN npm ci
RUN npm run build

FROM nginx:alpine

COPY --from=builder /tmp/build /usr/share/nginx/html

