## [2.2.2](https://github.com/adriengibrat/ts-custom-error/compare/v2.2.1...v2.2.2) (2018-12-29)


### Bug Fixes

* **release:** Fix umd minification issue, add typescript definitions for all bundles formats ([a091837](https://github.com/adriengibrat/ts-custom-error/commit/a091837))

<a name="2.2.1"></a>
## [2.2.1](https://github.com/adriengibrat/ts-custom-error/compare/v2.2.0...v2.2.1) (2018-04-04)


### Bug Fixes

* Fix latest travis deploy fail status ([0b18352](https://github.com/adriengibrat/ts-custom-error/commit/0b18352))

<a name="2.2.0"></a>
# [2.2.0](https://github.com/adriengibrat/ts-custom-error/compare/v2.1.0...v2.2.0) (2018-04-04)


### Features

* Add custom error name support ([7791153](https://github.com/adriengibrat/ts-custom-error/commit/7791153))

<a name="2.1.0"></a>
# [2.1.0](https://github.com/adriengibrat/ts-custom-error/compare/v2.0.0...v2.1.0) (2018-03-24)


### Features

* Improve factory typings ([dc1eed6](https://github.com/adriengibrat/ts-custom-error/commit/dc1eed6))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/adriengibrat/ts-custom-error/compare/v1.0.1...v2.0.0) (2018-03-16)


### Code Refactoring

* Change factory export name to customErrorFactory ([e8f51a0](https://github.com/adriengibrat/ts-custom-error/commit/e8f51a0))


### Features

* Export factory Typescript Interfaces ([d03b476](https://github.com/adriengibrat/ts-custom-error/commit/d03b476))


### BREAKING CHANGES

* the factory export name changed from `factory `to more expliit `customErrorFactory`



<a name="1.0.1"></a>
## [1.0.1](https://github.com/adriengibrat/ts-custom-error/compare/v1.0.0...v1.0.1) (2018-03-12)


### Bug Fixes

* Expose constructor in prototype when using factory ([387cc8d](https://github.com/adriengibrat/ts-custom-error/commit/387cc8d))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/adriengibrat/ts-custom-error/compare/v0.0.2...v1.0.0) (2018-03-12)


### Code Refactoring

* Rewrite factory to be Higher order function ([720940c](https://github.com/adriengibrat/ts-custom-error/commit/720940c))

### BREAKING CHANGES

* The factory now accept a function as first parameter where previously it used an error name and a list of property keys



<a name="0.0.2"></a>
## 0.0.2 (2018-03-12)

First release
