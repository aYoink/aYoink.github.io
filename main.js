
// Get list of github repositories
async function getRepos(mode="repos", page="") {
    if (mode == "repos") {
        let response = await fetch("https://api.github.com/users/aYoink/repos");
        let data = await response.json();
        return data;
    } else if (mode == "pagecheck") {
        let response = await fetch(`https://www.yoink.space/${page}`, { method: 'head'});
        return response.ok;
    }
}

class Card {
    constructor(name="Name", description="Description", start=new Date()) {
        this.name = name;
        this.description = description;
        this.start = start;
        this.cardCreator(); 
        
    }
    cardCreator() {
        // Make the card
        this.card = document.createElement("div");
        this.card.classList.add("card");
        document.getElementById("card-wrapper").appendChild(this.card);
        // Making the image
        this.image = document.createElement("img");
        this.image.classList.add("image");
        this.image.src = `screenshots/${this.name}.png`;
        this.image.alt = this.name;
        this.card.appendChild(this.image);
        // Making the description paragraph
        this.descriptionp = document.createElement("p");
        this.descriptionp.textContent = this.description;
        this.descriptionp.classList.add("description");
        this.card.appendChild(this.descriptionp);
        // Making the start date text
        this.date = document.createElement("p");
        this.date.textContent = `Project started on ${this.start}`;
        this.date.classList.add("date");
        this.card.appendChild(this.date);
    }
}

function listAllRepos() {
    getRepos().then(function(response) {
        for (let i=0; i < response.length; i++) {
            let card = new Card(response[i].name, response[i].description, response[i].created_at.split("T")[0]);
            console.log(card.card.getBoundingClientRect().top)
            card.card.addEventListener('click', function (){
                getRepos("pagecheck", response[i].name).then(function(eventreturn) {
                    if (eventreturn == false  || response[i].name == "aYoink.github.io") {
                        location.href = `https://www.github.com/aYoink/${response[i].name}`;
                    } else {
                        location.href = `https://www.yoink.space/${response[i].name}`;
                    }
                    
                })
            })

        }
    })
}

listAllRepos();





