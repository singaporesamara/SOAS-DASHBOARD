# SOAS Client App

## Installation

```js
$ yarn
$ yarn start # to start dev application
$ yarn run lint:watch # to run eslint in watch mode
```

## Deployment

* ```ps ax | grep node```
* ```kill -9 NODE_PID```
* ```./start.sh```
* browse http://dev-soaspay.com:8000/

## Dev credentials

```sh
$ ssh root@112.74.37.201 / SoC9M8O7
```

## Troubleshooting

### Something happened with node-sass

* npm i node-sass

### Module build failed: Error: spawn /var/www/web/node_modules/pngquant-bin/vendor/pngquant ENOENT

* npm i pngquant-bin

### Module build failed: Error: spawn /var/www/web/node_modules/optipng-bin/vendor/optipng ENOENT

* npm i optipng-bin
