

class Director {
    constructor(name,image,description,average_rating){
        this.name = name
        this.image = image
        this.description = description
        this.films = []
        this.average_rating = average_rating
    }
    get_name(){
        return this.name
    }
    get_image(){
        return this.image
    }
    get_description(){
        return this.description
    }
    get_average_rating(){
        return this.average_rating
    }
    }


class Film {
    constructor(title,image,director,average_rating,img_src){
        this.title = title
        this.image = image
        this.director = director
        this.reviews = []
        this.average_rating = average_rating
        this.img_src = img_src
    }

    add_review(review){
        this.reviews.push(review)
    }

    calc_average_rating(){
        let sum = 0
        for(i=0;i<(this.reviews.length);i++){
            sum += this.reviews[i]
        }
        this.average_rating = sum / this.ratings.length
    }

    get_title(){
        return this.title
    }
    get_image(){
        return this.image
    }
    get_director(){
        return this.director
    }
    get_average_rating(){
        return this.average_rating
    }
    get_reviews(){
        return this.reviews;
    }
    get_latest_review(){
        return this.reviews[this.reviews.length-1]
    }
    get_img_src(){
        return this.img_src
    }
    add_review(review){
        this.reviews.push(review);

    }
}


class Review{
    constructor(film,review,rating){
        this.film = film;
        this.review = review;
        this.rating = rating;
    }

    get_review(){
        return this.review;
    }

}



function clear_director(){
    const director_div = document.getElementById("director_info");
    const director_bar = document.getElementById("director_bar");
    director_div.style.display = "none";
    
    director_bar.style.display = "none";

}



function update_director(name){
    const director_div = document.getElementById("director_info");
    const director_bar = document.getElementById("director_bar");



    let found = false;
    let pointer = 0;
    while (found == false){
        if (directors[pointer].get_name() == name){
            found = true;
        }

    }

    let director = directors[pointer];

    const director_description = document.getElementById("director_description");
    director_description.innerHTML = director.get_description();

    const director_image = document.getElementById("director_image");
    director_image.src = director.get_image();


    const average_rating_image = document.getElementById("average_rating_image");
    average_rating_image.src = stars_dictionary[director.get_average_rating()];

    director_div.style.display = "block";
    
    director_bar.style.display = "block";
    
  
}


function show_films(films){
    let counter = 2;
    let i = 0;
    const films_grid =  document.getElementById("films_grid");
    let current_row = null
    for (i = 0; i<films.length;i++){
        let film = films[i]
        if (counter == 2) {
            counter = 1;
            const row = document.createElement("div");
            row.classList.add("row","gx-3");
            
            current_row = row;
            films_grid.appendChild(row);
        }

        const film_col = document.createElement("div");
        film_col.classList.add("col-lg-6","align-self-center");
        current_row.appendChild(film_col);

        const film_container  = document.createElement("div");
        film_container.classList.add("film_container");
        film_col.appendChild(film_container);
        


        const top_row  = document.createElement("div");
        top_row.classList.add("row");
        film_container.appendChild(top_row);


        const image_col = document.createElement("div");
        image_col.classList.add("col-sm-6","align-self-center");
        top_row.appendChild(image_col)



        const film_img = document.createElement("img");
        film_img.setAttribute("height","250px");
        film_img.setAttribute("width","175px");
        film_img.setAttribute("src",film.get_image());
        image_col.appendChild(film_img);

        const film_src = document.createElement("p");
        film_src.textContent = film.get_img_src();
        image_col.appendChild(film_src);

        const info_col = document.createElement("div");
        info_col.classList.add("col-sm-6","align-self-center");
        top_row.appendChild(info_col);

        const film_title = document.createElement("p");
        film_title.textContent = film.get_title();
        info_col.appendChild(film_title);

        const film_director = document.createElement("p");
        film_director.textContent = film.get_director();
        info_col.appendChild(film_director);


        const star_img = document.createElement("img");
        star_img.setAttribute("height","50px");
        star_img.setAttribute("width","200px");
        star_img.setAttribute("src",stars_dictionary[film.get_average_rating()]);
        info_col.appendChild(star_img);


        const bottom_row  = document.createElement("div");
        bottom_row.classList.add("row");
        film_container.appendChild(bottom_row);

        const rating_col = document.createElement("div");
        rating_col.classList.add("col-sm-8","align-self-center");
        bottom_row.appendChild(rating_col);
       
        const latest_review = document.createElement("p");
        //latest_review.textContent = film.get_latest_review().get_review();
        rating_col.appendChild(latest_review);


        const button_col = document.createElement("div");
        button_col.classList.add("col-sm-4","align-self-center");
        bottom_row.appendChild(button_col);


        const review_button = document.createElement("button");
        review_button.classList.add("btn","btn-danger");
        review_button.setAttribute("type","button");
        review_button.addEventListener("click", () => {
            write_review(film);
        })
        review_button.textContent = "Write review";
        button_col.appendChild(review_button);


    }
}


