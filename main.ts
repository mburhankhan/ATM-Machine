import inquirer from "inquirer";
import { faker } from "@faker-js/faker"


interface User {
    name: string;
    pin: number;
    balance: number;
    id: number;
    accountNumber: number;
}

const createUsers = () => {
    let users: User[] = []
    for (let i = 0; i < 99; ++i) {
        let user: User = {
            name: faker.person.fullName(),
            pin: 5000 + i,
            balance: 1000 * i,
            id: 1000 + i,
            accountNumber: Math.floor(1000000 * (Math.random() * 50000))
        }
        users.push(user)
    }
    return users
}

const usersData = createUsers();



const response = async (usersData: User[]) => {
    const res = await inquirer.prompt([
        {
            type: "number",
            message: "Enter your ID?",
            name: "id"
        },
        {
            type: "number",
            message: "Enter your pin code?",
            name: "pin"
        }
    ])
    const user = usersData.find(val => val.id === res.id && val.pin === res.pin)
    if (user) {
        console.log(`Welcome ${user.name}`)
        return atmFunction(user)
    }
    else {
        return console.log(`Entered Invalid ID & Pincode`)
    }

}

const atmFunction = async (user: User) => {
    const ans = await inquirer.prompt([
        {
            type: "list",
            choices: ["Withdraw", "Deposit", "Balance"],
            message: "Which operation do you want to perform?",
            name: "operation"
        }
    ])
    if (ans.operation === "Withdraw") {
        const withdraw = await inquirer.prompt([
            {
                type: "number",
                message: "Enter Amount",
                name: "withdrawlAmount"
            }
        ])
        if (withdraw.withdrawlAmount > user.balance) {
            console.log(`Insufficient Balance on your account`)
            console.log(`Balance: ${user.balance}`)
        }
        else {
            console.log(`Withdrawl Amount: ${withdraw.withdrawlAmount}`);
            console.log(`Balance Amount: ${user.balance - withdraw.withdrawlAmount}`)
        }
    }
    if (ans.operation === "Deposit") {
        const deposit = await inquirer.prompt([
            {
                type: "number",
                message: "Enter Amount",
                name: "depositAmount"
            }
        ])
        console.log(`Deposit Amount: ${deposit.depositAmount}`);
        console.log(`Balance Amount: ${user.balance + deposit.depositAmount}`)
    }
    if (ans.operation === "Balance") {
        return console.log(`Balance: ${user.balance}`)
    }
}


response(usersData)

