# To run using Docker:

Build the image and run the image in a container using 
```bash
docker build --build-arg mode=dev -t opalserver .; docker run -t -d -p 8080:8080 --name opalserver opalserver
```
This will open a web server at `localhost:8080`.

To open the container in VSCode, open the Command Pallette `ctrl + shift + p` and run `Dev Containers: Attach to Running Container` (this requires the Dev Containers extension).

If you aren't in the same directory as the repository, use
```bash
cd /app
```

If the /app directory files are not in the file explorer pane in VS Code, you can manually attach them:
   - Go to File > Add Folder to Workspace...
   - Select 'app' and click 'Ok'

To reattach your terminal to the gunicorn process, use
```bash
screen -rd opalserver
```
To scroll inside it, hit `ctrl+a`, then hit `esc`. When you are in "copy" mode, you can't see new logs. So, once you are done looking, hit `ctrl+c` to exit copy mode. To detach, hit `ctrl+a`, then hit `d`.

There are helpful `.sh` scripts you can run with the `bash` command in `/scripts`.
The `restart.sh` script will restart the gunicorn process to allow you to view changes to code.
The `start.sh` script will run the gunicorn process in a screen. Behavior is the same as when you run `attach.sh`.

A good workflow is to attach to the screen as soon as you open the container in VSCode. Then, make another terminal and put the attached terminal next to the new one. That way, you can restart the server using the the new terminal and view the server's output at the same time.

To delete the container and image, use
```bash
docker rm --force opalserver; docker rmi opalserver
```