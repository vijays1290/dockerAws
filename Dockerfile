FROM node:10.15.3
## SETUP PUPPETEER - https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md

# See https://crbug.com/795759
RUN apt-get update && apt-get install -yq libgconf-2-4

# Install latest chrome package.
# Note: this installs the necessary libs to make the bundled version of Chromium that Pupppeteer
# installs, work.
RUN apt-get update && apt-get install -y wget --no-install-recommends \
    && wget --no-check-certificate -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
      --no-install-recommends 
    
WORKDIR /app

COPY ./package.json ./package-lock.json ./.npmrc ./
# RUN npm config set registry https://registry.npmjs.org
RUN npm ci

COPY . .

RUN npm run lint
RUN npm run build
RUN npm run test


FROM nginx
EXPOSE 80
COPY --from=0 /app/dist/dockerAws ./usr/share/nginx/html

COPY --from=0 /app/test-results /test-results


# USER root
# RUN chmod -R a-x+rwX /usr/share/nginx/html
# USER 1001






