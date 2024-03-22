/**
 * Upload video by file response type
 *
 * @author: exode <hello@exode.ru>
 */

interface VideoKinescopeResponse {
    id: string,
    parent_id: string,
    title: string,
    description: string,
    status: string,
    play_link: string,
    embed_link: string,
    hls_link: string,
    created_at: string
}
export interface UploadVideoByFileResponse {
    data: VideoKinescopeResponse
}


export interface UploadVideoByUrlResponse {
    data: VideoKinescopeResponse
}
