# ACML

#### To get started

- First clone the repo and open it locally from your favorite editor.

- Run ```npm install```, then change directory to client using ```cd client``` and run ```npm install``` there as well.

- Connect it to your own ```MongoDB``` and add the ```mongoURI``` to a file named ```keys_dev.js``` under ```config``` folder.

```javascript
module.exports = {
    mongoURI: "<Connection String Goes Here>"
};
```

- Finally run ```cd..``` to go back to the main directory and run ```npm run dev```.
