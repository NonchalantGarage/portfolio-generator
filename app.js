const inquirer = require('inquirer');
const { retry } = require('rxjs');
const generatePage = require('./src/page-template.js');
const generateSite = require('./utils/generate-site');

const {writeFile, copyFile} = require('./utils/generate-site');

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
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({confirmAbout}) => {
                if (confirmAbout){
                    return true;
                } else {
                    return false;
                }
            }
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
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
      return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
      console.log(writeFileResponse);
      return copyFile();
  })
  .then(copyFileResponse => {
      console.log(copyFileResponse);
  })
  .catch(err => {
      console.log(err);
  });
    



//   // TODO: Include packages needed for this application
// const fs = require('fs');
// const inquirer = require('inquirer');
// const generateMarkdown = require('./utils/generateMarkdown');


// const promptUser = () => {
//     return inquirer`
//     .prompt([
//         {
//             type: 'input',
//             name: 'title',
//             message: 'What is the title of your README.md?',
//             validate: titleInput => {
//                 if (titleInput) {
//                     return true;
//                 } else {
//                     return console.log('Please enter a title');
//                 }
//         }
//     }, 
//         // what is the title of your project

//         // Description 
//         // ToC
//         // Installation
//         // Usage
//         // License
//         // Contributing
//         // Tests 
//         // Questions 
//     ]);
// };   
// // TODO: Create an array of questions for user input
// const questions = [
    
// ];

// // TODO: Create a function to write README file
// function writeToFile(fileName, data) {}

// // TODO: Create a function to initialize app
// function init() {}

// // Function call to initialize app
// init();
// promptUser();