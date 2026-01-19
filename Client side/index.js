



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
    constructor(title,image,director){
        this.title = title
        this.image = image
        this.director = director
        this.reviews = []
        this.average_rating = 0
    }

    add_review(review){
        this.ratings.push(review)
    }

    calc_average_rating(){
        let sum = 0
        for(i=0;i<(this.ratings.length);i++){
            sum += this.ratings[i]
        }
        this.average_rating = sum / this.ratings.length
    }

}


class Review{
    constructor(film,review,rating){
        this.film = film
        this.review = review
        this.rating = rating
    }

}



let current_director = null;



function update_director(name){
    let found = false;
    let pointer = 0;
    while (found == False){
        if (directors[pointer].get_name() == name){
            found = true;
        }

    }
    let stars_dictionary = {};
    stars_dictionary[0] = "images/0stars.png";
    stars_dictionary[1] = "images/1stars.png";
    stars_dictionary[2] = "images/2stars.png";
    stars_dictionary[3] = "images/3stars.png";
    stars_dictionary[4] = "images/4stars.png";
    stars_dictionary[5] = "images/5stars.png";

    let director = directors[pointer];

    const director_description = document.getElementById("director_description");
    director_description.innerHTML = director.get_description();

    const director_image = document.getElementById("director_image");
    director_image.src = director.get_image();


    const average_rating_image = document.getElementById("average_rating_image");
    director_image.src = stars_dictionary[director.get_average_rating()];

}

christopher_nolan = new Director("Christopher Nolan","#","#");

interstellar = new Film("Interstellar","#","Christopher Nolan");

interstellar_review = new Review("Interstellar","dwqd",5);

console.log(review);

const directors = [christopher_nolan];