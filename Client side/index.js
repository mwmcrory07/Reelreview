

class Director {
    constructor(name,image,description,average_rating,image_src){
        this.name = name;
        this.image = image;
        this.description = description;
        this.films = [];
        this.average_rating = average_rating;
        this.image_src = image_src;
    }
    get_name(){
        return this.name;
    }
    get_image(){
        return this.image;
    }
    get_description(){
        return this.description;
    }
    get_average_rating(){
        return this.average_rating;
    }

    get_image_src(){
        return this.image_src;
    }
    add_film(film){
        this.films.push(film);
    }
    get_films(){
        return this.films;
    }
        
    calc_average_rating(){
        if (!this.films || this.films.length === 0){
            this.average_rating = 0;
        return;
    }
        let sum = 0
        for(let i=0;i<(this.films.length);i++){
            sum += this.films[i].average_rating;
        }
        this.average_rating = Math.round(sum / this.films.length);
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
        this.reviews.push(review);
    }

    calc_average_rating(){
        if (!this.reviews || this.reviews.length === 0){
        this.average_rating = 0;
        return;
    }
        let sum = 0
        for(let i=0;i<(this.reviews.length);i++){
            sum += this.reviews[i].rating;
        }
        this.average_rating = Math.round(sum / this.reviews.length);
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
    get_film(){
        return this.film;
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
    add_all_films(director);
    director.calc_average_rating();
    console.log(director.average_rating);

    const director_description = document.getElementById("director_description");
    director_description.innerHTML = director.get_description();

    const director_image = document.getElementById("director_image");
    director_image.src = director.get_image();


    const average_rating_image = document.getElementById("average_rating_image");
    average_rating_image.src = stars_dictionary[director.get_average_rating()];

    const director_image_src = document.getElementById("director_image_src");
    director_image_src.innerHTML = director.get_image_src();


    director_div.style.display = "block";
    
    director_bar.style.display = "block";
    
    show_films(director.get_films());
    current_director = director;
  
}


function show_films(films){
    let counter = 2;
    let i = 0;
    const films_grid =  document.getElementById("films_grid");
    films_grid.replaceChildren();
    let current_row = null
    for (let i = 0; i<films.length;i++){
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
        film_img.setAttribute("alt","Film image");
        image_col.appendChild(film_img);

        const film_src = document.createElement("p");
        film_src.textContent = ("Image sourced from : " +film.get_img_src());
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
        try{
        latest_review.textContent = ("Latest review : " + (film.get_latest_review().get_review()));
        }
        catch{
            latest_review.textContent = "There has been no reviews yet for this film";
        }
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

const modal_review = new bootstrap.Modal(document.getElementById("review_modal"));
function write_review(film){
    const film_title = document.getElementById("film_title");
    film_title.textContent = film.get_title();
    modal_review.toggle();
}

const modal_film = new bootstrap.Modal(document.getElementById("film_modal"));
function add_film(){
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
        new_film = new Film(js_data.title,js_data.image,js_data.director,0,js_data.img_src);
        all_films.push(new_film);
        modal_film.hide();
        if (current_director == null){
            reload_films();
            
        }
        else{
            update_director(current_director.get_name());
        }
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


// Function for submitting a review to the server
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
        for (let i=0;i<all_films.length;i++){
            if (film_title.textContent == all_films[i].get_title()){
                all_films[i].add_review(review);
                all_films[i].calc_average_rating();
                await update_average_rating(all_films[i]);
                reload_films();
            }
        }
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
    
        const response = await fetch("http://localhost:3000/films/all");
        if (response.ok){
            const values = await response.json();
            for (let i=0;i<values.length;i++){
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

            for (let i=0;i<values.length;i++){
                let data = values[i];

                let new_review = new Review(
                    data.film,
                    data.review,
                    data.rating
                )
                all_reviews.push(new_review);
                
            }

        }

    
    }
    catch(error){
        console.log(error.message);
    }
}



async function update_average_rating(film){
    let rating_object = Object();
    film.calc_average_rating();
    rating_object.average_rating = film.get_average_rating();
    rating_object.title = film.get_title();
        const response = await fetch("http://localhost:3000/films/update",{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(rating_object)
        });
    if(response.ok){
        const responseBody = await response.text();
        console.log("Response from server is: ",responseBody);

    }
    else {
        alert("Problem: ",response.statusText);
    }

}
let current_director = null;

christopher_nolan = new Director("Christopher Nolan","images/Christopher_Nolan_Cannes_2018.jpg.webp","Over his career Christopher Nolan has won : 2 academy awards for best director, 1 golden globe for best director, 2 British academy film awards and grossed over 6 billion dollars worldwide",5,"Image sourced from : wikipedia");


const directors = [christopher_nolan];

const stars_dictionary = {};
stars_dictionary[0] = "images/0stars.png";
stars_dictionary[1] = "images/1stars.png";
stars_dictionary[2] = "images/2stars.png";
stars_dictionary[3] = "images/3stars.png";
stars_dictionary[4] = "images/4stars.png";
stars_dictionary[5] = "images/5stars.png";

const all_films = [];
const all_reviews = [];


const star_states = {};
star_states[1] = 0;
star_states[2] = 0;
star_states[3] = 0;
star_states[4] = 0;
star_states[5] = 0;



// For a given film object finds all of the review objects for that film and then adds them to the film object
function add_all_reviews(film){
    film.reviews = [];
    for (let i=0;i<all_reviews.length;i++){
        if (all_reviews[i].get_film() == film.get_title()){
            film.add_review(all_reviews[i]);
        }
        
    }

}

// For a given director object find all of the film objects for that director and then add them to the director object
function add_all_films(director){
    director.films = [];
    for (let i=0;i<all_films.length;i++){
        if (all_films[i].get_director() == director.get_name())
            director.add_film(all_films[i]);

    }   
}

function clear_info(){
    clear_director()
    show_films(all_films);
}


clear_director();

async function init(){
    await get_all_reviews();
    await get_all_films();

    for (const film of all_films){
        add_all_reviews(film);

    }

    show_films(all_films);
}

function reload_films(){
    show_films(all_films);
}

init();