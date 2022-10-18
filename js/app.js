const getNews = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => getData(data.data.news_category
        ))
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
}
const displayMainNews = newsAll => {
    toggleSpinner(false);
    const newsCard = document.getElementById('main-news');
    newsCard.innerHTML = '';
    newsAll.forEach(news => {
        console.log(news);
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
                            <div class="btn d-lg-flex align-items-center" id="click-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                         </div>
                        </p>
                    </div>
                </div>
            </div>
        </div>`;
        newsCard.appendChild(div)
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
document.getElementById('click-modal').addEventListener('click', function () {
    displayMainNews()
});