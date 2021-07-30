const inquirer = require("inquirer");

const question1 = [
	{
		type: "input",
		name: "URL",
		message: "Please enter a valid youtube video URL",
	},
];

const URLprompt = async () => {
	return await inquirer.prompt(question1);
};

const qualityPrompt = async (qualities) => {
	let question2 = [
		{
			type: "list",
			name: "quality",
			message: "Choose between the available qualities that has audio",
			choices: qualities,
		},
	];
	return await inquirer.prompt(question2);
};

module.exports = {
	URLprompt,
	qualityPrompt,
};
