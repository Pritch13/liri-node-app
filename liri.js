require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var colors = require('colors');
var request = require("request");
var nodeArgs = process.argv;
var name = "";

function appendToFile(text) {
    fs.appendFile('log.txt', text, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Content Added!".rainbow);
            console.log(' ');
        }
    });
}

function spot(search) {
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: search }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            console.log(" ");
            console.log("--------------------------".green);
            console.log('Artist: ' + data.tracks.items[0].artists[0].name);
            console.log("--------------------------".green);
            console.log('Title: ' + data.tracks.items[0].name);
            console.log("--------------------------".green);
            console.log('Album: ' + data.tracks.items[0].album.name);
            console.log("--------------------------".green);
            console.log('Link: ' + data.tracks.items[0].album.external_urls.spotify);
            console.log("--------------------------".green);
            console.log(" ");
            appendToFile(data);
        }
    });
}

for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        name = name + "+" + nodeArgs[i];
    }
    else {
        name += nodeArgs[i];
    }
}

if (process.argv[2] === 'movie-this') {
    if (!process.argv[3]) {
        request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy', function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(" ");
                console.log("--------------------------".green);
                console.log("Title: " + JSON.parse(body).Title);
                console.log("--------------------------".green);
                console.log("Release date: " + JSON.parse(body).Released);
                console.log("--------------------------".green);
                console.log("IMDB rating: " + JSON.parse(body).imdbRating);
                console.log("--------------------------".green);
                console.log("Rotten tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("--------------------------".green);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("--------------------------".green);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("--------------------------".green);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("--------------------------".green);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("--------------------------".green);
                console.log(" ");
                appendToFile(body);
            }
        });
    } else {

        var queryUrl = "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(" ");
                console.log("--------------------------".green);
                console.log("Title: " + JSON.parse(body).Title);
                console.log("--------------------------".green);
                console.log("Release date: " + JSON.parse(body).Released);
                console.log("--------------------------".green);
                console.log("IMDB rating: " + JSON.parse(body).imdbRating);
                console.log("--------------------------".green);
                console.log("Rotten tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
                console.log("--------------------------".green);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("--------------------------".green);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("--------------------------".green);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("--------------------------".green);
                console.log("Actors: " + JSON.parse(body).Actors);
                console.log("--------------------------".green);
                console.log(" ");
                appendToFile(body);
            }
        });
    }
}

else if (process.argv[2] === 'spotify-this-song') {
    if (process.argv[3]) {
        spot(name);
    } else {
        spot('the sign ace')
    }
}

else if (process.argv[2] === 'my-tweets') {

    var Twitter = require('twitter');
    var client = new Twitter(keys.twitter);
    var params = { screen_name: 'realdonaldtrump', count: 20 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (let i = 0; i < 20; i++) {
                console.log(' ');
                console.log("--------------------------".green);
                console.log('Time: ' + tweets[i].created_at);
                console.log('Tweet: ' + tweets[i].text);
                console.log("--------------------------".green);
                console.log(' ');
            }
            appendToFile(tweets);
        }
    });
}

else if (process.argv[2] === 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        spot(dataArr[1]);
        appendToFile(data);
    });
}

else if (!process.argv[2]) {
    console.log(' ');
    console.log('Please enter either'.rainbow);
    console.log("--------------------------".green);
    console.log('my-tweets');
    console.log('movie-this');
    console.log('spotify-this-song');
    console.log('do-what-it-says');
    console.log("--------------------------".green);
    console.log(' ');
}

