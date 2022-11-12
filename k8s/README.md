### Deployment
---
* A deployment creates replica set which creates the pods
* ReplicaSet ensures the required replicas for the deployment

To get all deployments

```kubectl get deployments```

To get rollout status i.e. how many replicas are deployed, run 

```kubectl rollout status deployment/node-app```

To get replica sets info, run 

```kubectl get rs```

To see the labels automatically generated for each Pod, run 

```kubectl get pods --show-labels```

To update a deployment, run 

```kubectl set image deployment.v1.apps/node-app=node-app-v2```

You can change other properties of the deployment with the same command specifying the properties to be changed.

More info: [ref](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

---
