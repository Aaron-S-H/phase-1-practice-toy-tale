let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
getAllToys();

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

const createToyButton = document.querySelector(".submit");
const inputName = document.querySelector(".input-text");
const inputUrl = document.getElementsByName("image");
createToyButton.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(inputName.value);
  console.log(inputUrl);
})
  })
  
  

  function getAllToys() {
    return fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toyData => toyData.forEach(toy => toyHandler(toy)))
  }
  function toyHandler(toy){
    const collection = document.querySelector("#toy-collection"); 
    let card = document.createElement("li");
    card.className= "card";
    card.innerHTML =`
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar"/>
    <p class="likes"> has ${toy.likes} likes</p>
    <button class="like-btn" id=${toy.id}>Like ❤️</button>
    `
   card.querySelector(".like-btn").addEventListener("click", () => {
     toy.likes +=1;
    card.querySelector(".likes").textContent = `has ${toy.likes} likes`;
    updateLikes(toy)
   });

   collection.appendChild(card);
   }
 
   
function updateLikes(toy){
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method:"PATCH",
    headers:{
      "Content-Type" : "application/json"
    },
    body: JSON.stringify(toy)
  }
  )
.then(res => res.json())
// .then(toy =>console.log(toy))
}
})