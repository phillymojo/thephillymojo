module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0XCI/M2M2MiJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInJlYWN0XCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-router-dom\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LXJvdXRlci1kb21cIj8wOTU2Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJvdXRlci1kb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1yb3V0ZXItZG9tXCJcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/*!**********************************!*\
  !*** ./src/components/Morgan.js ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Morgan = undefined;\n\nvar _react = __webpack_require__(/*! react */ 0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ 1);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Morgan = exports.Morgan = function Morgan(_ref) {\n  var match = _ref.match;\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      'div',\n      null,\n      'Morgan'\n    ),\n    _react2.default.createElement(\n      _reactRouterDom.Link,\n      { to: match.url + '/work' },\n      'Work'\n    ),\n    _react2.default.createElement(\n      _reactRouterDom.Link,\n      { to: match.url + '/school' },\n      'School'\n    )\n  );\n};\n\nexports.default = Morgan;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9Nb3JnYW4uanM/MGQ5YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5leHBvcnQgY29uc3QgTW9yZ2FuID0gKHsgbWF0Y2ggfSkgPT4gKFxuICA8ZGl2PlxuICAgIDxkaXY+TW9yZ2FuPC9kaXY+XG4gICAgPExpbmsgdG89e2Ake21hdGNoLnVybH0vd29ya2B9Pldvcms8L0xpbms+XG4gICAgPExpbmsgdG89e2Ake21hdGNoLnVybH0vc2Nob29sYH0+U2Nob29sPC9MaW5rPlxuICA8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgTW9yZ2FuO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9Nb3JnYW4uanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSEE7QUFEQTtBQUNBO0FBT0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2\n");

