#!/usr/bin/env node
const { URLprompt, qualityPrompt } = require("../utils/inquiries");
const { validateLink, getInfo, videoDownload } = require("../utils/ytdl");

let URL, itag;
const execute = async () => {
	let validation = false;
	let answers;
	while (!validation) {
		answers = await URLprompt();
		validation = await validateLink(answers.URL);
	}
	URL = answers.URL;
	let { qualities, title } = await getInfo(answers.URL);
	answers = await qualityPrompt(qualities);

	videoDownload(URL, qualities.indexOf(answers.quality), title);
};

execute();
