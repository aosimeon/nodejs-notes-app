// Code Author: Amoo Olusola Simeon

// import commander from "commander";
// import inquirer from "inquirer";
// import chalk from "chalk";


const chalk = require("chalk");
const prompts = require("./prompts");
const notes = require("./notes")

console.log(chalk.blue.bold("# Note Taker v1.0.0"));


notes.setup();
prompts.mainMenu();
