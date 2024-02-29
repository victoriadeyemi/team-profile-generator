const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const Employee = require("./lib/Employee");

const teamMembers = [];

function askManager() {
    inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the manager's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?"
        }
    ]).then(answers => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        teamMembers.push(manager);
        menuOptions();
    })  
}

function menuOptions () {
    inquirer.prompt ([
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: ["Add an Engineer", "Add an Intern", "Finish building my team"]
        }
    ]).then(answers => {
        if (answers.menu === "Add an Engineer") {
            askEngineer();
        } else if (answers.menu === "Add an Intern") {
            askIntern();
        } else {
            buildTeam();
        }
    })
}

function askEngineer() {
    inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github?"
        }
    ]).then(answers => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamMembers.push(engineer);
        menuOptions();
    })  
}


function askIntern() {
    inquirer.prompt ([
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email?"
        },
        {
            type: "input",
            name: "school",
            message: "What is the intern's school?"
        }
    ]).then(answers => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamMembers.push(intern);
        menuOptions();
    })  
}

function buildTeam() {
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}


askManager();
