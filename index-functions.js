
/*LOAD ASSETS*/
window.onload = function () {
    var folder = "assets/artwork";

    // const express = require('express');
    // const app = express();
    // const path = require('path');

    // // Allow assets directory listings
    // const serveIndex = require('serve-index');
    // app.use('/assets', serveIndex(path.join(__dirname, '/assets')));

    $.ajax({
        url: folder,
        success: function (data) {
            $(data).find("a").attr("href", function (i, val) {
                if (val.match(/\.(jpe?g|png|gif)$/)) {
                    $("body").append("<img src='" + folder + val + "'>");
                }
            });
        }
    });
}

function dropdown(artOrMusic) {
    var dropdowns = document.getElementsByClassName("dropdown");
    if (!dropdowns[artOrMusic].classList.contains("show")) {
        dropdowns[0].classList.toggle("show");
        dropdowns[1].classList.toggle("show");
    }

}
/*MUSIC PLAYER FUNCTIONS*/

// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
// let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

const albums = [
    {
        name: "Campus Stellae",
        album_art: "https://cdn.discordapp.com/attachments/735971496480210975/1120901790301425755/campus-stellae-album-art.png",
        tracks:
            ["Overture"
            ]
    },
    {
        name: "Custom of the Sea",
        album_art: "https://cdn.discordapp.com/attachments/735971496480210975/1120901790758621294/pirate-album-art.png",
        tracks:
            ["BattleStrife_Theme",
                "Ship_Themes",
                "Tavern_Theme"
            ]
    },
    {
        name: "Gothic",
        album_art: "https://images.unsplash.com/photo-1619904252549-88d890e7455b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
        tracks:
            [
                "Atrium_Death",
                "Next_Door",
                "Tower_Variation"
            ]
    },
    {
        name: "Lions Meet Here",
        album_art: "https://cdn.discordapp.com/attachments/804782490937851945/1121244616168063006/fantasy-album-art.png",
        tracks:
            [
                "Chariot_Canon",
                "Happy_End",
                "Inevitable_Water_Level",
                "Quest_Begins"
            ]
    }
];


let track_list = [];

//populate array with assets/music-tracks file dynamically
//update: need to add node.js for this.

for (let i = 0; i < albums.length; i++) {
    var curr_album_div = document.createElement('div');
    var curr_album_name = document.createElement('h2');
    var curr_album_art = document.createElement('img');
    var curr_album_tracks = document.createElement('ul')
    var curr_album_subdiv = document.createElement('div');

    curr_album_name.textContent = albums[i].name;
    curr_album_art.src = albums[i].album_art;

    curr_album_div.classList.add("flex-layout");

    curr_album_div.appendChild(curr_album_art);
    curr_album_div.appendChild(curr_album_subdiv);
    curr_album_subdiv.appendChild(curr_album_name);
    curr_album_subdiv.appendChild(curr_album_tracks);

    for (let j = 0; j < albums[i].tracks.length; j++) {
        var track_name_formatted = albums[i].tracks[j].replace(/_|-/g, " ");
        track_list.push({
            name: track_name_formatted,
            image: curr_album_art.src,
            path: "assets/music-tracks/" + albums[i].tracks[j] + ".m4a"
        });

        //add li to ul in html
        var curr_album_curr_track = document.createElement('li');
        curr_album_curr_track.textContent = track_name_formatted;
        curr_album_tracks.appendChild(curr_album_curr_track);
    }

    var playlist = document.getElementsByClassName("playlist");
    console.log(playlist.length);
    playlist[0].appendChild(curr_album_div);
}

function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();

    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    // Update details of the track
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    // track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;

    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
}
// Move to the next track if the current finishes playing
// using the 'ended' event
//curr_track.addEventListener("ended", nextTrack);

// // Apply a random background color
// random_bg_color();
// }

// function random_bg_color() {
// // Get a random number between 64 to 256
// // (for getting lighter colors)
// let red = Math.floor(Math.random() * 256) + 64;
// let green = Math.floor(Math.random() * 256) + 64;
// let blue = Math.floor(Math.random() * 256) + 64;

// // Construct a color with the given values
// let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

// // Set the background to the new color
// document.body.style.background = bgColor;
// }

// Function to reset all values to their default
function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    isPlaying = false;
}

function prevTrack() {
    mod_index = track_index + track_list.length - 1;
    track_index = mod_index % track_list.length;
    loadTrack(track_index);
}

function nextTrack() {
    mod_index = track_index + track_list.length + 1;
    track_index = mod_index % track_list.length;
    loadTrack(track_index);
}

function playpauseTrack() {
    if(currentMinutes == 0 && currentMinutes == 0) { 
        isPlaying = !isPlaying; 
    }
    isPlaying ? curr_track.pause() : curr_track.play();
    isPlaying = !isPlaying;
}

function seekTo() {
    // Calculate the seek position by the
    // percentage of the seek slider
    // and get the relative duration to the track
    seekto = curr_track.duration * (seek_slider.value / 100);

    // Set the current track position to the calculated seek position
    curr_track.currentTime = seekto;
}

function setVolume() {
    // Set the volume according to the
    // percentage of the volume slider set
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    // Check if the current track duration is a legible number
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        // Display the updated duration
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;

        
        if(currentMinutes == 0 && currentMinutes == 0) { loadTrack(track_index); }
    }
}

// Load the first track in the tracklist
loadTrack(track_index);