const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const inquirer = require("inquirer");

let team = []

async function getManagerInfo(){
    let managerInfo = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please enter your manager's name"
        },
        {
            name: "id",
            type: "input",
            message: "Please enter your manager's id"
        },
        {
            name: "email",
            type: "input",
            message: "Please enter your manager's email"
        },
        {
            name: "officeNumber",
            type: "input",
            message: "Please enter your manager's office number"
        },
        {
            name: "nextstep",
            type: "list",
            message: "Please select another team profile to build, or complete the team",
            choices: ["Build engineer profile", "Build intern profile", "Finish team"]
        },
    ])

    team.push(new Manager(managerInfo.name, managerInfo.id, managerInfo.email, managerInfo.officeNumber))

    switch (managerInfo.nextstep){
        case 'Build engineer profile':
            getEnginnerInfo();
            break;
        case 'Build intern profile':
            getInternInfo();
            break;
        case 'Finish team':
            loadHTML();
            break; 
    }
}

async function getEnginnerInfo(){
    let enginnerInfo = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please enter your enginner's name"
        },
        {
            name: "id",
            type: "input",
            message: "Please enter your enginner's id"
        },
        {
            name: "email",
            type: "input",
            message: "Please enter your enginner's email"
        },
        {
            name: "gitHub",
            type: "input",
            message: "Please enter your enginner's gitHub"
        },
        {
            name: "nextstep",
            type: "list",
            message: "Please select another team profile to build, or complete the team",
            choices: ["Build another engineer profile", "Build intern profile", "Finish team"]
        },
    ])
    team.push(new Engineer(enginnerInfo.name, enginnerInfo.id, enginnerInfo.email, enginnerInfo.gitHub))

    switch (enginnerInfo.nextstep){
        case 'Build another engineer profile':
            getEnginnerInfo();
            break;
        case 'Build intern profile':
            getInternInfo();
            break;
        case 'Finish team':
            loadHTML();
            break; 
    }
}

async function getInternInfo(){
    let interInfo = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Please enter your intern's name"
        },
        {
            name: "id",
            type: "input",
            message: "Please enter your intern's id"
        },
        {
            name: "email",
            type: "input",
            message: "Please enter your intern's email"
        },
        {
            name: "school",
            type: "input",
            message: "Please enter your intern's school"
        },
        {
            name: "nextstep",
            type: "list",
            message: "Please select another team profile to build, or complete the team",
            choices: ["Build engineer profile", "Build another intern profile", "Finish team"]
        },
    ])
    team.push(new Intern(interInfo.name, interInfo.id, interInfo.email, interInfo.school))

    switch (interInfo.nextstep){
        case 'Build engineer profile':
            getEnginnerInfo();
            break;
        case 'Build another intern profile':
            getInternInfo();
            break;
        case 'Finish team':
            loadHTML();
            break; 
    }
    
}

function loadHTML(){
    console.log(team)
}
getManagerInfo()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
