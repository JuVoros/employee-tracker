const inquirer = require('inquirer');
const mysql = require('mysql2')

// Add figlet (BIG TEXT DESINGS IN TERMINAL)
// CLI-TABLE3  (BETTER TABLE CONFIGURATION)
const questions = [
    {
        type:'list',
        message: 'What would you like to do?',
        choices:[

        ]
    }
];

const addDeptQuestions = [
    {
        type:'input',
        message:'Enter department name to add:',
        name: 'dbNew'
    }
]


