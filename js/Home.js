import { getHomeGamesData } from "./dataGenerator";

const home = document.querySelector("#home");
const homePage = document.querySelector("#home-page");
const detail = document.querySelector("#detail");
const list = document.querySelector("#list")
const showMore = document.querySelector("#show-more");
let numberPages = 9;

export const Home = (argument = "") => {
  list.style.display = "none"
  detail.style.display = "none"
  homePage.style.display = "block"
  home.style.display = "grid"
  displayHomeGamesData(numberPages);
};

async function displayHomeGamesData(size) {
  const GamesData = await getHomeGamesData(size);
  let content = "";
  GamesData.results.forEach(async (element) => {
    const platform = await getGamePlatform(element.parent_platforms);
    content += `
    <div class="element">
    <img src="${element.background_image}" class="hover-image w-100"></img>
    <h3 class="title">${element.name}</h3>
      <div> 
        ${platform}
      </div>
    <a class="w-100" href="#pagedetail/${element.slug}">En savoir plus</a>
    </div>
    `;
    home.innerHTML = content;
  });
}

export async function getGamePlatform(data) {
  let content = "";
  const platform = {
    playstation: `src="../assets/ps4.svg"`,
    xbox: `src="../assets/xbox.svg"`,
    nintendo: `src="../assets/switch.svg"`,
    pc: `src="../assets/windows.svg"`,
    ios: `src="../assets/mobile.svg"`,
  };
  data.forEach(async (element) => {
    content += `<img class="icon" ${platform[element.platform.slug]}></img>`;
  });
  return content;
}

showMore.addEventListener("click", () => {
  if (numberPages < 26) {
    displayHomeGamesData((numberPages += 9));
  }
  if (numberPages == 27){
    showMore.style.display = "none"
  }
});
