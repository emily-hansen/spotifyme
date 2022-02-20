let new_playlist = []; //stores ids of playlist to be created

function max(a, b) {
        return (a > b) ? a : b;
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

/*                 work in progress
playlist_duration = total duration of new playlist
songs = imported songs array contains id and song length in ms
n = index and popularity of song (ordered low to high)
 takes an ordered list of most popular/listened to songs
 and generates a playlist using a greedy alg
is O(2^n) which is not ideal, trying to find a better way
*/
function PlayListGenerator_popular(playlist_duration, songs, n) {

    // Base Case
    if (playlist_duration == 0 || n < songs.length )
        return 0;

    if (songs[n - 1][1] > playlist_duration)
        return PlayListGenerator_popular(playlist_duration, songs, n - 1);
    else
        // To do in this func:
        //  add values of popularity from each array in 
        //      recursion to determine value in max comparsion
        //      to achieve the playlist with the most popular songs
        new_playlist.push(songs[n][0]);//add song to new playlist array
        return max(PlayListGenerator_popular(playlist_duration - songs[n - 1][1], songs, n - 1),
            PlayListGenerator_popular(playlist_duration, songs, n - 1));
}


/*
playlist_duration = total duration of new playlist
songs = a 2d array containing song ids and their lengths
n = index and popularity of song (ordered low to high)
simple creation of playlist that fits given duration
returns an array of choosen song ids
*/
export default function PlayListGenerator_simple(playlist_duration, songs) {

    // To do in this func:
    //  add the functionality to choose playlist with max songs (probably not)
    //  add in advanced user options for generation

    let new_playlist = []; // empty the array added by Hinako

    let i = 0;
    shuffle(songs); //not protected but shuffles given array
    while(playlist_duration > 0 && i < songs.length){
        if (playlist_duration - songs[i][1] < 0){ //if song doesn't fit
            if( i + 1 < songs.length) { //are there more songs left?
                i++;
                continue
            } else {
                break
            }
        } else if (playlist_duration - songs[i][1] == 0) { //if song perfectly fits
            playlist_duration -= songs[i][1];
            new_playlist.push(songs[i][0]);
            break
        } else { //if song fits
            playlist_duration -= songs[i][1];
            new_playlist.push(songs[i][0]);
        }
        i++;
    }
    return new_playlist
}

//------------------------------------------------------testing---------------------------------------------------------

// ---testing values---
let songs_test = [ [1, 5], [2, 3], [3, 2], [4, 3], [5, 5], [6, 4], [7, 6], [8, 2], [9, 3], [10, 7]]; //[id, length]
let playlist_duration_test = 20; //desired duration

console.log(PlayListGenerator_simple(playlist_duration_test, songs_test));
//----------------------------------------------------------------------------------------------------------------------

/*
main exported function to be used by pages
export function playlistHandler(songs){
    PlayListGenerator_simple(playlist_duration, songs);
}
*/
