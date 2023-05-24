import axios from "axios";

export default async function searchSong(query: string, from: number) {
    const response = await axios.get(`https://www.songsterr.com/api/songs`, {
        data: {
            "site-info": {
                has_web_pro_access: 1,
                is_registered: 1,
            },
        },
        params: {
            size: 5,
            from: from,
            pattern: query,
        },
    });

    return response.data;
}
