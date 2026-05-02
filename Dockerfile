# Base Ubuntu
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install required tools
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    gnupg \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install NVM
ENV NVM_DIR=/root/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Install Node 25.9.0 using NVM
RUN . "$NVM_DIR/nvm.sh" && \
    nvm install 25.9.0 && \
    nvm use 25.9.0 && \
    nvm alias default 25.9.0

# Add Node to PATH
ENV PATH="$NVM_DIR/versions/node/v25.9.0/bin:$PATH"

# Verify
RUN node -v && npm -v

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of code
COPY . .

# Build Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]