# bamazon

## Summary

Bamazon is a CLI app featuring an Amazon-like storefront created with Node.js and MySQL. The app takes in orders from customers and depletes stock from the store's inventory. All bamazon data is stored in a MySQL database.

## npm modules used

inquirer, mysql, and dotenv

## Installation

* Clone this repository to the directory of your choice
* Run `npm install`
* Run the SQL in `schema.sql` in MySQL Workbench

## Use

Run `node bamazonCustomer`

![node bamazonCustomer command](/images/nodeBamazonCustomerCommand.png)

The following should then display:

![node bamazonCustomer results](/images/nodeBamazonCustomerResults.png)

Follow the two prompts:

![follow inquirer prompts](/images/followInquirerPrompts.png)

After placing the order, the application should check to see if the mock store has enough of the product to meet the request. If not, the app logs 'Sorry, not enough items in stock' and prevents the order from going through:

![insufficient quantity](/images/insufficientQuantity.png)

If enough of the product is in stock, the customer's order is fulfilled and the customer's total cost displays:

![successful purchase](/images/successfulPurchase.png)