import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export const searchImages = async (query: string, page = 1, perPage = 10) => {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: { query, page, per_page: perPage },
        headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
    });

    return response.data.results.map((image: any) => ({
        id: image.id,
        width: image.width,
        height: image.height,
        description: image.description || image.alt_description || "",
        urls: image.urls,
    }));
};
