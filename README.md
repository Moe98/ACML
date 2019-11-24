# ACML

#### Get started

- First clone the repo and open it locally from your favorite editor.

- Run ```npm install```, then change directory to client using ```cd client``` and run ```npm install``` there as well.

- Connect it to your own ```MongoDB``` and ```News API``` from [here](https://newsapi.org/). Then add the ```mongoURI``` and ```newsURI``` and ```secretOrKey``` to a file named ```keys_dev.js``` under ```config``` folder.

```javascript
module.exports = {
    mongoURI: "<Connection String Goes Here>",
    newsURI: "<API Key Goes Here>",
    secretOrKey: "<Your Secret Key Goes Here>"
};
```

- Finally run ```cd..``` to go back to the main directory and run ```npm run dev```.
