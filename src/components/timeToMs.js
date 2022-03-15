/**
 * @param {string} time | The time to convert to milliseconds
 * @format HH:MM:SS
 * @returns {number} | The time in milliseconds
 */

export const timeToMs = (time) => {
	let timeArray = time.split(":");

	timeArray.forEach((value, index) => {
		timeArray[index] = value.replace(/[^0-9]/g, "0");
	});

	let ms =
		parseInt(timeArray[0]) * 3600000 +
		parseInt(timeArray[1]) * 60000 +
		parseInt(timeArray[2]) * 1000;
	return ms;
};
