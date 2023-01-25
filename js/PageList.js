import { getSearchData } from "./dataGenerator";
import { getGamePlatform } from "./Home";

const home = document.querySelector("#home");
const searchBar = document.querySelector("#input-search")
const list = document.querySelector("#list")
const showMore = document.querySelector("#show-more");
const details = document.querySelector("#detail")
const homePage = document.querySelector("#home-page")
let numberPages = 9;

searchBar.addEventListener("change", redirect)
async function redirect(data){
  window.location.href="#pagelist/" + data.target.value
}

export const pageList = (argument = '') => {
  home.style.display = "none"
  details.style.display = "none"
  homePage.style.display = "block"
  list.style.display = "grid"
  displaySearchData(argument, numberPages)
  showMore.addEventListener("click", () => {
  if (numberPages < 26) {
    displaySearchData(argument,(numberPages += 9));
  }
  if (numberPages == 27){
    showMore.style.display = "none"
  }
});

}

async function displaySearchData(arg, pages){
  const SearchData = await getSearchData(arg, pages);
  let content = "";
  SearchData.results.forEach(async (element) => {
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
    list.innerHTML = content
  });
}



