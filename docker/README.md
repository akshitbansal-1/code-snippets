### Dockerfile-node
---

move the Dockerfile in your node app and build with the following command

```docker build -t node-app .```

run with

```docker run -p 3000:3000 --expose 3000 node-app```

additional flags

```-e PORT=4000 --expose 4000 -p 4000:4000```


---