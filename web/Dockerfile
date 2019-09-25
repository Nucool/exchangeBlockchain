FROM node:12-slim

WORKDIR /usr/src/app

COPY package*.json ./

# Install production dependencies.
RUN yarn global add serve

# Copy local code to the container image.
COPY . ./
RUN echo "starting build..."

# Run the web service on container startup.
CMD ["serve", "-p", "80", "-s", "build"]
