// Code Author: Amoo Olusola Simeon

const inquirer = require('inquirer');
const notes = require("./notes");
const chalk = require("chalk");

// mainMenu prompt
function mainMenu() {
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: ["Add Topic", "Add Note", "View Notes", "Delete Note", "Delete Topic", "Exit"],
        }
    ]).then((answers) => {
        switch (answers.action) {
            case "Add Topic":
                addTopicPrompt();
                break;
            case "Add Note":
                addNotePrompt();
                break;
            case "View Notes":
                viewNotesPrompt();
                break;
            case "Delete Note":
                deleteNotePrompt();
                break;
            case "Delete Topic":
                deleteTopicPrompt();
                break;
            case "Exit":
                console.log(chalk.blue.bold("Bye!"));
                break;
        }
    })
}

// Go back to main menu prompt
function mainMenuPrompt() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "action",
            message: "Go to the main menu? ",
            default: false
        }
    ]).then(answers => {
        if (answers.action) {
            mainMenu();
        } else {
            console.log(chalk.blue.bold("Bye!"));
        }
    });
}

// Add Topic Prompt
function addTopicPrompt() {
    inquirer.prompt([
        {
            type: "input",
            name: "topicName",
            message: "Topic Name: ",
        }
    ]).then(answers => {
        let topicName = answers.topicName.toLowerCase();
        notes.addTopic(topicName);
        mainMenuPrompt();
    });
}

// Add Note Prompt
function addNotePrompt() {
    if (notes.getTopics().length != 0) {
        inquirer.prompt([
            {
                type: "list",
                name: "topic",
                message: "Choose Topic: ",
                choices: notes.getTopics()
            },
            {
                type: "input",
                name: "title",
                message: "Title: ",
            },
            {
                type: "input",
                name: "body",
                message: "Type Note: ",
            }
        ]).then(answers => {
            notes.addNote(answers.topic, answers.title, answers.body);
            mainMenuPrompt()
        });
    } else {
        console.log(chalk.blue.bold("You have not created any topics yet!"));
        mainMenuPrompt()
    }

}

// View Notes Prompt
function viewNotesPrompt() {
    if (notes.getTopics().length != 0) {
        inquirer.prompt([
            {
                type: "list",
                name: "topic",
                message: "Choose Topic: ",
                choices: notes.getTopics()
            },
        ]).then(answers => {
            let topic = answers.topic;

            if (notes.getNotes(topic).length !== 0) {
                inquirer.prompt([
                    {
                        type: "list",
                        name: "title",
                        message: "Choose Note: ",
                        choices: notes.getNotes(topic)
                    }
                ]).then(answers => {
                    notes.viewNote(topic, answers.title);
                    mainMenuPrompt();
                });

            } else {
                console.log(chalk.blue.bold(`You have not created any note in ${topic} yet!`));
                mainMenuPrompt();
            }
        });
    } else {
        console.log(chalk.blue.bold(`You have not created any topics yet!`));
        mainMenuPrompt();
    }
}

// Delete Note Prompt
function deleteNotePrompt() {
    if (notes.getTopics().length != 0) {
        inquirer.prompt([
            {
                type: "list",
                name: "topic",
                message: "Choose Topic To Delete: ",
                choices: notes.getTopics()
            },
        ]).then(answers => {
            let topic = answers.topic;

            if (notes.getNotes(topic).length != 0) {
                inquirer.prompt([
                    {
                        type: "list",
                        name: "title",
                        message: "Choose Note To Delete: ",
                        choices: notes.getNotes(topic)
                    }
                ]).then(answers => {
                    notes.deleteNote(topic, answers.title);
                    mainMenuPrompt()
                });
            } else {
                console.log(chalk.blue.bold(`You have not created any notes in ${topic} yet!`));
                mainMenuPrompt();
            }
        });
    } else {
        console.log(chalk.blue.bold("You have not created any topics yet!"));
        mainMenuPrompt();
    }
}

// Delete Topic Prompt
function deleteTopicPrompt() {
    if (notes.getTopics().length != 0) {
        inquirer.prompt([
            {
                type: "list",
                name: "topic",
                message: "Choose Topic To Delete: ",
                choices: notes.getTopics()
            }
        ]).then(answers => {
            notes.deleteTopic(answers.topic);
            mainMenuPrompt();
        });
    } else {
        console.log(chalk.bold.blue("You have not created any topics yet!"));
        mainMenuPrompt()
    }

}

module.exports = {
    mainMenu,
}