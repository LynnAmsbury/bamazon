// Require in npm packages
require('dotenv').config();
var mysql = require("mysql");
var inquirer = require("inquirer");

// To connect with the MySQL database and load data
var connection = mysql.createConnection({
    host: "localhost",

    // Port
    port: 3306,

    // Username
    user: "root",

    // Password
    password: process.env.DB_PASS,
    database: "bamazon_db"
});

// Throws an error if the connection with MySQL cannot be made; loads data if no error
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log("Welcome to Bamazon!");
    afterConnection();
});

// Loads products from the database and prints them to the console
var inventory;
function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inventory = res;
        start();
    });
}

// Function which prompts the user for what action they should take
function start() {
    console.table(inventory);
    inquirer
        .prompt([{
                name: "idNumberQuestion",
                type: "input",
                message: "What is the id number of the item you would like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false && parseInt(value) > 0) {
                        return true;
                    }
                    console.log("\nNot a valid number, please try again");
                    return false;
                }
            },
            {
                name: "howMany",
                type: "input",
                message: "How many units would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false && parseInt(value) > 0) {
                        return true;
                    }
                    console.log("\nNot a valid number, please try again");
                    return false;
                }
            }
        ])
        .then(function (answer) {
            var purchaseId = parseInt(answer.idNumberQuestion);
            var quantity = parseInt(answer.howMany);

            // Make sure there's no bad input and assume everything is going to go wrong...
            var foundIndex = -1; // Nonexistent index
            var updatedInventory;
            // Run through all items
            for (i = 0; i < inventory.length; i++) {
                // If the product id is found, then we have the item
                if (inventory[i].item_id === purchaseId) {
                    foundIndex = i;
                    // Check if the quantity is sufficient
                    if (inventory[foundIndex].stock_quantity >= quantity) {
                        // If so, we can fulfill the order
                        console.log('Your item(s) are in stock!');
                        let total_cost = inventory[foundIndex].price * quantity;
                        console.log('Total cost: $' + total_cost);
                        inventory[foundIndex].stock_quantity -= quantity; // Deduct purchased quantity from the master record
                        let updateQuery = "UPDATE products";
                        updateQuery += " SET stock_quantity=stock_quantity-" + quantity
                        updateQuery += " WHERE item_id=" + purchaseId;
                        connection.query(updateQuery, function (err, res) {
                            start();
                        });
                        return; // Make sure not to run start before database has had a chance to update

                    }
                    else {
                        console.log("Sorry, not enough items in stock.");
                    }
                    break; // No need to continue through for loop since we found the purchaseId
                }
            }
            // If something is wrong with the user request
            if (foundIndex == -1) {
                console.log("Please enter a valid item number.");
            }
            start(); // This should be async because start() call is inside async inquirer
            
        });
}
// connection.end();