/**
 * Kinescope API connector
 *
 * @author: exode <hello@exode.ru>
 */

import axios, { AxiosRequestConfig } from 'axios';

import { UploadVideoByFileResponse, UploadVideoByUrlResponse } from './types';


export class KinescopeApi {

    /**
     * Kinescope API endpoint
     */
    private readonly apiUrl: string;

    /**
     * Timeout for request
     */
    private readonly timeout: number;

    /**
     * Kinescope token
     */
    private readonly token: string;

    /**
     * Constructor
     *
     * @param token - kinescope token
     */
    constructor(token: string) {
        // Api endpoint
        this.apiUrl = 'https://uploader.kinescope.io/v2';

        // Access timeout in milliseconds (10 seconds)
        this.timeout = 10000;

        this.token = token;
    }

    private commonRequestHeaders(
        title: string,
        parentId: string,
    ) {
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
    private async makeRequest(
        config: AxiosRequestConfig<any>,
        method: 'video' = 'video',
        payload?: any,
    ) {
        const { data, status } = await axios.post(
            `${this.apiUrl}/${method}`,
            payload,
            config,
        );

        if (status !== 200) {
            throw new Error(
                `[Error code is ${status}] ${JSON.stringify(data)}`,
            );
        }

        return data;
    }

    /**
     * Upload video by file
     * @param file - Video file
     * @param title - Title of video
     * @param parentId - ID of the project or folder to upload the video to.
     */
    async uploadVideoByFile(
        file: File,
        title: string,
        parentId: string,
    ) {
        return await this.makeRequest({
            headers: {
                'Content-Type': 'application/octet-stream',
                ...this.commonRequestHeaders(title, parentId),
            },
        }) as UploadVideoByFileResponse;
    }

    /**
     * Upload video by url
     * @param url - Video url
     * @param title - Title of video
     * @param parentId - ID of the project or folder to upload the video to.
     */
    async uploadVideoByUrl(
        url: string,
        title: string,
        parentId: string,
    ) {
        return await this.makeRequest({
            headers: {
                'X-Video-URL': url,
                ...this.commonRequestHeaders(title, parentId),
            },
        }) as UploadVideoByUrlResponse;
    }

}
