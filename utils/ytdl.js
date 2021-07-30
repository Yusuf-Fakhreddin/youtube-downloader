const chalk = require("chalk");
const downloadsFolder = require("downloads-folder");
const ytdl = require("ytdl-core");
const fs = require("fs");

const validateLink = async (link) => {
	return await ytdl.validateURL(link);
};

let itags = [];
let containers = [];
const getInfo = async (link) => {
	const info = await ytdl.getInfo(link);
	let title = info.videoDetails.title;
	console.log(chalk.yellow("Video Title: " + info.videoDetails.title));
	console.log(chalk.yellow("Channel: " + info.videoDetails.author.name));
	console.log(chalk.yellow("Likes: " + info.videoDetails.likes));
	console.log(chalk.yellow("Dislikes: " + info.videoDetails.dislikes));

	let qualities = [];
	const filters = await ytdl.filterFormats(info.formats, "audioandvideo");
	// console.log(chalk.yellow("filters " + filters.length));
	for (let i = 0; i < info.formats.length; i++) {
		if (
			info.formats[i].container == "mp4" &&
			info.formats[i].hasAudio &&
			info.formats[i].qualityLabel
		) {
			// console.log(
			// 	chalk.blue(
			// 		info.formats[i].itag +
			// 			" " +
			// 			info.formats[i].qualityLabel +
			// 			" " +
			// 			info.formats[i].contianer +
			// 			" " +
			// 			qualities.includes(info.formats[i].qualityLabel)
			// 	)
			// );
			if (
				qualities.includes(info.formats[i].qualityLabel) === false &&
				info.formats[i].hasAudio
			) {
				qualities.push(info.formats[i].qualityLabel);
				itags.push(info.formats[i].itag);
				containers.push(info.formats[i].container);
			} else continue;
		}
	}

	return { qualities, title };
};

const videoDownload = async (URL, quality, title) => {
	let downloadsPath = downloadsFolder();
	let itag = itags[quality];
	const video = await ytdl(URL, {
		filter: (format) => format.itag == itag,
	});
	console.log(
		"Your Download has started at " + downloadsPath + "\\" + title + ".mp4"
	);
	video.on("end", function (info) {
		console.log(chalk.green("Download finished"));
	});
	video.pipe(fs.createWriteStream(downloadsPath + "\\" + title + ".mp4"));
};

module.exports = {
	validateLink,
	getInfo,
	videoDownload,
};
