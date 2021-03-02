# MyFirstGCP

Google Cloud

## Structure

### Google Cloud Settings

> https://cloud.google.com/free

> cloud container clusters get-credentials ticketing-dev

> Enable Cloud Build API

> EDIT Skaffold -> local push: false add "googleCloudBuild" -> us-gcr.io/mynewmobileapp/<project_name>

> NGINX settings (Load Balancer in GCP):
> --- kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/cloud/deploy.yaml

Source: https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke

> nvim /etc/hosts -> add the load balancer IP address in GCP - Networking - Load Balancing

> Enable - Tools - Cloud Build

##### Skaffold Update for GCP

### HOST file

> nvim /etc/hosts

Application configuration (ticketing):
-- src

-- tsconfig.json

### Docker

#### Note:

COPY . . copies the entire project, recursively into the container for the build.

#### Installation

Step 1:

> cd ticketing/auth

Step 2: Build an Image

> docker build -t pob944/auth .

## K8s

TO DO

## Google Cloud

## Skaffold

> skaffold dev
