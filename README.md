# To run using Docker:

Build the image and run the image in a container using
```bash
docker build -t opal -f server/Dockerfile.dev .; docker run -t -d -p 8080:8080 --name opal opal
```
This will open our remote server at `localhost:8080`. After running this once, you can use Docker Desktop to manage the container.

To delete the container and image, use
```bash
docker rm --force opal; docker rmi opal
```

To open the container in VSCode, open the Command Pallette `ctrl + shift + p` and run `Dev Containers: Attach to Running Container` (this requires the Dev Containers extension).

Open the folder `/app/Opal/server` in the Dev Container.

When opening the first time, VSCode will think every file has been changed (potentially line-termination inconsistencies, not sure). Discard all git changes before starting any work. You should only have to do this once after creating the container.

# server
The server must be handled inside the Docker container.

To reattach your terminal to the gunicorn process, use
```bash
screen -rd opalserver
```
To scroll inside the screen (enter copy mode), hit `ctrl+a`, then hit `esc`. When you are in copy mode, you can't see new logs. So, once you are done looking, hit `ctrl+c` to exit copy mode. To detach, hit `ctrl+a`, then hit `d`.

There are helpful `.sh` scripts you can run with the `bash` command in `server/scripts`.
The `restart.sh` script will restart the gunicorn process to allow you to view changes to code.
The `start.sh` script will run the gunicorn process in a screen. Behavior is the same as when you run `attach.sh`.

# vercel
The front-end must be handled outside of the Docker container.

## Helpful commands
All of these commands must be executed from inside the `vercel` folder.

Install all node dependencies from package.json
```bash
npm install
```
Run the local test server
```bash
npm run dev
```
Open the Prisma database view
```bash
npx prisma studio
```
Push schema changes to database
```bash
npx prisma generate --generator js
```
