declare type ApiResponse<H> = {
    statusCode?: string,
    message?: string
    content?: H
}