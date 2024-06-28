ARG NODE_VERSION=lts

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV development

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install all dependencies, including devDependencies
RUN npm install

# Copy the rest of the source files into the image
COPY . .

# Expose the port that the application listens on
EXPOSE 9000

# Run the application using npm script
CMD ["npm", "run", "dev"]