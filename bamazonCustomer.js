const inquirer = require("inquirer");
const mysql = require("mysql");
const table = require("table").table;
require('dotenv').config();

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASS,
    database: "bamazon_db"
})

connection.connect(err => {
    if (err) throw err;
})

const start = () => {
    console.log("\nWelcome to Bamazon!\n")
    // Running this application will first display all of the items available for sale
    displayProducts();
    // app prompt user
}

const displayProducts = () => {
    // connect to the database;
    // select * from products;
    connection.query("Select * FROM products", (err, data) => {
        if (err) throw err;
        // display each product (can use a package for nice display)
        const dataTable = data.map(row => [row.item_ID, row.product_name, row.department_name, row.price, row.stock_quantity]);
        console.log(table(dataTable))
        getUserAction();
    })
}

const getUserAction = () => {
    /**
      The app will then prompt the users with two messages.
      The first should ask them the ID of the product they would like to buy.
      The second message should ask how many units of the product they would like to buy.
     */
    inquirer.prompt([
        {
            name: "choice",
            type: "input",
            message: "Please enter the ID of the product you wish to purchase."
        },
        {
            name: "quantity",
            type: "input",
            message: "How many?"
        }
    ]).then(answers => {
        userSelection = answers;
        // safeguard that they enter an existing ID
        connection.query("SELECT * FROM products WHERE item_id=?", userSelection.choice, function (err, data) {
            for (let i = 0; i < data.length; i++) {
                if (userSelection.quantity > data[i].stock_quantity) {
                    console.log("\nSorry, we currently don't have enough in stock. Please try again later\n");
                    start();
                } else {
                    console.log("\nYou have chosen:\n");
                    console.log("Item: " + data[i].product_name);
                    console.log("Quantity: " + userSelection.quantity + "\n")
                    confirm();
                };
            }
        })
    });
}

let userSelection;
let newStock;

const confirm = () => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirmPrompt",
            message: "Would you like to proceed with purchase?",
            default: true
        }
    ]).then(function (userConfirm) {
        if (userConfirm.confirmPrompt === true) {
            updateStock();
            console.log("\nTransaction Complete\n");
            newTransactionPrompt();
        } else {
            console.log("\nTransaction Cancelled\n");
            newTransactionPrompt();
        }
    })
}

const newTransactionPrompt = () => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "newtransactionprompt",
            message: "Would you like to purchase anything else?",
            default: true
        }
    ]).then(function (userConfirm) {
        if (userConfirm.newtransactionprompt === true) {
            start();
        } else {
            console.log("\nThank you. Have a nice day!\n")
            connection.end();
        }
    })
}


const updateStock = () => {
    // const newStock = data[answers.choice].stock_quantity - answers.quantity;
    connection.query("Select * FROM products WHERE item_ID=?", userSelection.choice, (err, data) => {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            newStock = (data[i].stock_quantity - userSelection.quantity);
        }

        const query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: newStock
                },
                {
                    item_ID: userSelection.choice
                }
            ],

        )
    })

}

start();