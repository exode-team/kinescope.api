/**
 * Kinescope API connector
 */
export class Kinescope {
    /**
     * Kinescope API endpoint for upload video
     */
    private readonly apiUrUpload: string;

    /**
     * Kinescope API endpoint for get parent_id
     */
    private readonly apiUrl: string;


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
        this.apiUrl = 'https://uploader.kinescope.io/v2/video';
        this.apiUrl = 'https://api.kinescope.io/v1/'
        this.token = token
    }

    /**
     * Get Parent_Id from Kinescope
     *
     * @param params - params for Init method except TerminalKey and Token
     */

    async getParentId() {
        const options = {
            method: 'GET',
            url: this.apiUrl + 'projects',
            params: { per_page: '100', catalog_type: 'vod' },
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.token,
            },
        };

        try {
            const { data } = await axios.request(options);

            return data;
        } catch (error) {
            return error;
        }
    }

    async uploadFile(file: File, title: string, parentId: string) {
        const options = {
            method: 'POST',
            url: this.apiUrUpload,
            headers: {
                'Content-Type': 'application/octet-stream',
                'X-Parent-Id': parentId,
                'X-Video-Title': title,
                Authorization: 'Bearer ' + this.token,
            },
            body: file
        };

        try {
            const { data } = await axios.request(options);

            return data;
        } catch (error) {
            return error;
        }
    }

}
