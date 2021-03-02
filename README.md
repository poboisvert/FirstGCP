# First Google Could in Typescript

## Skaffold with GCP

### HOST file

> nvim /etc/hosts

### Docker

> COPY . .

copies the entire project, recursively into the container for the build.

#### Installation

Step 1:

> cd ticketing/auth

Step 2: Build an Image

> docker build -t pob944/auth .

## K8s

Simply adjust the configuration in "infrastructure/k8s" and edit the bottom for all the files.

## Google Cloud

## Create an account

> https://cloud.google.com/free

Please for most file you will use the project ID and the timezone is important. The project is using a "Kubernetes clusters" with a standard configuration.

### Steps:

#### GCP

This cloud still use the Docker IDE and the kubernetes must use the correct config file.

> gcloud init

The initialization must use the same timezone as the Kubernetes clusters "us-central1-c".

> cloud container clusters get-credentials ticketing-dev

> Enable Cloud Build API

> Enable - Tools - Cloud Build

##### EDIT Skaffold

> -> local push: false add "googleCloudBuild" -> us-gcr.io/mynewmobileapp/<project_name>

#### NGINX settings (Load Balancer in GCP):

> --- kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.44.0/deploy/static/provider/cloud/deploy.yaml

Source: https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke

#### HOST file

> nvim /etc/hosts -> add the load balancer IP address in GCP - Networking - Load Balancing

## If GCP user not found

Run

> gcloud auth application-default login

## Skaffold

From now the Skaffold will push the image on the cloud.

> cd ticketing

> skaffold dev

EDIT: If unsafe error in browser. type:

> thisisunsafe
