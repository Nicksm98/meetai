import "server-only"

import { StreamClient } from "@stream-io/node-sdk";

let streamVideoClient: StreamClient | null = null;

export const getStreamVideo = () => {
    if (streamVideoClient) {
        return streamVideoClient;
    }

    const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
    const secretKey = process.env.STREAM_VIDEO_SECRET_KEY;

    if (!apiKey || !secretKey) {
        throw new Error(
            "Missing Stream Video env vars: NEXT_PUBLIC_STREAM_VIDEO_API_KEY and STREAM_VIDEO_SECRET_KEY"
        );
    }

    streamVideoClient = new StreamClient(apiKey, secretKey);
    return streamVideoClient;
};