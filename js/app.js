const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");

    const data = await response.json();

    const tabContainer = document.getElementById('tab-container');
    // for each only works in array to using data.data.news_category
    
    const trimedData = data.data.news_category.slice(0,3);
    trimedData.forEach((category) => {
        console.log(category);
        const div = document.createElement('div');
        div.innerHTML = `
        <a class="tab">${category.category_name}</a>
        `;
        tabContainer.appendChild(div);
    });



    console.log(data.data.news_category);

}
handleCategory();





















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


