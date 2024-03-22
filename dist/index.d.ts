/**
 * Kinescope API connector
 *
 * @author: exode <hello@exode.ru>
 */
import { UploadVideoByFileResponse, UploadVideoByUrlResponse } from './types';
export declare class KinescopeApi {
    /**
     * Kinescope API endpoint
     */
    private readonly apiUrl;
    /**
     * Timeout for request
     */
    private readonly timeout;
    /**
     * Kinescope token
     */
    private readonly token;
    /**
     * Constructor
     *
     * @param token - kinescope token
     */
    constructor(token: string);
    private commonRequestHeaders;
    /**
     * Make request to Kinescope API
     * @param {AxiosRequestConfig<any>} config
     * @param {'video'} method
     * @param payload
     * @returns {Promise<T>}
     * @private
     */
    private makeRequest;
    /**
     * Upload video by file
     * @param file - Video file
     * @param title - Title of video
     * @param parentId - ID of the project or folder to upload the video to.
     */
    uploadVideoByFile(file: File, title: string, parentId: string): Promise<UploadVideoByFileResponse>;
    /**
     * Upload video by url
     * @param url - Video url
     * @param title - Title of video
     * @param parentId - ID of the project or folder to upload the video to.
     */
    uploadVideoByUrl(url: string, title: string, parentId: string): Promise<UploadVideoByUrlResponse>;
}