/***/ }),
/* 3 */
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _path = __webpack_require__(/*! path */ 4);\n\nvar _path2 = _interopRequireDefault(_path);\n\nvar _http = __webpack_require__(/*! http */ 5);\n\nvar _express = __webpack_require__(/*! express */ 6);\n\nvar _express2 = _interopRequireDefault(_express);\n\nvar _react = __webpack_require__(/*! react */ 0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _server = __webpack_require__(/*! react-dom/server */ 7);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ 1);\n\nvar _App = __webpack_require__(/*! ./components/App */ 8);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar app = new _express2.default(); /* eslint no-console: \"off\" */\n\nvar server = new _http.Server(app);\n\n// use ejs templates\napp.set('view engine', 'ejs');\napp.set('views', _path2.default.join(__dirname, 'views'));\n\n// define the folder that will be used for static assets\napp.use(_express2.default.static(_path2.default.join(__dirname, 'static')));\n\n// universal routing and rendering\napp.get('*', function (req, res) {\n  var markup = '';\n  var status = 200;\n\n  if (process.env.UNIVERSAL) {\n    var context = {};\n    markup = (0, _server.renderToString)(_react2.default.createElement(\n      _reactRouterDom.StaticRouter,\n      { location: req.url, context: context },\n      _react2.default.createElement(_App.App, null)\n    ));\n    // context.url will contain the URL to redirect to if a <Redirect> was used\n    if (context.url) {\n      return res.redirect(302, context.url);\n    }\n\n    if (context.is404) {\n      status = 404;\n    }\n  }\n\n  return res.status(status).render('index', { markup: markup });\n});\n\n// start the server\nvar port = process.env.PORT || 3000;\nvar env = process.env.NODE_ENV || 'production';\nserver.listen(port, function (err) {\n  if (err) {\n    return console.error(err);\n  }\n  return console.info('\\n      Server running on http://localhost:' + port + ' [' + env + ']\\n      Universal rendering: ' + (process.env.UNIVERSAL ? 'enabled' : 'disabled') + '\\n    ');\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvc2VydmVyLmpzP2U2YTUiXSwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50IG5vLWNvbnNvbGU6IFwib2ZmXCIgKi9cblxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBTZXJ2ZXIgfSBmcm9tICdodHRwJztcbmltcG9ydCBFeHByZXNzIGZyb20gJ2V4cHJlc3MnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcic7XG5pbXBvcnQgeyBTdGF0aWNSb3V0ZXIgYXMgUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBBcHAgfSBmcm9tICcuL2NvbXBvbmVudHMvQXBwJztcblxuY29uc3QgYXBwID0gbmV3IEV4cHJlc3MoKTtcbmNvbnN0IHNlcnZlciA9IG5ldyBTZXJ2ZXIoYXBwKTtcblxuLy8gdXNlIGVqcyB0ZW1wbGF0ZXNcbmFwcC5zZXQoJ3ZpZXcgZW5naW5lJywgJ2VqcycpO1xuYXBwLnNldCgndmlld3MnLCBwYXRoLmpvaW4oX19kaXJuYW1lLCAndmlld3MnKSk7XG5cbi8vIGRlZmluZSB0aGUgZm9sZGVyIHRoYXQgd2lsbCBiZSB1c2VkIGZvciBzdGF0aWMgYXNzZXRzXG5hcHAudXNlKEV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsICdzdGF0aWMnKSkpO1xuXG4vLyB1bml2ZXJzYWwgcm91dGluZyBhbmQgcmVuZGVyaW5nXG5hcHAuZ2V0KCcqJywgKHJlcSwgcmVzKSA9PiB7XG4gIGxldCBtYXJrdXAgPSAnJztcbiAgbGV0IHN0YXR1cyA9IDIwMDtcblxuICBpZiAocHJvY2Vzcy5lbnYuVU5JVkVSU0FMKSB7XG4gICAgY29uc3QgY29udGV4dCA9IHt9O1xuICAgIG1hcmt1cCA9IHJlbmRlclRvU3RyaW5nKFxuICAgICAgPFJvdXRlciBsb2NhdGlvbj17cmVxLnVybH0gY29udGV4dD17Y29udGV4dH0+XG4gICAgICAgIDxBcHAgLz5cbiAgICAgIDwvUm91dGVyPixcbiAgICApO1xuICAgIC8vIGNvbnRleHQudXJsIHdpbGwgY29udGFpbiB0aGUgVVJMIHRvIHJlZGlyZWN0IHRvIGlmIGEgPFJlZGlyZWN0PiB3YXMgdXNlZFxuICAgIGlmIChjb250ZXh0LnVybCkge1xuICAgICAgcmV0dXJuIHJlcy5yZWRpcmVjdCgzMDIsIGNvbnRleHQudXJsKTtcbiAgICB9XG5cbiAgICBpZiAoY29udGV4dC5pczQwNCkge1xuICAgICAgc3RhdHVzID0gNDA0O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXMuc3RhdHVzKHN0YXR1cykucmVuZGVyKCdpbmRleCcsIHsgbWFya3VwIH0pO1xufSk7XG5cbi8vIHN0YXJ0IHRoZSBzZXJ2ZXJcbmNvbnN0IHBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IDMwMDA7XG5jb25zdCBlbnYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViB8fCAncHJvZHVjdGlvbic7XG5zZXJ2ZXIubGlzdGVuKHBvcnQsIChlcnIpID0+IHtcbiAgaWYgKGVycikge1xuICAgIHJldHVybiBjb25zb2xlLmVycm9yKGVycik7XG4gIH1cbiAgcmV0dXJuIGNvbnNvbGUuaW5mbyhcbiAgICBgXG4gICAgICBTZXJ2ZXIgcnVubmluZyBvbiBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH0gWyR7ZW52fV1cbiAgICAgIFVuaXZlcnNhbCByZW5kZXJpbmc6ICR7cHJvY2Vzcy5lbnYuVU5JVkVSU0FMID8gJ2VuYWJsZWQnIDogJ2Rpc2FibGVkJ31cbiAgICBgKTtcbn0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9zZXJ2ZXIuanMiXSwibWFwcGluZ3MiOiI7O0FBRUE7QUFDQTs7O0FBQUE7QUFDQTtBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///3\n");

/***/ }),
/* 4 */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIj81YjJhIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXRoXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///4\n");

/***/ }),
/* 5 */
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBcIj84ZTQ0Il0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJodHRwXCJcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///5\n");

/***/ }),
/* 6 */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIj9kMmQyIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJleHByZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///6\n");

/***/ }),
/* 7 */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9leHRlcm5hbCBcInJlYWN0LWRvbS9zZXJ2ZXJcIj80MWJkIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWRvbS9zZXJ2ZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJyZWFjdC1kb20vc2VydmVyXCJcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///7\n");

