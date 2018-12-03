# Bamazon

## Introduction

Bamazon is an Amazon-like node application that connects to a SQL database using MySQL. This application has two views, customer and manager, each of which uses the NPM Inquirer package to prompt the user to enter commands that will manipulate the SQL database.

[YouTube](https://youtu.be/84QnAOHHAKo) video of functionality of customer view.
<br>
[YouTube](https://youtu.be/5vX3ZIRpKNQ) video of functionality of manager view.

## Required NPM Packages
   * [Inquirer](https://www.npmjs.com/package/inquirer) - used to capture user input in terminal

   * [MySQL](https://www.npmjs.com/package/mysql) - used to manipulate database using MySql commands

   * [Table](https://www.npmjs.com/package/table) - used to format database info in terminal window

   * [DotEnv](https://www.npmjs.com/package/dotenv) - used to hide server password from repository

## Getting Started
1. Clone the repo
2. Run the NPM install for all the above packages
3. Create a SQL database with the data in the sql file
4. Add your MySql password to the code

## Available Functions
### Customer View
* Display database of items in table
* Choose item and quantity
* Confirming purhcase will remove that quanitity of items from database
* Choosing a quantity higher than the stock in database will return the message "Sorry, we currently don't have enough in stock. Please try again later"

### Manager View
User is given four menu items:
* View Products: Displays table of products
* View Low Inventory: Displays table of products where stock is less than 10. If no items have stock under 10, the application will return the message "No Items Found"
* Add to Inventory: Prompts the user to choose which item inventory will be added to and in what quantity
* Add New Product: Prompts the user to enter information for a new product that will be added to the database.