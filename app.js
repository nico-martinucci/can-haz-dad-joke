"use strict";

const DAD_JOKES_API_URL = "https://icanhazdadjoke.com/";
const $JOKES_DIV = $("#jokes");

function getInput() {
    let $number = $("#number").val();
    return $number;
}

async function getJokes(num) {
    let jokes = [];
    
    for (let i = 0; i < num; i++) {
        let joke = await axios.get(DAD_JOKES_API_URL, {
            headers: {
                Accept: "text/plain"
            }
        })

        if (!jokes.includes(joke.data)) {
            jokes.push(joke.data);
        } else {
            i--;
        }
    }

    console.log("the jokes: ", jokes);
    return jokes;
}

function buildJokeDiv(joke) {
    let $minusButton = $("<button>", {class: "minus-button", "data-adjust": "-1"}).text("-");
    let $rating = $("<span>", {class: "rating"}).text(" 0 ");
    let $plusButton = $("<button>", {class: "plus-button", "data-adjust": "1"}).text("+");
    let $jokeText = $("<span>").text(joke);
    let $jokeDiv = $("<div>").append($minusButton, $rating, $plusButton, " ", $jokeText);

    return $jokeDiv;
}

async function getInputAndAddJokes() {
    event.preventDefault();
    
    let number = getInput();
    let jokes = await getJokes(number);

    for (let joke of jokes) {
        let jokeDiv = buildJokeDiv(joke)
        $JOKES_DIV.append(jokeDiv);
    }
}

function reorderJokes() {

} 

function adjustRating() {
    let $rating = $(event.target).parent().children(".rating");
    let change = $(event.target).attr("data-adjust");
    console.log(change);
}

$("#get-jokes").on("click", getInputAndAddJokes);

$JOKES_DIV.on("click", "button", adjustRating);