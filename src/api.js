import axios from "axios";

const api = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    params: {
        api_key: "1afe4125f9fe1ed994f1e5514d597c47",
        language: "en-US"
    }
});

export const TVApi = {
    topRated: () => api.get("tv/top_rated"),
    popular: () => api.get("tv/popular"),
    airingToday: () => api.get("tv/airing_today"),
    showDetail: id => api.get(`tv/${id}`, {
        params: {
            append_to_response: "videos"
        }
    }),
    search: term => api.get("search/movie", {
        params: {
            query: encodeURIComponent(term)
        }
    })
};

export const MoviesApi = {
    nowPlaying: () => api.get("movie/now_playing"),
    upcoming: () => api.get("movie/upcoming"),
    popular: () => api.get("movie/popular"),
    movieDetail: id => api.get(`movie/${id}` , {
        params: {
            append_to_response: "videos"
        }
    }),
    search: term => api.get("search/tv", {
        params: {
            qurey: encodeURIComponent(term)
        }
    })
};