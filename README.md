## Overview

This project is part of a series of microservices that are in my repository in order to guide other developer about micro-services architecture in nodejs and graphql.

---

## Requirements

*The project was developed on ubuntu 20.04 and all the instructions in this guide are based on this linux distribution.*
Before proceeding it is needed that you have installed on your machine the following tools:

1. nodejs => apt-get install nodejs
2. npm => apt-get install npm
3. [Docker](https://docs.docker.com/engine/install/ubuntu/)
4. [Docker compose](https://docs.docker.com/compose/install/)

**PS:** It may be needed that you have to install some npm packages that are not installed as part of the project but globally:

1. [enc-cmd](https://www.npmjs.com/package/env-cmd)
2. You can use this [development-tool](https://github.com/webbiko/development-tool) project to help you out with database configuration.

---

## Env variables

In order to execute this project smoothly it is necessary to create a a file called **.env-cmdrc** with the following structure:

```json
{
  "development": {
    "NODE_ENV": "development",
    "DATABASE_HOST": "",
    "DATABASE_NAME": "dev",
    "DATABASE_USER_NAME": "mb",
    "DATABASE_PASSWORD": "mb",
    "AUTH_SECRET": ""
  },
  "test": {
    "NODE_ENV": "test",
    "DATABASE_HOST": "",
    "DATABASE_NAME": "",
    "DATABASE_USER_NAME": "",
    "DATABASE_PASSWORD": "",
    "AUTH_SECRET": ""
    
  },
  "production": {
    "NODE_ENV": "production",
    "DATABASE_HOST": "",
    "DATABASE_NAME": "",
    "DATABASE_USER_NAME": "",
    "DATABASE_PASSWORD": "",
    "AUTH_SECRET": ""
  }
}

```
---

## Running the project in development mode

In order to run the project in development mode it is required to execute the steps below:

1. Access the project development-tool/setup;
2. Grant execution permission to setup.sh: **chmod +x setup.sh**;
3. Execute the script: ./setup.sh. (This will build all required docker images and launch them);
4. docker ps and you should see all docker images up and running.

After the steps above it is necessary to check which ip address which database is running and to do check that out follow the steps belo:

### User profile (MYSQL)
1. As result of command **docker ps** copy the CONTAINER_ID;
2. Execute docker inspect <CONTAINER_ID> and you should see in the end of the output just look for the tah "Networks => IPAddress" then copy it.
3. Access the project nodejs-graphql-mysql;
4. Execute npm install;
5. Edit the file .env-cmdrc and past the IP address on host env variable(DATABASE_HOST);
6. In the root folder of project user-management execute on terminal:
	- npm run migrate;
  - npm run seed
	- npm run start

After the steps about the service should be up and running on port 4000.

---
