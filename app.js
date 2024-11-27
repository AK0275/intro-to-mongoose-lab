const mongoose = require('mongoose')
const prompt = require('prompt-sync')()
require('dotenv').config()
const Customer = require('./models/Customer')


const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
}

const name = prompt('What is your name?')

console.log(`Your name is ${name}`)

const askChoice = () => {
    console.log("\n What would you like to do? \n",
        "1. Create a customer?\n",
        "2. View All Customers?\n",
        "3. Update Customer Info?\n",
        "4. Delete a customer?\n",
        "5. Quit?\n")

        const selection = prompt('make the number of action to run: ')
        return parseInt(selection)
}

const createCustomer= async ()=> {
        const name = prompt("Customer Name: ")
        const age = prompt("Customer Age: ")
        const customer = await Customer.create({name, age})
        console.log("Customer added with details:", customer)
    }

const viewCustomers = async () => {
        const customers = await Customer.find()
        console.log('Customer List: ', customers)
    }

const updateCustomer = async () => {
        const id = prompt('Enter the customer ID that you want to update: ')
        const name =prompt("Enter the name: ");
        const age = prompt("Enter the age: ");
        const updatedCustomer = await Customer.findByIdAndUpdate(id, { name, age })
        console.log('Customer Updated!')
    }

const deleteCustomer = async () => {
        const id = prompt('Enter the costomer ID that you want to delete: ')
        const deletedCustomer = await Customer.findByIdAndDelete(id)
        console.log('Customer Deleted!', deletedCustomer)
    }

const choices = async () => {
let choice = askChoice()
    console.log(choice)
    
    switch(choice) {
    case 1:
        await createCustomer()
        break;
    case 2:
        await viewCustomers()
        break;
    case 3:
        await updateCustomer()
        break;
    case 4:
        await deleteCustomer()
        break;
    case 5:
        console.log("Done")
        mongoose.connection.close()
        break;
        default:
    console.log("Incorrect Choice.")
    }
}
        
        
choices()
connect()