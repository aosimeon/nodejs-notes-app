// Code Author: Amoo Olusola Simeon

// import fs from "fs";
// import path from "path";
// import chalk from "chalk";

const fs = require("fs");
const chalk = require("chalk");

function setup() {
	fs.stat("./notes", function(err) {
		if (!err) {
			// Do nothing
		} else if (err.code === "ENOENT") {
			// Create notes directory
			fs.mkdirSync("./notes");
		}
	});
	
	fs.stat("./notes/topics", function(err) {
		if (!err) {
			// Do nothing
		} else if (err.code === "ENOENT") {
			// Create topics directory
			fs.mkdirSync("./notes/topics");
		}
	});
}

function getTopics() {
	let topics;
	try {
		topics = fs.readdirSync("./notes/topics");
	} catch (err) {
		console.error(err);
	}

	return topics;
}

function getNotes(topic) {
	let dirContents;
	try {
		dirContents = fs.readdirSync(`./notes/topics/${topic}`);
	} catch (err) {
		console.error(err);
	}
	dirContents = dirContents.map(note => {
		return note.slice(0, -4).split("_").join(" ");
	});
	return dirContents;
}

function addTopic(topicName) {
	
	let dir = "notes/topics/" + topicName;

	try {
		fs.statSync(dir);
		console.log(chalk.blue.bold("Topic already exists!"));
	} catch (err) {
		if (err.code === "ENOENT") {
			fs.mkdirSync(dir);
			console.log(chalk.blue.bold("Topic created!"));
		} else {
			console.log(chalk.red.bold(err));
		}
	}
}

function addNote(topic, title, body) {
	const filename = title.split(" ").join("_") + ".txt";
	const fileLoc = "./notes/" + "topics/" + topic + "/" + filename;
	try {
		fs.writeFileSync(fileLoc, body, { mode: 0o755 });
		console.log(chalk.blue.bold("Note Added!"));
	} catch (err) {
		console.error(err);
	}
}

function viewNote(topic, title) {
	let content;
	title = title.split(" ").join("_") + ".txt";
	let noteLoc = `./notes/topics/${topic}/${title}`;
	try {
		content = fs.readFileSync(noteLoc, { encoding: "utf8" });
	} catch(err) {
		console.log(err);
	}

	console.log(chalk.blue.bold(content));
}

function deleteNote(topic, title) {
	title = title.split(" ").join("_") + ".txt";
	let noteLoc = `./notes/topics/${topic}/${title}`;
	fs.unlinkSync(noteLoc);
	console.log(chalk.blue.bold("Note Deleted!"));
}

function deleteTopic(topic) {
	let topicLoc = `./notes/topics/${topic}`;
	try {
		fs.rmdirSync(topicLoc, { recursive: true });
		console.log(chalk.blue.bold(`${topic} Deleted!`));
	} catch (err) {
		console.error(err);
	}
}

module.exports = {
	setup,
	getTopics,
	getNotes,
	addTopic,
	deleteTopic,
	addNote,
	deleteNote,
	viewNote
}