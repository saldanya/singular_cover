# Singular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5. It is a test of angular development made by David Saldaña. The project can be tested on https://saldanya.github.io/singular_cover/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Further work

It would has been great, but I dind't have time to do it, to use ng-template/ng-container to dinamically change the list-item layout. That's for sure a better approach than displaying the price depending on the configuration. Also is good to have unit tests for everything, but I focused on a better app architecture and component reuse than on testing, but I work with e2e and unit testing on my daily work.

Themeing could have been more standard alse, re-using sass vars, for example. Or with a more complex structure.

Modal could have be done in another way to avoid to have it on the DOM, but in terms on time, it couldn't be done. It could have been done like the notification component that uses the factory pattern to creat components on the vrc.

There ara a lot of things that can be improved or revised. But for a test I think is pretty ok.
