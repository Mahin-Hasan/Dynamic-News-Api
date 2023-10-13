const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");

    const data = await response.json();

    const tabContainer = document.getElementById('tab-container');
    // for each only works in array to using data.data.news_category

    const trimedData = data.data.news_category.slice(0, 3);
    trimedData.forEach((category) => {
        console.log(category);
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a>
        `;
        tabContainer.appendChild(div);
    });
    // console.log(data.data.news_category);
};

// getting id dynamically
const handleLoadNews = async (categoryId) => {
    // console.log(categoryId);
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    const data = await response.json();
    // console.log(data);

    const cardContainer = document.getElementById('news-container');
    cardContainer.innerHTML = '';
    // here optional chaining is used in case no data is loaded the code does not give any error
    data.data?.forEach((news) => {
        // console.log(news);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
            <figure><img src="${news?.image_url}" alt="Shoes" /></figure>
            <div class="card-body">
             <h2 class="card-title">${news.title.slice(0, 40)}</h2>
             <p>${news.details.slice(0, 40)}</p>
          <div class="badge badge-primary badge-outline">${news?.rating?.badge}</div>
          <div class="flex justify-between">
          <div class="flex items-center">
              <img class="w-10 rounded-full mr-3" src="${news.author.img}" alt="">
              <div>
                <h4>${news.author.name}</h4>
                <h4>${news.total_view ? news.total_view : 'No views'}</h4>
              </div>
          </div>
          <div>
              <button onclick="handleModal('${news._id}')" class="btn btn-primary">Details</button>
          </div>
      </div>
        </div>
      </div>
        `
        cardContainer.appendChild(div);
    })

}
// trying modal

const handleModal = async (newsId) => {
    // console.log(newsId);
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)

    const data = await response.json();
    console.log(data.data[0]);

    const modalContainer = document.getElementById('modal-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <dialog id="my_modal" class="modal">
    <div class="modal-box">
        <h3 class="font-bold text-lg">Author name: ${data.data[0].author.name}</h3>
        <p class="py-4">Press ESC key or click the button below to close</p>
        <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
            </form>
        </div>
    </div>
</dialog>
    `;
    modalContainer.appendChild(div);
    const modal = document.getElementById('my_modal');
    modal.showModal();
}



handleCategory();
handleLoadNews('01');




















/*  
above handle category can aslo be done using async await
- will execute code serially one by one 
- more standard way
const handleCategory = async () => {
    console.log('first');
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();
    console.log(data);
    console.log('second');
}

// using fetch .then .then
const handleCategory = () => {
    console.log('first');
    fetch("https://openapi.programming-hero.com/api/news/categories")
        .then(res => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    console.log('second');
here is will output first second then fetch
}
*/


