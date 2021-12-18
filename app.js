const inquirer = require('inquirer');
const { retry } = require('rxjs');
// const fs = require("fs"); 
// const generatePage = require('./src/page-template.js');

const promptUser = () => {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            validate: nameInput => {
                if(nameInput){
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your github username',
            validate: githubName => {
                if (githubName){
                    return true;
                } else {
                    console.log('Please enter your github name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        },
    ]);
};



const promptProject = portfolioData => {

    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
        =================
        Add a New Project
        =================
    `);
    return inquirer
        .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: projectName => {
                if (projectName){
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projectDescription => {
                if (projectDescription){
                    return true;
                } else {
                    console.log('Please enter your github description!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the github link to your project. (Required)',
            validate: projectLink => {
                if (projectLink){
                    return true;
                } else {
                    console.log('Please enter your github link!');
                    return false; 
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        },
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
}

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
});
// const pageHTML = (fullName, github);


// fs.writeFile('./index.html', generatePage(fullName,github),err => {
//     if (err) throw err;
//     console.log('Portfolio complete! Check out index.html to see the output!');
// });