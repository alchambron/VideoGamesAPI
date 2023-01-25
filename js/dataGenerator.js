import { fetchAll } from "./fetch";
import { getAPILinkHome, getApiLinkDetail, getVideoLink, getScreenshotLink, getStoreLink, getSearchLink} from "./linkGenerator";

export async function getHomeGamesData(size) {
  const GamesData = await fetchAll(getAPILinkHome(size));
  return GamesData;
}

export async function getDetailGamesData(arg) {
  const GamesData = await fetchAll(getApiLinkDetail(arg));
  return GamesData;
}

export async function getVideoTrailerData(id){
  const trailerData = await fetchAll(getVideoLink(id));
  return trailerData;
}

export async function getScreenshotData(slug){
  const screenshotsData = await fetchAll(getScreenshotLink(slug));
  return screenshotsData;
}

export async function getStoresData(slug){
  const storeData = await fetchAll(getStoreLink(slug));
  return storeData;
}

export async function getSearchData(input, pages){
  const searchData = await fetchAll(getSearchLink(input, pages));
  return searchData
}