/* Randomize array in-place using Durstenfeld shuffle algorithm */
export function shuffle(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

/*
playlist_duration = total duration of new playlist
songs = a 2d array containing song ids and their lengths

simple creation of playlist that fits given duration
returns an array of song ids
*/
export default function PlayListGenerator_simple(playlist_duration, songs) {

	let new_playlist = []; // empty the array added by Hinako

	let i = 0;
	shuffle(songs);
	while (playlist_duration > 0 && i < songs.length) {
		if (playlist_duration - songs[i][1] < 0) {
			//if song doesn't fit
			if (i + 1 < songs.length) {
				//are there more songs left?
				i++;
				continue;
			} else {
				break;
			}
		} else if (playlist_duration - songs[i][1] === 0) {
			//if song perfectly fits
			playlist_duration -= songs[i][1];
			new_playlist.push(songs[i][0]);
			break;
		} else {
			//if song fits
			playlist_duration -= songs[i][1];
			new_playlist.push(songs[i][0]);
		}
		i++;
	}
	return new_playlist;
}

/*
playlist_duration = total duration of new playlist
songs = a 2d array containing song ids and their lengths

creates a playlist based on given duration and selected
audio features, returns an array of song ids
*/
export function PlaylistGenerator_features(playlist_duration, songs, features) {
	let new_playlist = [];

	// 0 = position, 1 = duration, 2 = trackID, 3 = valence

	// features are in this order:
	// Uplifting, vexing, low tempo, higher tempo, instrumental, speech
	// popularity, energetic, danceability, acousticness
	let x = 0;
	while (x < songs.length) {
		// Check if features are contained
		// Check for uplifting feature
		if (features.indexOf("uplift") !== -1 && songs[x][3] < 0.5) {
			delete songs[x];
		} else if (features.indexOf("vex") !== -1 && songs[x][3] > 0.5) {
			delete songs[x];
		} else if (features.indexOf("slowtempo") !== -1 && songs[x][4] > 100) {
			delete songs[x];
		} else if (features.indexOf("fasttempo") !== -1 && songs[x][4] < 100) {
			delete songs[x];
		} else if (features.indexOf("instrumental") !== -1 && songs[x][5] < 0.5) {
			delete songs[x];
		} else if (
			features.indexOf("speech") !== -1 &&
			(songs[x][6] > 0.66 || songs[x][6] < 0.33)
		) {
			delete songs[x];
		} else if (features.indexOf("dance") !== -1 && songs[x][8] < 0.5) {
			delete songs[x];
		} else if (features.indexOf("energy") !== -1 && songs[x][7] > 0.5) {
			delete songs[x];
		} else if (features.indexOf("acoustic") !== -1 && songs[x][9] < 0.5) {
			delete songs[x];
		} else if (features.indexOf("pop") !== -1 && songs[x][10] < 50) {
			delete songs[x];
		}
		// pop somewhere here
		x++;
	}

	let i = 0;
	shuffle(songs);
	while (playlist_duration > 0 && i < songs.length) {
		if (songs[i] === undefined) {
			i++;
			continue;
		}
		if (playlist_duration - songs[i][1] < 0) {
			//if song doesn't fit
			if (i + 1 < songs.length) {
				//are there more songs left?
				i++;
				continue;
			} else {
				break;
			}
		} else if (playlist_duration - songs[i][1] === 0) {
			//if song perfectly fits
			playlist_duration -= songs[i][1];
			new_playlist.push(songs[i][0]);
			break;
		} else {
			//if song fits
			playlist_duration -= songs[i][1];
			new_playlist.push(songs[i][0]);
		}
		i++;
	}
	return new_playlist;
}
