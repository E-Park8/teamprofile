const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const { prompt } = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./Develop/lib/htmlRenderer");
const Employee = require("./Develop/lib/Employee");


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

let employees = []

const newEmployee = () => {
    prompt([
        {
            type: 'list',
            name: 'role',
            choices: ['Engineer', 'Intern', 'Manager'],
            message: 'What is the role of the employee?'
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the employee?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee ID:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Enter employee email:'
        }
    ])
    .then(employee => {
        switch (employee.role) {
            case 'Engineer':
                newEngineer(employee)
                break
            case 'Intern':
                newIntern(employee)
                break
            case 'Manager':
                newManager(employee)
                break
        }
    })
    .catch(err => console.log(err))
}

const newManager = (employee) => {
    prompt([
          {
              type: 'input',
              name: 'officeNumber',
              message: 'Enter Manager office number'
          }
      ])
          .then (manager => {
             employees.push(new Manager(employee.name, employee.id, employee.email, manager.officeNumber))
             addEmployee()
          })
          .catch(err => console.log(err))
  }

  const newIntern = (employee) => {
    prompt([
          {
              type: 'input',
              name: 'school',
              message: 'What school does the intern attend?'
          }
      ])
          .then (intern => {
             employees.push(new Intern(employee.name, employee.id, employee.email, intern.school))
             addEmployee()
          })
          .catch(err => console.log(err))
  }

  const newEngineer = (employee) => {
    prompt([
          {
              type: 'input',
              name: 'github',
              message: 'What is their github username?'
          }
      ])
          .then (engineer => {
             employees.push(new Engineer(employee.name, employee.id, employee.email, engineer.github))
             addEmployee()
          })
          .catch(err => console.log(err))
  }


const addEmployee = () => {
    prompt({
        type: 'list',
        name: 'select',
        choices: ['Add another employee', 'Done'],
        message: 'Make a selection:' 

    })
    .then (select => {
        switch (select.select) {
            case 'Add another employee':
                newEmployee()
                break
            case 'Done':
                console.log(select.select)
                // const html = render(employees)
                // fs.writeFileSync()
        }
    })
    .catch(err => console.log(err))
}

newEmployee()