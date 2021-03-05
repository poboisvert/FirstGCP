> cd ticketing
> skaffold dev

-- Open nats port

> k get pods
> kubectl port-forward """nats-depl-ID""" 4222:4222

--- Start nats-test

> cd nats-test

> npm start listener
> npm start publisher
