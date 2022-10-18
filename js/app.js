const getNews = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => getData(data.data.news_category))
        .catch(error => console.log(error))
}
const getData = elements => {
    const newsCatagorys = document.getElementById('news-catagorys');
    elements.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <a onclick="getMainNews('${element.category_id}')" class="text-dark btn fw-bold" href="#">${element.category_name}</a>
    `;
        newsCatagorys.appendChild(div)
    });

}
const getMainNews = (id) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMainNews(data.data))
        .catch(error => console.log(error))
}
const displayMainNews = newsAll => {
    toggleSpinner(false);
    const newsCard = document.getElementById('main-news');
    newsCard.innerHTML = '';
    newsAll.forEach(news => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card mb-3 p-3">
            <div class="row g-0">
                <div class="col-lg-3 text-center">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.details.slice(0, 300)}</p>
                        <p class="card-text mt-5" >
                          <div class="d-lg-flex d-md-flex justify-content-lg-around text-center">
                           <div class="d-lg-flex align-items-center">
                            <img src="${news.author.img}" class="img-fluid rounded-circle mx-2"style="width:60px; height:60px;" alt="">
                             <div>
                               <p class="my-0 fw-bold">${news.author.name}</p>
                             </div>
                          </div>
                            <div class=" d-lg-flex align-items-center">
                                <span><i class="fa-regular fa-eye"></i>${news.total_view}k</span>
                            </div>
                            <div class="btn d-lg-flex align-items-center" onclick="getMainNews('${news.category_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                         </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>`;
        newsCard.appendChild(div)
        const modalName = document.getElementById('exampleModalLabel');
        modalName.innerHTML = `
        <p>${news.author.name}</p>`;
        const modalNewsPublish = document.getElementById('publish');
        modalNewsPublish.innerHTML = `
        <p>Publish: ${news.author.published_date}</p>`;
        const modalRating = document.getElementById('modal-rating');
        modalRating.innerHTML = `
        <p>Rating: ${news.rating.number}</p>`;
        const modalDetails = document.getElementById('modal-badge');
        modalDetails.innerHTML = `
        <p>Badge: ${news.rating.badge}</p>`;
        const modalTitle = document.getElementById('modal-title');
        modalTitle.innerHTML = `
        <p>${news.title}</p>`;
    })
}
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('spinner');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}
getNews()
