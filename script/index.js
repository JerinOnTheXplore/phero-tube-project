function removeActiveClass(){
    const activeButtons = document.getElementsByClassName("active")
    for(let btn of activeButtons){
        btn.classList.remove("active")
    }
    console.log(activeButtons)
}



function loadCategories(){
    //1. fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //2. convert promise to json
    .then((res)=>res.json())
    //3. send data to display
    .then((data)=>displayCategories(data.categories))
}
function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data)=>displayVideos(data.videos))
}
// {category_id: '1001', video_id: 'aaad', thumbnail: 'https://i.ibb.co/f9FBQwz/smells.jpg', title: 'Smells Like Teen Spirit', authors: Array(1), …}

const loadCategoryVideos=(id)=>{

 const url = `
 https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
 console.log(url)
 fetch(url)
 .then((res)=>res.json())
 .then((data)=>{
    removeActiveClass()
    const clickedButton = document.getElementById(`btn-${id}`);
    clickedButton.classList.add("active");
    
    displayVideos(data.category)
 })
}



const displayVideos = (videos) =>{
    console.log(videos)
    // videos ekhane recieve hoise
    // 1.get the container
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = "";
     if(videos.length == 0){
        videoContainer.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center py-20">
            <img src="design/Icon.png" alt="">
            <h2 class="text-2xl text-slate-950 font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
        `;
        return;
     }




    // loop operation on array of object
    videos.forEach(video =>{
        // console.log(video);
    // create element
    const videoCard = document.createElement('div');
    videoCard.innerHTML = `
    <div class="card   shadow-sm">
            <figure class="relative">
              <img class="w-full h-[150px] object-cover"
                src="${video.thumbnail}" />
                <span class="absolute bottom-2 right-2 text-white bg-black ps-2 text-sm rounded">3hrs 56 min ago</span>
            </figure>
            
            <div class=" flex gap-3 px-0 py-5">
              <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture
                      }" />
                    </div>
                  </div>
              </div>
              <div class="intro">
                <h2 class="text-sm font-semibold">${video.title}</h2>
                <p class="flex gap text-sm text-gray-400"><img class="w-5 h-5"  src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">${video.authors[0].profile_name
                      }</p>
                <p class="text-gray-400 text-sm">${video.others.views}</p>
              </div>
              
            </div>
          </div>
    `
    videoContainer.append(videoCard)




    })
}
function displayCategories(categories){
    // get the container
    const categoryContainer = document.getElementById('category-container');
    
    // loop operation on array of object
    for(let cat of categories){ 
        // console.log(cat)
      // create element
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
<button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="bg-slate-300 px-4 py-1 rounded-md text-base text-slate-950 font-medium hover:bg-[#ff1f3d] hover:text-white ">${cat.category}</button>
    `
    // append the element
    categoryContainer.append(categoryDiv);
    }
    
}
loadCategories();