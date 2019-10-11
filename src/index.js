URL = "http://localhost:3000/toys";
const toyCollection = document.getElementById("toy-collection");

document.addEventListener("DOMContentLoaded", () => {
  createToy();
  fetchToys();
});

const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;

addBtn.addEventListener("click", () => {
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

function createToy() {
  const createToyForm = document.getElementsByClassName("add-toy-form")[0];
  createToyForm.addEventListener("submit", event => {
    event.preventDefault();
    let name = event.target.elements["name"].value;
    let image = event.target.elements["image"].value;

    let config = {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: 0,
        random: "work???"
      })
    };

    fetch(URL, config)
      .then(res => res.json())
      .then(toy => appendToy(toy));
  });
}

function appendToy(toy) {
  const toyCard = document.createElement("div");
  toyCard.className = "card";

  const toyName = document.createElement("h2");
  toyName.innerText = toy.name;

  const toyImage = document.createElement("img");
  toyImage.className = "toy-avatar";
  toyImage.setAttribute("src", toy.image);

  const toyLikes = document.createElement("p");
  toyLikes.innerText = `${toy.likes} Likes`;

  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";

  likeButton.innerHTML = "&#128077";

  likeButton.addEventListener("click", () => {
    toy.likes += 1;
    fetch(URL + `/${toy.id}`, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: toy.likes
      })
     })
     .then(res => res.json())
     .then(json => console.log(json))
     toyLikes.innerText = `${toy.likes} Likes`;
  });

  toyCard.append(toyName, toyImage, toyLikes, likeButton);
  toyCollection.append(toyCard);
}


function fetchToys() {
  fetch(URL)
    .then(res => res.json())
    .then(json => {
      renderToy(json);
    });
}

function renderToy(json) {
  for (const toy of json) {
    appendToy(toy);
  }
}
