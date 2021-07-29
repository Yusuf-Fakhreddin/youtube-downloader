#!/usr/bin/env node

const chalk = require("chalk");

const { URLprompt, qualityPrompt } = require("../utils/inquiries");
const { validateLink, getInfo, videoDownload } = require("../utils/ytdl");

let URL, itag;
const execute = async () => {
	let validation = false;
	let answers;
	while (!validation) {
		answers = await URLprompt();
		validation = await validateLink(answers.URL);
		console.log(chalk.red(answers.URL));
		console.log(chalk.red(validation));
	}
	URL = answers.URL;
	let { qualities, title } = await getInfo(answers.URL);
	console.log(chalk.yellow(qualities));
	answers = await qualityPrompt(qualities);

	videoDownload(URL, qualities.indexOf(answers.quality), title);
};

execute();

// const question1 = [
// 	{
// 		type: "input",
// 		name: "URL",
// 		message: "Enter your video URL",
// 	},
// ];

// let question2;
// inquirer
// 	.prompt(question1)
// 	.then(async (answers) => {
// 		console.log(chalk.red(answers.URL));
// 		question2 = await getInfo(answers.URL);
// 	})
// 	.then(() => {
// 		inquirer.prompt(question2).then((answers) => {
// 			console.log(chalk.yellow(answers.quality));
// 		});
// 	})
// 	.catch((error) => console.log(chalk.green(error)));

// const getInfo = async (link) => {
// 	console.log((await ytdl.validateURL(link)) + " video check");
// 	const info = await ytdl.getInfo(link);
// 	console.log(chalk.yellow(info.videoDetails.title));
// 	console.log(chalk.yellow(info.videoDetails.author.name));
// 	console.log(chalk.yellow(info.videoDetails.likes));
// 	console.log(chalk.yellow(info.videoDetails.dislikes));

// 	let qualities = [];
// 	for (let i = 0; i < info.formats.length; i++) {
// 		if (info.formats[i].container === "mp4" && info.formats[i].qualityLabel) {
// 			console.log(
// 				chalk.blue(
// 					info.formats[i].itag +
// 						" " +
// 						info.formats[i].qualityLabel +
// 						" " +
// 						qualities.includes(info.formats[i].qualityLabel)
// 				)
// 			);
// 			if (qualities.includes(info.formats[i].qualityLabel) === false)
// 				qualities.push(info.formats[i].qualityLabel);
// 			else continue;
// 		}
// 	}
// 	console.log(chalk.white(qualities));
// 	let question2 = [
// 		{
// 			type: "list",
// 			name: "quality",
// 			message: "Enter your video quality",
// 			choices: qualities,
// 		},
// 	];
// 	return question2;
// };

// to download ytdl (URL,{
// filter :format=> format.itag == itag
// })
