# README #

This README includes the steps that are necessary to import the HxUi-angular into a project or to contribute with development.

### What is this repository for? ###

HxUi-angular is an Angular library based on the HxUi User Interface Library.

### How do I get set up to contribute with development? ###

1. Clone this repository
2. CD into the cloned repo
3. run `npm install`

### Available Npm Scripts ###
* `npm start` - runs the compiler and a server at the same time, both in "watch mode".
* `npm run tsc` - runs the TypeScript compiler once.
* `npm run tsc:w` - runs the TypeScript compiler in watch mode; the process keeps running, awaiting changes to TypeScript files and re-compiling when it sees them.
* `npm run lite` - runs the [lite-server](https://www.npmjs.com/package/lite-server), a light-weight, static file server, written and maintained by
[John Papa](https://github.com/johnpapa) and
[Christopher Martin](https://github.com/cgmartin)
with excellent support for Angular apps that use routing.

Here are the test related scripts:
* `npm test` - compiles, runs and watches the karma unit tests
* `npm run e2e` - run protractor e2e tests, written in JavaScript (*e2e-spec.js)

### Install as NPM (import into project) ##
npm install @hxui/angular --save

### How do I view the HxUi-angular documentation ###

Run ```ng serve``` .


### How do I package and publish to NPM
Run ```npm run packagr```
then
Run ```npm publish lib```


### trouble shooting during development 
Dependencies in the peerDependency list will not be installed when your run ```npm install```. 
You will need to install ```npm install -g npm-install-peers``` to then be able to install
these dependencies by running ```npm-install-peers```

Note: Don't forget to bump up the version number in the package json
