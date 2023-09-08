# Workflow App

Postman Sample Workspace: https://www.postman.com/kaanengin/workspace/workflow-app

## Development
In order to run the project you need to create `.env` file in the `backend` folder by using the `.env-sample` file. The same applies for the `mongo.env` file which is under the root directory.

To run the project you can use `docker-compose up` command.
To run the tests you need to follow these after running the containers:
1. `docker exec -it backend bash`
2. `npm test`

To see the logs of the node app, you can use `docker logs --follow backend`

## Production
The source code of the backend will be deployed to my droplet at [digitalocean](digitalocean.com) on every commits & merges to the `main` branch. The frontend is going to be deployed to the [cloudflare pages](https://www.cloudflare.com/) ,as same as with the backend, it gets deployed on every commits & merges to the `main` branch. 

You can find the GitHub action file in `.github/main.yml`.  We use `appleboy/ssh-action@master` in the action file to connect my droplet at digitalocean. 
We have secret variables stored in GitHub Repository secrets such as [`SERVER_IP`,`SERVER_USERNAME`,`SSH_PRIVATE_KEY`]. 

We connect to the droplet and pull the project in the folder we want and then run the `docker-compose -f docker-compose-prod.yaml up -d --build` command.

## About docker-compose-prod.yaml

We have 4 containers in our `docker-compose-prod.yaml` such as:
 1. webserver
 2. mongodb
 3. backend
 4. certbot
### webserver
The webserver container is using the `nginx:mainline-alpine` image and creates a reverse proxy for us. It listens the port `:443` to receive the `https` requests for our domain (`workflowapp.online`) and forwards to our Node.js API.
### mongodb
The mongodb container uses the `mongo` image, listens and exposes the `:27017` port
loads the environment variables from `./mongo.env` file. Serves as our backend service for our project.
### backend
The backend container is the container where we store run our Node.js API. It listens and exposes the `:8080` port and loads the environment variables from `./backend/.env` 
### certbot
This is the container provided by the [Let's Encrypt](https://letsencrypt.org/) community to create free SSL certificates. We use this container to create a dummy (`STAGING`) certificate  first and renew it with an original SSL certificate. I followed [this](https://www.digitalocean.com/community/tutorials/how-to-secure-a-containerized-node-js-application-with-nginx-let-s-encrypt-and-docker-compose) tutorial to use certbot and nginx

## Advantages of our setup
By the help of the `docker-compose`, we are able to run our database, backend api and react app on the development environment by simply running `docker-compose up` command.
When we commit or merge our changes to the `main` branch, everything will be built up and deployed to the production environment.

## External dependencies

### backend
The only external dependency we have in the API is the `jest` package. I used it to run our  unit tests.
### frontend
We have a couple of external dependencies/packages in our Vite & React application such as:
* @tanstack/react-query
	* The @tanstack/react-query & @tanstack/react-query-devtools packages can be found in [TanStack](https://tanstack.com/). Those allow us to handle the client state control with a simple interface and api. 

* @tanstack/react-query-devtools
	* This creates devtools of the react query on `development` environment
* react-hot-toast
	* I used this package to show success and error messages of the requests we made to backend
* reactflow
	* This is the package where I'm showing the workflows we are playing with.  The [React Flow](https://reactflow.dev/) is a freemium package that helps illustrating flows
* daisyui
	* This is a premade UI components library with Tailwindcss, I used their theme generator in order to design the colors of my app and UI components from here [daisyUI](https://daisyui.com/)
* tailwindcss
	* The [Tailwind CSS](https://tailwindcss.com/) is the most powerful css framework in my humble opinion. I use it everyday in my every projects. It makes developers life easier. 
* axios
	* The package to make `XMLHttpRequest` to our backend
## Decisions

* I thought creating my own components to illustrate the workflow graph but then I found the React Flow package and it was looking more beautiful
* I had to hire a server at digital ocean to serve my backend and mongodb containers in production, everything went well so far but then the cloudflare was using only the `HTTPS` on our frontend and it was blocking the requests to our `HTTP` backend. So I had to have a structure for creating and renewing SSL certificate for the backend.

## Comments
* It was a long journey for me to built up such an application from the ground. I'll store the repository at my [GitHub profile](https://github.com/minikdev) to use as a cheatsheet in the future.

