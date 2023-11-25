"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./src/__fake-api__/auth-api.ts":
/*!**************************************!*\
  !*** ./src/__fake-api__/auth-api.ts ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"authApi\": function() { return /* binding */ authApi; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swc/helpers/src/_async_to_generator.mjs */ \"./node_modules/@swc/helpers/src/_async_to_generator.mjs\");\n/* harmony import */ var _swc_helpers_src_class_call_check_mjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swc/helpers/src/_class_call_check.mjs */ \"./node_modules/@swc/helpers/src/_class_call_check.mjs\");\n/* harmony import */ var _swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swc/helpers/src/_ts_generator.mjs */ \"./node_modules/@swc/helpers/src/_ts_generator.mjs\");\n/* harmony import */ var _utils_create_resource_id__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/create-resource-id */ \"./src/utils/create-resource-id.ts\");\n/* harmony import */ var _utils_jwt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/jwt */ \"./src/utils/jwt.ts\");\n/* harmony import */ var _utils_wait__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/wait */ \"./src/utils/wait.ts\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\n\n\nvar users = [\n    {\n        id: \"5e86809283e28b96d2d38537\",\n        avatar: \"/static/mock-images/avatars/avatar-anika_visser.png\",\n        email: \"demo@devias.io\",\n        name: \"Anika Visser\",\n        password: \"Password123!\",\n        plan: \"Premium\"\n    }\n];\nvar AuthApi = /*#__PURE__*/ function() {\n    \"use strict\";\n    function AuthApi() {\n        (0,_swc_helpers_src_class_call_check_mjs__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(this, AuthApi);\n    }\n    var _proto = AuthApi.prototype;\n    _proto.login = function login(param) {\n        var email = param.email, password = param.password;\n        return (0,_swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(function() {\n            return (0,_swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(this, function(_state) {\n                switch(_state.label){\n                    case 0:\n                        return [\n                            4,\n                            (0,_utils_wait__WEBPACK_IMPORTED_MODULE_2__.wait)(500)\n                        ];\n                    case 1:\n                        _state.sent();\n                        return [\n                            2,\n                            new Promise(function(resolve, reject) {\n                                try {\n                                    axios__WEBPACK_IMPORTED_MODULE_3___default().post(\"http://127.0.0.1:8000/api/login\", {\n                                        email: email,\n                                        password: password\n                                    }).then(function(data) {\n                                        return console.log(data);\n                                    });\n                                // const data = response.json();\n                                // Find the user\n                                // const user = users.find((_user) => _user.email === email);\n                                //\n                                // if (!user || (user.password !== password)) {\n                                //   reject(new Error('Please check your email and password'));\n                                //   return;\n                                // }\n                                //\n                                // // Create the access token\n                                // const accessToken = sign(\n                                //   { userId: user.id },\n                                //   JWT_SECRET,\n                                //   { expiresIn: JWT_EXPIRES_IN }\n                                // );\n                                //\n                                // resolve(accessToken);\n                                } catch (err) {\n                                    console.error(\"[Auth Api]: \", err);\n                                    reject(new Error(\"Internal server error\"));\n                                }\n                            })\n                        ];\n                }\n            });\n        })();\n    };\n    _proto.register = function register(param) {\n        var email = param.email, name = param.name, password = param.password;\n        return (0,_swc_helpers_src_async_to_generator_mjs__WEBPACK_IMPORTED_MODULE_5__[\"default\"])(function() {\n            return (0,_swc_helpers_src_ts_generator_mjs__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(this, function(_state) {\n                switch(_state.label){\n                    case 0:\n                        return [\n                            4,\n                            (0,_utils_wait__WEBPACK_IMPORTED_MODULE_2__.wait)(1000)\n                        ];\n                    case 1:\n                        _state.sent();\n                        return [\n                            2,\n                            new Promise(function(resolve, reject) {\n                                try {\n                                    // Check if a user already exists\n                                    var user = users.find(function(_user) {\n                                        return _user.email === email;\n                                    });\n                                    if (user) {\n                                        reject(new Error(\"User already exists\"));\n                                        return;\n                                    }\n                                    user = {\n                                        id: (0,_utils_create_resource_id__WEBPACK_IMPORTED_MODULE_0__.createResourceId)(),\n                                        avatar: undefined,\n                                        email: email,\n                                        name: name,\n                                        password: password,\n                                        plan: \"Standard\"\n                                    };\n                                    users.push(user);\n                                    var accessToken = (0,_utils_jwt__WEBPACK_IMPORTED_MODULE_1__.sign)({\n                                        userId: user.id\n                                    }, _utils_jwt__WEBPACK_IMPORTED_MODULE_1__.JWT_SECRET, {\n                                        expiresIn: _utils_jwt__WEBPACK_IMPORTED_MODULE_1__.JWT_EXPIRES_IN\n                                    });\n                                    resolve(accessToken);\n                                } catch (err) {\n                                    console.error(\"[Auth Api]: \", err);\n                                    reject(new Error(\"Internal server error\"));\n                                }\n                            })\n                        ];\n                }\n            });\n        })();\n    };\n    _proto.me = function me(accessToken) {\n        return new Promise(function(resolve, reject) {\n            try {\n                // Decode access token\n                var userId = (0,_utils_jwt__WEBPACK_IMPORTED_MODULE_1__.decode)(accessToken).userId;\n                // Find the user\n                var user = users.find(function(_user) {\n                    return _user.id === userId;\n                });\n                if (!user) {\n                    reject(new Error(\"Invalid authorization token\"));\n                    return;\n                }\n                resolve({\n                    id: user.id,\n                    avatar: user.avatar,\n                    email: user.email,\n                    name: user.name,\n                    plan: user.plan\n                });\n            } catch (err) {\n                console.error(\"[Auth Api]: \", err);\n                reject(new Error(\"Internal server error\"));\n            }\n        });\n    };\n    return AuthApi;\n}();\nvar authApi = new AuthApi();\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFDTlQsRUFBRSxFQUFFb0IsSUFBSSxDQUFDcEIsRUFBRTtvQkFDWEMsTUFBTSxFQUFFbUIsSUFBSSxDQUFDbkIsTUFBTTtvQkFDbkJDLEtBQUssRUFBRWtCLElBQUksQ0FBQ2xCLEtBQUs7b0JBQ2pCQyxJQUFJLEVBQUVpQixJQUFJLENBQUNqQixJQUFJO29CQUNmRSxJQUFJLEVBQUVlLElBQUksQ0FBQ2YsSUFBSTtpQkFDaEIsQ0FBQyxDQUFDO1lBQ0wsRUFBRSxPQUFPVyxHQUFHLEVBQUU7Z0JBQ1pGLE9BQU8sQ0FBQ0csS0FBSyxDQUFDLGNBQWMsRUFBRUQsR0FBRyxDQUFDLENBQUM7Z0JBQ25DTixNQUFNLENBQUMsSUFBSVEsS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztZQUM3QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO1dBbkdHWixPQUFPO0NBb0daO0FBRU0sSUFBTXVCLE9BQU8sR0FBRyxJQUFJdkIsT0FBTyxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL19fZmFrZS1hcGlfXy9hdXRoLWFwaS50cz9mMzk0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgVXNlciB9IGZyb20gJy4uL3R5cGVzL3VzZXInO1xuaW1wb3J0IHsgY3JlYXRlUmVzb3VyY2VJZCB9IGZyb20gJy4uL3V0aWxzL2NyZWF0ZS1yZXNvdXJjZS1pZCc7XG5pbXBvcnQgeyBkZWNvZGUsIEpXVF9FWFBJUkVTX0lOLCBKV1RfU0VDUkVULCBzaWduIH0gZnJvbSAnLi4vdXRpbHMvand0JztcbmltcG9ydCB7IHdhaXQgfSBmcm9tICcuLi91dGlscy93YWl0JztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmNvbnN0IHVzZXJzOiBVc2VyW10gPSBbXG4gIHtcbiAgICBpZDogJzVlODY4MDkyODNlMjhiOTZkMmQzODUzNycsXG4gICAgYXZhdGFyOiAnL3N0YXRpYy9tb2NrLWltYWdlcy9hdmF0YXJzL2F2YXRhci1hbmlrYV92aXNzZXIucG5nJyxcbiAgICBlbWFpbDogJ2RlbW9AZGV2aWFzLmlvJyxcbiAgICBuYW1lOiAnQW5pa2EgVmlzc2VyJyxcbiAgICBwYXNzd29yZDogJ1Bhc3N3b3JkMTIzIScsXG4gICAgcGxhbjogJ1ByZW1pdW0nXG4gIH1cbl07XG5cbmNsYXNzIEF1dGhBcGkge1xuICBhc3luYyBsb2dpbih7IGVtYWlsLCBwYXNzd29yZCB9OiB7IGVtYWlsOiBzdHJpbmc7IHBhc3N3b3JkOiBzdHJpbmc7IH0pIHtcbiAgICBhd2FpdCB3YWl0KDUwMCk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXhpb3MucG9zdCgnaHR0cDovLzEyNy4wLjAuMTo4MDAwL2FwaS9sb2dpbicsIHtlbWFpbCwgcGFzc3dvcmR9KS50aGVuKGRhdGEgPT4gY29uc29sZS5sb2coZGF0YSkpO1xuICAgICAgICAvLyBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAvLyBGaW5kIHRoZSB1c2VyXG4gICAgICAgIC8vIGNvbnN0IHVzZXIgPSB1c2Vycy5maW5kKChfdXNlcikgPT4gX3VzZXIuZW1haWwgPT09IGVtYWlsKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gaWYgKCF1c2VyIHx8ICh1c2VyLnBhc3N3b3JkICE9PSBwYXNzd29yZCkpIHtcbiAgICAgICAgLy8gICByZWplY3QobmV3IEVycm9yKCdQbGVhc2UgY2hlY2sgeW91ciBlbWFpbCBhbmQgcGFzc3dvcmQnKSk7XG4gICAgICAgIC8vICAgcmV0dXJuO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vIENyZWF0ZSB0aGUgYWNjZXNzIHRva2VuXG4gICAgICAgIC8vIGNvbnN0IGFjY2Vzc1Rva2VuID0gc2lnbihcbiAgICAgICAgLy8gICB7IHVzZXJJZDogdXNlci5pZCB9LFxuICAgICAgICAvLyAgIEpXVF9TRUNSRVQsXG4gICAgICAgIC8vICAgeyBleHBpcmVzSW46IEpXVF9FWFBJUkVTX0lOIH1cbiAgICAgICAgLy8gKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gcmVzb2x2ZShhY2Nlc3NUb2tlbik7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignW0F1dGggQXBpXTogJywgZXJyKTtcbiAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignSW50ZXJuYWwgc2VydmVyIGVycm9yJykpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcmVnaXN0ZXIoe1xuICAgIGVtYWlsLFxuICAgIG5hbWUsXG4gICAgcGFzc3dvcmRcbiAgfTogeyBlbWFpbDogc3RyaW5nOyBuYW1lOiBzdHJpbmc7IHBhc3N3b3JkOiBzdHJpbmc7IH0pOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGF3YWl0IHdhaXQoMTAwMCk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgYSB1c2VyIGFscmVhZHkgZXhpc3RzXG4gICAgICAgIGxldCB1c2VyID0gdXNlcnMuZmluZCgoX3VzZXIpID0+IF91c2VyLmVtYWlsID09PSBlbWFpbCk7XG5cbiAgICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdVc2VyIGFscmVhZHkgZXhpc3RzJykpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVzZXIgPSB7XG4gICAgICAgICAgaWQ6IGNyZWF0ZVJlc291cmNlSWQoKSxcbiAgICAgICAgICBhdmF0YXI6IHVuZGVmaW5lZCxcbiAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgIHBsYW46ICdTdGFuZGFyZCdcbiAgICAgICAgfTtcblxuICAgICAgICB1c2Vycy5wdXNoKHVzZXIpO1xuXG4gICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gc2lnbihcbiAgICAgICAgICB7IHVzZXJJZDogdXNlci5pZCB9LFxuICAgICAgICAgIEpXVF9TRUNSRVQsXG4gICAgICAgICAgeyBleHBpcmVzSW46IEpXVF9FWFBJUkVTX0lOIH1cbiAgICAgICAgKTtcblxuICAgICAgICByZXNvbHZlKGFjY2Vzc1Rva2VuKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdbQXV0aCBBcGldOiAnLCBlcnIpO1xuICAgICAgICByZWplY3QobmV3IEVycm9yKCdJbnRlcm5hbCBzZXJ2ZXIgZXJyb3InKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBtZShhY2Nlc3NUb2tlbjogc3RyaW5nKTogUHJvbWlzZTxVc2VyPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIERlY29kZSBhY2Nlc3MgdG9rZW5cbiAgICAgICAgY29uc3QgeyB1c2VySWQgfSA9IGRlY29kZShhY2Nlc3NUb2tlbikgYXMgYW55O1xuXG4gICAgICAgIC8vIEZpbmQgdGhlIHVzZXJcbiAgICAgICAgY29uc3QgdXNlciA9IHVzZXJzLmZpbmQoKF91c2VyKSA9PiBfdXNlci5pZCA9PT0gdXNlcklkKTtcblxuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdJbnZhbGlkIGF1dGhvcml6YXRpb24gdG9rZW4nKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgYXZhdGFyOiB1c2VyLmF2YXRhcixcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICBuYW1lOiB1c2VyLm5hbWUsXG4gICAgICAgICAgcGxhbjogdXNlci5wbGFuXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tBdXRoIEFwaV06ICcsIGVycik7XG4gICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0ludGVybmFsIHNlcnZlciBlcnJvcicpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYXV0aEFwaSA9IG5ldyBBdXRoQXBpKCk7XG4iXSwibmFtZXMiOlsiY3JlYXRlUmVzb3VyY2VJZCIsImRlY29kZSIsIkpXVF9FWFBJUkVTX0lOIiwiSldUX1NFQ1JFVCIsInNpZ24iLCJ3YWl0IiwiYXhpb3MiLCJ1c2VycyIsImlkIiwiYXZhdGFyIiwiZW1haWwiLCJuYW1lIiwicGFzc3dvcmQiLCJwbGFuIiwiQXV0aEFwaSIsImxvZ2luIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwb3N0IiwidGhlbiIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiZXJyIiwiZXJyb3IiLCJFcnJvciIsInJlZ2lzdGVyIiwidXNlciIsImZpbmQiLCJfdXNlciIsInVuZGVmaW5lZCIsInB1c2giLCJhY2Nlc3NUb2tlbiIsInVzZXJJZCIsImV4cGlyZXNJbiIsIm1lIiwiYXV0aEFwaSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/__fake-api__/auth-api.ts\n"));

/***/ })

});