/***/ }),
/* 8 */
/*!*******************************!*\
  !*** ./src/components/App.js ***!
  \*******************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.App = undefined;\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n// import { Homepage } from './Homepage';\n// import { Morgan } from './Morgan';\n// import { Renata } from './Renata';\n\nvar _react = __webpack_require__(/*! react */ 0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ 1);\n\nvar _Layout = __webpack_require__(/*! ./Layout */ 9);\n\nvar _routes = __webpack_require__(/*! ../routes */ 10);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar App = exports.App = function App() {\n  return _react2.default.createElement(\n    _Layout.Layout,\n    null,\n    _routes.routes.map(function (route, index) {\n      return _react2.default.createElement(_reactRouterDom.Route, _extends({\n        key: index\n      }, route));\n    })\n  );\n};\n\nexports.default = App;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9BcHAuanM/NTdhYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUm91dGUsIFN3aXRjaCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgTGF5b3V0IH0gZnJvbSAnLi9MYXlvdXQnO1xuLy8gaW1wb3J0IHsgSG9tZXBhZ2UgfSBmcm9tICcuL0hvbWVwYWdlJztcbi8vIGltcG9ydCB7IE1vcmdhbiB9IGZyb20gJy4vTW9yZ2FuJztcbi8vIGltcG9ydCB7IFJlbmF0YSB9IGZyb20gJy4vUmVuYXRhJztcblxuaW1wb3J0IHsgcm91dGVzIH0gZnJvbSAnLi4vcm91dGVzJztcblxuZXhwb3J0IGNvbnN0IEFwcCA9ICgpID0+IChcbiAgPExheW91dD5cbiAgICB7cm91dGVzLm1hcCgocm91dGUsaW5kZXgpID0+IChcbiAgICAgICAgPFJvdXRlXG4gICAgICAgICAga2V5PXtpbmRleH0gXG4gICAgICAgICAgey4uLnJvdXRlfVxuICAgICAgICAvPiAgICAgIFxuICAgICAgKVxuICAgICl9XG4gIDwvTGF5b3V0PlxuKTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9BcHAuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUVBO0FBREE7QUFEQTtBQURBO0FBREE7QUFDQTtBQVdBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///8\n");

/***/ }),
/* 9 */
/*!**********************************!*\
  !*** ./src/components/Layout.js ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Layout = undefined;\n\nvar _react = __webpack_require__(/*! react */ 0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ 1);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Layout = exports.Layout = function Layout(props) {\n  return _react2.default.createElement(\n    'div',\n    { className: 'app-container' },\n    _react2.default.createElement(\n      'header',\n      null,\n      _react2.default.createElement(\n        'h2',\n        null,\n        'The PhillyMojo'\n      )\n    ),\n    _react2.default.createElement(\n      'div',\n      { className: 'app-content' },\n      props.children\n    ),\n    _react2.default.createElement(\n      'footer',\n      null,\n      _react2.default.createElement(\n        _reactRouterDom.Link,\n        { to: '/' },\n        'Homepage'\n      )\n    )\n  );\n};\n\nexports.default = Layout;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9zcmMvY29tcG9uZW50cy9MYXlvdXQuanM/N2YwYyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5leHBvcnQgY29uc3QgTGF5b3V0ID0gcHJvcHMgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImFwcC1jb250YWluZXJcIj5cbiAgICA8aGVhZGVyPlxuICAgICAgPGgyPlRoZSBQaGlsbHlNb2pvPC9oMj5cbiAgICA8L2hlYWRlcj5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cImFwcC1jb250ZW50XCI+e3Byb3BzLmNoaWxkcmVufTwvZGl2PlxuICAgIDxmb290ZXI+XG4gICAgICA8TGluayB0bz17YC9gfT5Ib21lcGFnZTwvTGluaz5cbiAgICA8L2Zvb3Rlcj5cbiAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IExheW91dDtcblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHNyYy9jb21wb25lbnRzL0xheW91dC5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFEQTtBQUxBO0FBREE7QUFDQTtBQVdBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///9\n");

