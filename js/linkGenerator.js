import { API_KEY } from "../key";

export function getAPILinkHome(size) {
  return `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2024-12-31.2023-02-01,2023-12-31&page_size=${size}`;
}


export function getApiLinkDetail(id) {
  return `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
}

export function getVideoLink(id){
  return `https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`
}

export function getScreenshotLink(slug){
  return `https://api.rawg.io/api/games/${slug}/screenshots?key=${API_KEY}`
}

export function getStoreLink(slug){
  return `https://api.rawg.io/api/games/${slug}/stores?key=${API_KEY}`

}

export function getSearchLink(input, pages){
  return `https://api.rawg.io/api/games?key=${API_KEY}&search=${input}&page_size=${pages}`
}