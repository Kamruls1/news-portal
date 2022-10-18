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
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMainNews(data.data))
}
const displayMainNews = newsAll => {
    const newsCard = document.getElementById('main-news');
    newsCard.innerHTML = '';
    newsAll.forEach(news => {
        console.log(news);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card mb-3 p-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.details.slice(0, 300)}</p>
                        <p class="card-text mt-5" >
                          <div class="d-flex justify-content-around">
                           <div class="d-flex ">
                            <img src="${news.author.img}" class="img-fluid rounded-circle mx-2"style="width:60px; height:60px;" alt="">
                             <div>
                               <p class="my-0">${news.author.name}</p>
                               <p>${news.author.published_date}</p>
                             </div>
                          </div>
                          <div>
                            <span><i class="fa-regular fa-eye"></i>${news.total_view}k</span>
                          </div>
                          <div class="btn">
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

getNews()