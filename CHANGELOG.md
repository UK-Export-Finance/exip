# Changelog

## [1.14.4](https://github.com/UK-Export-Finance/exip/compare/v1.14.3...v1.14.4) (2022-10-28)


### Bug Fixes

* **EMS-378:** update Content-Security-Policy to allow GA scripts ([c0539e4](https://github.com/UK-Export-Finance/exip/commit/c0539e443f2725e0a9b7ec653782296f0611e686))

## [1.14.3](https://github.com/UK-Export-Finance/exip/compare/v1.14.2...v1.14.3) (2022-10-27)


### Bug Fixes

* **EMS-379:** fix issue where buyer country would not update when JS is disabled ([#141](https://github.com/UK-Export-Finance/exip/issues/141)) ([397378b](https://github.com/UK-Export-Finance/exip/commit/397378b18638f8a14e579437a0a4ad966c2bfb8e))

## [1.14.2](https://github.com/UK-Export-Finance/exip/compare/v1.14.1...v1.14.2) (2022-10-20)


### Bug Fixes

* **EMS-458:** fix issue where skip content partial would not render text/link ([#132](https://github.com/UK-Export-Finance/exip/issues/132)) ([6cc0554](https://github.com/UK-Export-Finance/exip/commit/6cc05543a9f0529a8653971d555d7f2f918df5ea))

## [1.14.1](https://github.com/UK-Export-Finance/exip/compare/v1.14.0...v1.14.1) (2022-10-12)


### Bug Fixes

* **EMS-465:** when currencies API does not return data, redirect to problem-with-service page ([1438b44](https://github.com/UK-Export-Finance/exip/commit/1438b44abca884e46678e1d159f9f0babeb63b99))

## [1.14.0](https://github.com/UK-Export-Finance/exip/compare/v1.13.0...v1.14.0) (2022-10-10)


### Features

* **EMS-462:** in buyer country page, redirect to problem-with-service page if no countries are returned from CIS API ([734f9a1](https://github.com/UK-Export-Finance/exip/commit/734f9a1e972f77dbac686988530c2477912ffb3a))

## [1.13.0](https://github.com/UK-Export-Finance/exip/compare/v1.12.0...v1.13.0) (2022-10-10)

### Features

* **EMS-458:** add skip to main content link ([#122](https://github.com/UK-Export-Finance/exip/issues/122)) ([dbbdfe5](https://github.com/UK-Export-Finance/exip/commit/dbbdfe583966c45585b90223feeb0f060fe4c2dd))

* **EMS-459:** add back link to cookies page ([#122](https://github.com/UK-Export-Finance/exip/issues/122)) ([dbbdfe5](https://github.com/UK-Export-Finance/exip/commit/dbbdfe583966c45585b90223feeb0f060fe4c2dd))

## [1.12.0](https://github.com/UK-Export-Finance/exip/compare/v1.11.0...v1.12.0) (2022-10-10)


### Features

* **EMS-382:** cookies page updates for optional/analytics cookies ([#119](https://github.com/UK-Export-Finance/exip/issues/119)) ([56a105f](https://github.com/UK-Export-Finance/exip/commit/56a105f76301474b5a32b39b54d412e20953777b))

## [1.11.0](https://github.com/UK-Export-Finance/exip/compare/v1.10.1...v1.11.0) (2022-09-28)


### Features

* **EMS-380:** filter out invalid country names from CIS API ([2290f5a](https://github.com/UK-Export-Finance/exip/commit/2290f5a9a18ad3cda41581c85a0679bcd9e15a18))

## [1.10.1](https://github.com/UK-Export-Finance/exip/compare/v1.10.0...v1.10.1) (2022-09-28)


### Bug Fixes

* **EMS-379:** fix issue where buyer country form would fail if JS is disabled ([f9e5357](https://github.com/UK-Export-Finance/exip/commit/f9e5357ab7857cd4310bc2365f3d190eedc8dd98))

## [1.10.0](https://github.com/UK-Export-Finance/exip/compare/v1.9.0...v1.10.0) (2022-09-12)


### Features

* **EMS-302:** update pricing grid. Do not use policy length in multi policy calculation ([df26d55](https://github.com/UK-Export-Finance/exip/commit/df26d553749ab5a9876f1eeb7d49897836fc2a26))

## [1.9.0](https://github.com/UK-Export-Finance/exip/compare/v1.8.0...v1.9.0) (2022-09-12)


### Features

* **EMS-304:** update tell us about your policy page - credit period hint text ([4b53c9c](https://github.com/UK-Export-Finance/exip/commit/4b53c9c411a13945ab99e90b20a1436214857bd0))

* **EMS-304:** change Credit period text input to a select drop down ([4b53c9c](https://github.com/UK-Export-Finance/exip/commit/5d879e8529c34f8e5cfae56f5b847963a10f6c85))

## [1.8.0](https://github.com/UK-Export-Finance/exip/compare/v1.7.4...v1.8.0) (2022-09-12)


### Features

* **EMS-301:** answers list conditionally rendering change links. Remove all change links from policy length instances if policy type is multi. Use fixed/default policy length value ([7ebef7d](https://github.com/UK-Export-Finance/exip/commit/7ebef7d8b2a57e83e1b5b0fefebd0ed25ba05606))
* **EMS-301:** fix e2e test ([a517df2](https://github.com/UK-Export-Finance/exip/commit/a517df2f211732e65c999ea8a4dec91f77fcbd96))
* **EMS-301:** remove unused import ([8c42a78](https://github.com/UK-Export-Finance/exip/commit/8c42a78a556a6096cd8943ac8b25e26f963f3106))
* **EMS-301:** replace multi policy length input with default value. Add multi policy conditional inset. Update required data checks ([13d7686](https://github.com/UK-Export-Finance/exip/commit/13d768660247f51c2e94b20af19cb1ff4b6753a8))
* **EMS-301:** update e2e tests for multi policy length changes (no change link, default value) ([02da76b](https://github.com/UK-Export-Finance/exip/commit/02da76bc024bfa946fb17ba144e5f152b7209862))

## [1.7.3](https://github.com/UK-Export-Finance/exip/compare/v1.7.2...v1.7.3) (2022-09-07)


### Bug Fixes

* **EMS-299:** before you start external link ([ef38d56](https://github.com/UK-Export-Finance/exip/commit/ef38d56a805a21a2aea9ea4c0919e75ed15272af))

## [1.7.2](https://github.com/UK-Export-Finance/exip/compare/v1.7.1...v1.7.2) (2022-09-02)


### Bug Fixes

* **EMS-248:** update external guidance/application links ([92887c3](https://github.com/UK-Export-Finance/exip/commit/92887c358ca9a1c69a6ca627b279b382cecc9d46))
* **Accessibility:** Add complementary aria role/landmark to the phase banner ([ac9c3a1](https://github.com/UK-Export-Finance/exip/commit/ac9c3a10756a9ae77180340e0bb8e97ff5cef0ad))
* **Accessibility:** Remove empty/outdated "company group" details being generated on the Answers page ([c8bfc12](https://github.com/UK-Export-Finance/exip/commit/c8bfc1276d2cdfb42ce2af2c2d24a79ae3d2d30f))

## [1.7.1](https://github.com/UK-Export-Finance/exip/compare/v1.7.0...v1.7.1) (2022-08-30)


### Bug Fixes

* **EMS-289:** fix NBI link in 'get a quote by email' page ([bf07eef](https://github.com/UK-Export-Finance/exip/commit/bf07eef575fb056275046bb62cfdd63c2e658e2b))

## [1.7.0](https://github.com/UK-Export-Finance/exip/compare/v1.6.2...v1.7.0) (2022-08-25)


### Features

* **EMS-289:** add "buyer body" page/flow ([#93](https://github.com/UK-Export-Finance/exip/issues/93)) ([071e3f1](https://github.com/UK-Export-Finance/exip/commit/071e3f17ff6f5a29abe1522929ef522f56a214a1))

## [1.6.2](https://github.com/UK-Export-Finance/exip/compare/v1.6.1...v1.6.2) (2022-08-22)


### Bug Fixes

* **deps:** bump govuk-frontend ([1145bbd](https://github.com/UK-Export-Finance/exip/commit/1145bbdafda94a6cebb5837b4627a5fd727e180d))

## [1.6.1](https://github.com/UK-Export-Finance/exip/compare/v1.6.0...v1.6.1) (2022-08-22)


### Bug Fixes

* **EMS-95:** add 'problem with service' page to list of routes that do not require session data checks ([ac76d7d](https://github.com/UK-Export-Finance/exip/commit/ac76d7dbe1462746ce617a85b0be5930068c9dcf))

## [1.6.0](https://github.com/UK-Export-Finance/exip/compare/v1.5.0...v1.6.0) (2022-08-19)


### Features

* **EMS-232:** 'get a quote by email' exit page for countries with certain fields/flags. Refactor the way country support is checked ([74478b0](https://github.com/UK-Export-Finance/exip/commit/74478b0842948725f9896e9afd5f30f376ca876b))

## [1.5.0](https://github.com/UK-Export-Finance/exip/compare/v1.4.2...v1.5.0) (2022-08-18)


### Features

* **EMS-287:** split up routes, controllers, constants and templates into root & quote structure ([#86](https://github.com/UK-Export-Finance/exip/issues/86)) ([1faba4e](https://github.com/UK-Export-Finance/exip/commit/1faba4ecd623ef32137b9087b584093bd44f89c5))


* **EMS-95:** prevent users from manually navigating to a page if the previous, required forms have not been completed ([#84](https://github.com/UK-Export-Finance/exip/issues/84)) ([8ffac35](https://github.com/UK-Export-Finance/exip/commit/8ffac356d507bcbef8564b475ecb9cbcff247b13))