/***/ }),
/* 10 */
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.routes = undefined;\n\nvar _react = __webpack_require__(/*! react */ 0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _Morgan = __webpack_require__(/*! ./components/Morgan */ 2);\n\nvar _Morgan2 = _interopRequireDefault(_Morgan);\n\nvar _Renata = __webpack_require__(/*! ./components/Renata */ 11);\n\nvar _Renata2 = _interopRequireDefault(_Renata);\n\nvar _Homepage = __webpack_require__(/*! ./components/Homepage */ 12);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar routes = exports.routes = [{\n  path: \"/\",\n  exact: true,\n  component: _Homepage.Homepage\n}, {\n  path: \"/morgan\",\n  component: _Morgan2.default\n}, {\n  path: \"/morgan/work\",\n  component: function component() {\n    return _react2.default.createElement(\n      'div',\n      null,\n      'Nike'\n    );\n  }\n}, {\n  path: \"/morgan/school\",\n  component: function component() {\n    return _react2.default.createElement(\n      'div',\n      null,\n      'Penn State'\n    );\n  }\n}, {\n  path: \"/renata\",\n  component: _Renata2.default\n}];\n\nexports.default = routes;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTAuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL3JvdXRlcy5qcz8zY2E1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgTW9yZ2FuIGZyb20gJy4vY29tcG9uZW50cy9Nb3JnYW4nO1xuaW1wb3J0IFJlbmF0YSBmcm9tICcuL2NvbXBvbmVudHMvUmVuYXRhJztcbmltcG9ydCB7IEhvbWVwYWdlIH0gZnJvbSAnLi9jb21wb25lbnRzL0hvbWVwYWdlJztcblxuZXhwb3J0IGNvbnN0IHJvdXRlcyA9IFtcbiAge1xuICAgIHBhdGg6IFwiL1wiLFxuICAgIGV4YWN0OiB0cnVlLFxuICAgIGNvbXBvbmVudDogSG9tZXBhZ2VcbiAgfSxcbiAge1xuICAgIHBhdGg6IFwiL21vcmdhblwiLFxuICAgIGNvbXBvbmVudDogTW9yZ2FuLFxuICB9LFxuICB7XG4gICAgcGF0aDogXCIvbW9yZ2FuL3dvcmtcIixcbiAgICBjb21wb25lbnQ6ICgpID0+IDxkaXY+TmlrZTwvZGl2PlxuICB9LFxuICB7XG4gICAgcGF0aDogXCIvbW9yZ2FuL3NjaG9vbFwiLFxuICAgIGNvbXBvbmVudDogKCkgPT4gPGRpdj5QZW5uIFN0YXRlPC9kaXY+XG4gIH0sXG4gIHtcbiAgICBwYXRoOiBcIi9yZW5hdGFcIixcbiAgICBjb21wb25lbnQ6IFJlbmF0YVxuICB9XG5dXG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcztcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL3JvdXRlcy5qcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFNQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFLQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRkE7QUFLQTtBQUNBO0FBRkE7QUFDQTtBQUtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///10\n");

/***/ }),
/* 11 */
/*!**********************************!*\
  !*** ./src/components/Renata.js ***!
  \**********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Renata = undefined;\n\nvar _react = __webpack_require__(/*! react */ 0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Renata = exports.Renata = function Renata() {\n  return _react2.default.createElement(\n    'div',\n    null,\n    'Renata'\n  );\n};\n\nexports.default = Renata;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTEuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvUmVuYXRhLmpzPzI4NDQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IGNvbnN0IFJlbmF0YSA9ICgpID0+IChcbiAgPGRpdj5SZW5hdGE8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgUmVuYXRhO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBzcmMvY29tcG9uZW50cy9SZW5hdGEuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQURBO0FBQ0E7QUFHQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///11\n");

/***/ }),
/* 12 */
/*!************************************!*\
  !*** ./src/components/Homepage.js ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.Homepage = undefined;\n\nvar _react = __webpack_require__(/*! react */ 0);\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ 1);\n\nvar _Morgan = __webpack_require__(/*! ./Morgan */ 2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Homepage = exports.Homepage = function Homepage() {\n  return _react2.default.createElement(\n    'div',\n    null,\n    _react2.default.createElement(\n      'div',\n      null,\n      'Homepage'\n    ),\n    _react2.default.createElement(\n      _reactRouterDom.Link,\n      { to: '/morgan' },\n      'Morgan'\n    ),\n    _react2.default.createElement(\n      _reactRouterDom.Link,\n      { to: '/renata' },\n      'Renata'\n    )\n  );\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTIuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvSG9tZXBhZ2UuanM/MjdjNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUm91dGUsIFN3aXRjaCwgTGlua30gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgeyBNb3JnYW4gfSBmcm9tICcuL01vcmdhbic7XG5cblxuZXhwb3J0IGNvbnN0IEhvbWVwYWdlID0gKCkgPT4gKFxuICA8ZGl2PlxuICAgIDxkaXY+SG9tZXBhZ2U8L2Rpdj5cbiAgICA8TGluayB0bz17YC9tb3JnYW5gfT5Nb3JnYW48L0xpbms+XG4gICAgPExpbmsgdG89e2AvcmVuYXRhYH0+UmVuYXRhPC9MaW5rPlxuICA8L2Rpdj5cbilcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gc3JjL2NvbXBvbmVudHMvSG9tZXBhZ2UuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFIQTtBQURBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///12\n");

/***/ })
/******/ ]);