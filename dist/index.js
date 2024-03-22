/**
 * Kinescope API connector
 *
 * @author: exode <hello@exode.ru>
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "axios"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KinescopeApi = void 0;
    const axios_1 = __importDefault(require("axios"));
    class KinescopeApi {
        /**
         * Constructor
         *
         * @param token - kinescope token
         */
        constructor(token) {
            // Api endpoint
            this.apiUrl = 'https://uploader.kinescope.io/v2';
            // Access timeout in milliseconds (10 seconds)
            this.timeout = 10000;
            this.token = token;
        }
        commonRequestHeaders(title, parentId) {
            return {
                'X-Parent-Id': parentId,
                'X-Video-Title': title,
                Authorization: `Bearer ${this.token}`,
            };
        }
        /**
         * Make request to Kinescope API
         * @param {AxiosRequestConfig<any>} config
         * @param {'video'} method
         * @param payload
         * @returns {Promise<T>}
         * @private
         */
        makeRequest(config_1) {
            return __awaiter(this, arguments, void 0, function* (config, method = 'video', payload) {
                const { data, status } = yield axios_1.default.post(`${this.apiUrl}/${method}`, payload, config);
                if (status !== 200) {
                    throw new Error(`[Error code is ${status}] ${JSON.stringify(data)}`);
                }
                return data;
            });
        }
        /**
         * Upload video by file
         * @param file - Video file
         * @param title - Title of video
         * @param parentId - ID of the project or folder to upload the video to.
         */
        uploadVideoByFile(file, title, parentId) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.makeRequest({
                    headers: Object.assign({ 'Content-Type': 'application/octet-stream' }, this.commonRequestHeaders(title, parentId)),
                });
            });
        }
        /**
         * Upload video by url
         * @param url - Video url
         * @param title - Title of video
         * @param parentId - ID of the project or folder to upload the video to.
         */
        uploadVideoByUrl(url, title, parentId) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield this.makeRequest({
                    headers: Object.assign({ 'X-Video-URL': url }, this.commonRequestHeaders(title, parentId)),
                });
            });
        }
    }
    exports.KinescopeApi = KinescopeApi;
});
