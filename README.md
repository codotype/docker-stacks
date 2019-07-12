# docker-stacks
:whale2: Ready-to-run Docker images containing [Codotype](https://github.com/codotype/codotype) generators and runtime

Repository hosted on GitHub at [codotype/docker-stacks](https://github.com/codotype/docker-stacks).

Docker container image hosted on Docker Hub at [codotype/docker-stacks](https://hub.docker.com/r/codotype/docker-stacks/).

## Usage

#### Running the Codotype stack
<!-- TODO - add mount command here -->
```
docker run -it -p 8888:8888 codotype/develop
```

## Building the Docker Image
Use the following instructions if you want to modify a Docker image and push a different copy to DockerHub.

1. Create a [new Dockerhub Repository](https://hub.docker.com/add/repository/) named `codotype/develop`.

2. Build the Docker image by running the following command in the `codotype/develop` directory:

```
docker build -t codotype/develop .
```

3. Test the image locally with the following command:

```
docker run -it --rm --pid=host -p 8888:8888 codotype/develop
```

4. Tag the resulting image (i.e. `bb38976d03cf`) and push to Dockerhub:

```
docker tag bb38976d03cf codotype/develop:latest
docker push codotype/develop
```
