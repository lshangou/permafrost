# Permafrost
### Install dependencies
```npm install```
### Run in dev mode with hot-reload (2 consoles):
TS files will reload the server (a little slow), but EJS and SCSS no, just clean the cache (fast).
```npm run sass```
```npm run dev```

## /controllers
Functions that use Request and Response of the client to execute functions. May render files, send json's etc.
## /database
Mongo / Mongoose Database-related scripts. Only include the connection by now, and is imported in server.ts as an way to reduce server.ts file complexity.
## /helpers
Helpers are useful interfaces, classes, objects and functions that may be used in all the app. sha1 encryption and default alerts are examples.
## /middleware
Middleware functions to interfere during access to a route. Currently WIP, but is an example of why and how routes of API and website are split and there's the space to create and auth function and do not allow non-admin users to use the API. (Can use the Request object, so I can see what they're trying to access too, may create a 'allowAccess' file depending on what route they're trying to request.)
## /models
There are the Objects that the app uses. Can be Users, Posts, etc. They include both the interface for Typescript and Mongoose Schema, so they can be typed anywhere and recognized as an ts interface and monngose object.
## /routes
Includes all the app's path to access and get resouces and pages.
### Adding a new API route:
#### Defining it's route
IN ```/routes/api```, you can find the API Routes. If you are willing to add an route under ```/user```, go to userRouter.ts, otherwise, create a file (eg. postRouter.ts), then import in index.ts like the example.

In userRouter.ts add the path required (will be under /api/user) and the controller function it will call.
#### Creating it's function.
The same way as the routes, if you are willing to add an User function, go to ```/controllers/userController.ts```, otherwise create a new file there.
There's no need to import the new file in other places, but a controller uses a model, and create a model using User by example. (It creates the database schema also. May look like repeating code but it's for typing.)

In controller, just export a const with the used function and use it on the route call. Request and Response parameters may be used.
#### The same is true for non-API route, just follow the pattern.
## package.json
File with npm scripts, modules and app name/version are there.
## server.ts
The main file. Express configs, database connection string and main options are there. May also add an .ENV file later.
## tsconfig.json
Typescript configuration file. There is configured to create and "app" folder with javascript (es2020) files that need to be served on the server. it will have an server.js file inside the app folder after compiling (or running dev, that watches this too.)