function write_review(film){
    let modal_review = new bootstrap.Modal(document.getElementById("review_modal"));
    const film_title = document.getElementById("film_title");
    film_title.textContent = film.get_title();
    modal_review.toggle();
}

function add_film(){
    let modal_film = new bootstrap.Modal(document.getElementById("film_modal"));
    modal_film.toggle();
}


const film_form = document.getElementById("film_form");
film_form.addEventListener("submit", async function(event){
    event.preventDefault();
    const film_data = new FormData(film_form);
    let js_data = Object.fromEntries((film_data.entries()));
    js_data.average_rating = 0;
    const response = await fetch("http://localhost:3000/films/new",
        {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(js_data)
        }
    )
    if (response.ok){
        const responseBody = await response.text();
        console.log("Response from server :", responseBody);
    }
    else {
        console.log(response.statusText)
    }

})

function update_stars(number){

    console.log(number);
    if (star_states[number] == 0){
        
        while (number > 0 ){
            let num_str = String(number);
            let star_str = "star" + num_str;
            let star = document.getElementById(star_str);
            star.style.color = "#F2C12E";
            star_states[number] = 1;
            number = number - 1;
        }
    }
    else {
        number = number + 1;
        while (number < 6){
            let num_str = String(number);
            let star_str = "star" + num_str ;
            let star = document.getElementById(star_str);
            console.log(star_str)
            star.style.color = "black";
            star_states[number] = 0;
            number = number + 1;

        }
    }

}





const submit_review = document.getElementById("submit_review");

submit_review.addEventListener("click", async function(event){
    event.preventDefault();
    const film_title = document.getElementById("film_title");
    const user_rating = document.getElementById("user_rating");
    let star_counter = 5;
    let found = false;
    let rating = 0;
    while (star_counter > 0 && !found){
        if (star_states[star_counter] == 1){
            console.log(star_states[star_counter]);
            rating = star_counter;
            console.log(rating);
            found = true;
        }
        star_counter = star_counter - 1
    }
    let review = new Review(film_title.textContent,user_rating.options[user_rating.selectedIndex].text,rating);
    let json_review = JSON.stringify(review);
    const response = await fetch("http://localhost:3000/review/new",{
        method : 'POST',
        headers : {
            "Content-Type" : "application/json"
        },
        body : json_review
    });
    if(response.ok){
        const responseBody = await response.text();
        console.log("response: ",responseBody);

    }
    else {
        alert("Problem: ",response.statusText);
    }
    
})



// Recieves data from the server for all the films and creates Film objects
// Then the Film objects are placed into the all_films array
async function get_all_films(){

    all_films.length = 0;
    try {
        const response = await fetch("http://localhost:3000/films/all");
        if (response.ok){
            const values = await response.json();

            for (i=0;i<values.length;i++){
                let data = values[i];

                let new_film = new Film(
                    data.title,
                    data.image,
                    data.director,
                    data.average_rating,
                    data.img_src
                )
                all_films.push(new_film);

            }
            show_films(all_films);
        }


    }
    catch(error){
        console.log(error.message);
    }
}


// Recieves data from the server for all the reviews and creates Rating objects
// Then the Rating objects are placed into the all_reviews array
async function get_all_reviews(){
        all_reviews.length = 0;
    try {
        const response = await fetch("http://localhost:3000/reviews/all");
        if (response.ok){
            const values = await response.json();

            for (i=0;i<values.length;i++){
                let data = values[i];

                let new_review = new Review(
                    data.film,
                    data.review,
                    data.rating
                )
                all_reviews.push(new_review);
                
            }
            console.log(all_reviews)
        }

    
    }
    catch(error){
        console.log(error.message);
    }
}
let current_director = null;

christopher_nolan = new Director("Christopher Nolan","images/Christopher_Nolan_Cannes_2018.jpg.webp","Sir Christopher Edward Nolan (born 30 July 1970) is a British and American filmmaker. Known for his Hollywood blockbusters, he is considered a leading filmmaker of the 21st century. Nolan's films have earned over $6 billion worldwide, making him the seventh-highest-grossing film director. His accolades include two Academy Awards, a Golden Globe Award and two British Academy Film Awards.",5);

interstellar = new Film("Interstellar","images/interstellar.jpg","Christopher Nolan",4,"wiki");

interstellar_review = new Review("Interstellar","Amazing film",5);


interstellar.add_review(interstellar_review)

const directors = [christopher_nolan];

const stars_dictionary = {};
stars_dictionary[0] = "images/0stars.png";
stars_dictionary[1] = "images/1stars.png";
stars_dictionary[2] = "images/2stars.png";
stars_dictionary[3] = "images/3stars.png";
stars_dictionary[4] = "images/4stars.png";
stars_dictionary[5] = "images/5stars.png";

let all_films = [];
let all_reviews = [];


const star_states = {};
star_states[1] = 0;
star_states[2] = 0;
star_states[3] = 0;
star_states[4] = 0;
star_states[5] = 0;



console.log(interstellar.get_reviews());
console.log(interstellar.get_image());
clear_director()
get_all_films()
get_all_reviews()
console.log(all_films)
show_films(all_films);