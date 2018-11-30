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
    inquirer
        .prompt([
            {
                type: "list",
                message: "Wecome manager! What would you like to do?\n\n",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                name: "managerList"
            }
        ])

        .then(function (inquirerResponse) {
            if (inquirerResponse.managerList === "View Products for Sale") {
                displayProducts();
            } else if
            (inquirerResponse.managerList === "View Low Inventory") {
                viewLowInventory();
            } else if
            (inquirerResponse.managerList === "Add to Inventory") {
                showItems();
            } else if
            (inquirerResponse.managerList === "Add New Product") {
                addNewProduct();
            }

        })
}

const displayProducts = () => {
    // connect to the database;
    // select * from products;
    connection.query("Select * FROM products", (err, data) => {
        if (err) throw err;
        // display each product (can use a package for nice display)
        const dataTable = data.map(row => [row.item_ID, row.product_name, row.department_name, row.price, row.stock_quantity]);
        console.log(table(dataTable))
        start();
    })
}

const viewLowInventory = () => {
    connection.query("Select * FROM products WHERE stock_quantity < 10", (err, data) => {
        // if (err) throw err;
        if (data == "") {
            console.log("\nNo Items Found\n")
            start();
        } else {
            const dataTable = data.map(row => [row.item_ID, row.product_name, row.department_name, row.price, row.stock_quantity]);

            console.log(table(dataTable))
            start();
        }


    })
}

const showItems = () => {
    connection.query("Select * FROM products", (err, data) => {
        if (err) throw err;
        const dataTable = data.map(row => [row.item_ID, row.product_name, row.department_name, row.price, row.stock_quantity]);
        console.log(table(dataTable))
        addToInventory();
    })
}

const addToInventory = () => {

    inquirer.prompt([
        {
            name: "choice",
            type: "input",
            message: "\nPlease enter the ID of the product that you would like to add inventory to."
        },
        {
            name: "quantity",
            type: "input",
            message: "How many units would you like to add?"
        }
    ]).then(answers => {
        userSelection = answers;
        connection.query("SELECT * FROM products WHERE item_id=?", userSelection.choice, function (err, data) {
            console.log("\nYou are adding inventory to:");
            console.log("Item: " + data[0].product_name);
            console.log("Quantity: " + userSelection.quantity + "\n");
            confirm();
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
            message: "Would you like to proceed with the inventory adjustment?",
            default: true
        }
    ]).then(function (userConfirm) {
        if (userConfirm.confirmPrompt === true) {
            updateStock();
            console.log("\nAdjustment Complete\n");
            newAdjustmentPrompt();
        } else {
            console.log("\nAdjustment Cancelled\n");
            newAdjustmentPrompt();
        }
    })
}

const newAdjustmentPrompt = () => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "newadjustmentprompt",
            message: "Would you like to adjust anything else?",
            default: true
        }
    ]).then(function (userConfirm) {
        if (userConfirm.newadjustmentprompt === true) {
            showItems();
        } else {
            start();
        }
    })
}


const updateStock = () => {
    // const newStock = data[answers.choice].stock_quantity - answers.quantity;
    connection.query("Select * FROM products WHERE item_ID=?", userSelection.choice, (err, data) => {
        if (err) throw err;
        for (let i = 0; i < data.length; i++) {
            newStock = (data[i].stock_quantity + (parseInt(userSelection.quantity)));
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

const addNewProduct = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "Name:",
            name: "newProductName"
        },
        {
            type: "input",
            message: "Department:",
            name: "newProductDepartment"
        },
        {
            type: "input",
            message: "Price:",
            name: "newProductPrice"
        },
        {
            type: "input",
            message: "Quantity:",
            name: "newProductQuantity"
        }
    ]).then(answers => {
        userSelection = answers;
        connection.query("INSERT INTO products SET ?",
            {
                product_name: userSelection.newProductName,
                department_name: userSelection.newProductDepartment,
                price: userSelection.newProductPrice,
                stock_quantity: userSelection.newProductQuantity
            },
            function (err, data) {
                console.log("Item Added!")
                start();
            }
        );
    })
}


start();