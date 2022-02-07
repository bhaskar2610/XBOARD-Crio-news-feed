let getApiUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
var count = 1;

async function init() {
  for (var magazine of magazines) {
    //console.log(magazine);
    let data = await getApiFromUrl(magazine);
     console.log(data);
    addCarouselToDOM(
      data,
      `carousel-card-${count}`,
      `carousel-IDcard-${count}`,
      `carousel-inner-${count}`,
      count
    );
    count++;
  }
}

//getting the API response from here
async function getApiFromUrl(feed) {
  try {
    let data = await fetch(getApiUrl + feed);
    let resp = await data.json();
    return resp;
  } catch (err) {
    return err;
  }
}
function addCarouselToDOM(data, attachId, id, innerId,count) {
  let headingCount=document.getElementById(`heading-${count}`);
  headingCount.innerHTML=`
  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${count}" aria-expanded="true" aria-controls="collapse-${count}">
    <strong>${data.feed.title}</strong>
  </button>
  `
  let parentDiv = document.getElementById(attachId);
  parentDiv.innerHTML = `
  <div id="${id}" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" id="${innerId}">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    `;
  let innerCarousel = document.getElementById(innerId);
  data.items.forEach((item, index) => {
    let itemDiv = document.createElement("div");
    if (index == 0) itemDiv.setAttribute("class", "carousel-item active");
    else itemDiv.setAttribute("class", "carousel-item");
    // let imgForCarousel = document.createElement("img");
    // imgForCarousel.setAttribute("class", "d-block w-100");
    // imgForCarousel.setAttribute("src", `${item.enclosure.link}`);
    // imgForCarousel.setAttribute("alt", "First slide");
    // itemDiv.appendChild(imgForCarousel);
   // let date=new Date(element.pubDate).toLocaleDateString();
    itemDiv.innerHTML=`
    <div class="card">
    <a class="card-link" href="${item.link}"><img src="${item.enclosure.link}" class="card-img-top" alt="..."></a>
    <div class="card-body">
      <h4>${item.title}</h4>
      <div class="details">
        <p>by ${item.author} <span>.</span> ${new Date(item.pubDate).toLocaleDateString()} </p>
      </div>
      <div class="description">
        <p>${item.description}</p>
      </div>
    </div>
    </div>
    `
    innerCarousel.appendChild(itemDiv);
  });
}
