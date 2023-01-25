import { getDetailGamesData, getVideoTrailerData, getScreenshotData, getStoresData } from "./dataGenerator";
const home = document.querySelector("#home");
const details = document.querySelector("#detail");
const homePage = document.querySelector("#home-page")
const list = document.querySelector("#list")

export const pageDetail = (argument = "") => {
  homePage.style.display = "none"
  details.style.display = "block"
  displayGamesDetail(argument);
};

async function displayGamesDetail(arg) {
  const GamesData = await getDetailGamesData(arg);
  const videoTrailerData = await getVideoTrailerData(GamesData.slug)
  const screenshotsData = await getScreenshotData(GamesData.slug)
  const storesData = await getStoresData(GamesData.slug)


  const releasedDate = await getReleasedDate(GamesData.released);
  const devStudio = await getNameElements(GamesData.developers);
  const tags = await getNameElements(GamesData.tags)
  const genre = await getNameElements(GamesData.genres)
  const editor = await getNameElements(GamesData.publishers)
  const platform = await getPlatfform(GamesData.platforms)
  const videoTrailer = await getVideoTrailer(videoTrailerData)
  const screenshots = await getScreenshots(screenshotsData.results)
  const store = await getStores(storesData.results)

  let content = "";
  content += `
    <div class="detail__header"> 
      <img class="details-image "src="${GamesData.background_image}"></img>
      <a href="${GamesData.website}"><button> Visit Website</button></a>
    </div>

    <div class="detail__content">
    <div class="detail__content__head">
    
      <h1>${GamesData.name}</h1>
    
      <h5 class="rating">${GamesData.rating}/5 - ${GamesData.ratings_count} votes</h5>
      ${GamesData.description}
    </div>
    <div class="detail__content__infos">
    <div class="released-infos">
      <h5>Date de sortie :</h5>
      <p> ${releasedDate}</p>
    </div>
      <div class="platform-infos">
      <h5> Plateform </h5>
      <p>${platform}</p>
      </div>
      <div class="dev-infos">
      <h5> Studio de Developpement </h5>
      <p>${devStudio}</p>
      </div>
      <div class="publisher-infos">
      <h5> Editeur </h5>
      <p>${editor}</p>
      </div>
      </div>

      <div class="detail__content__tags">
        <div class="tags">
          <h5> Tags </h5>
          <p>${tags}</p>
        </div>
        <div class="genre">
          <h5> Genre </h5>
          <p>${genre}</p>
        </div>
      </div>

      <div class="detail__content__store">
        <h1> BUY </h1>
        ${store}
      </div>

      <div class="detail__content__trailer">
        <h1>Trailer </h1>
        ${videoTrailer}
      </div>

      <div class="detail__content__screenshots">
        <h1>Screenshots</h1>
        <div class="screenshots">
          ${screenshots} 
        </div>
      </div>
    </div>
    `;
  details.innerHTML = content;
}

async function getReleasedDate(data) {
  if (data !== null) {
    return data;
  } else {
    return "Date non communiqué";
  }
}

async function getNameElements(data){
  let content = [];
  data.forEach(async (element) => {
    content.push(element.name);
  });
  return content.join(', ');
}

async function getPlatfform(data){
  let content = [];
  data.forEach(async (element) => {
    content.push(element.platform.name);
  });
  return content.join(', ');
}

async function getVideoTrailer(data){
  let content = "";
  if(data.results.length > 0){
  content += `
  <video class="detail__content__trailer" controls>
  <source src="${data.results[0].data.max}" type="video/mp4">
  </video>
  `
  return content;

  } else {
    return "Trailer Vidéo Indisponible"
  }
}

async function getScreenshots(data){
  let content = "";
  for (let i = 0; i < 4; i++) {
  content += `
    <img src="${data[i].image}"></img>
  `
  };
  return content;
}

async function getStores(data){
  let content = "";
  const storeID = {
    1: "Steam",
    2: "Microsoft",
    3: "PlayStation Store",
    4: "Apple",
    5: "GoG",
    6: "Nintendo",
    7: "",
    8: "Android Play Store",
    11: "Epic Games Store"
  };

  data.forEach((element) => {
    content += `
    <a href="${element.url}">${storeID[element.store_id]}</a>
    `
  });
  return content;
}