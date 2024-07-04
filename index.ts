#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// Game variables
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamageToHero = 25;

// Player variables
let heroHealth = 100;
let attackDamageToEnemy = 50;
let numberHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50; // Percentage

// while loop condition
let gameRunning = true;

console.log(chalk.bold.cyan("Welcome to DeadZone"));

async function game() {
    while (gameRunning) {
        let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1);
        let enemyIndex = Math.floor(Math.random() * enemies.length);
        let enemy = enemies[enemyIndex];

        console.log(chalk.bold.red(`# ${enemy} has appeared #\n`));

        while (enemyHealth > 0 && heroHealth > 0) {
            console.log(chalk.green(`Your Health: ${heroHealth}`));
            console.log(chalk.red(`${enemy} Health: ${enemyHealth}`));

            let options = await inquirer.prompt({
                name: "ans",
                type: "list",
                message: "What would you like to do?",
                choices: ["1. Attack", "2. Take Health Potion", "3. Run"]
            });

            if (options.ans === "1. Attack") {
                let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1);
                let damageToHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1);

                enemyHealth -= damageToEnemy;
                heroHealth -= damageToHero;

                console.log(chalk.blue(`You strike the ${enemy} for ${damageToEnemy} damage.`));
                console.log(chalk.red(`${enemy} strikes you for ${damageToHero} damage.`));

                if (heroHealth < 1) {
                    console.log(chalk.red("You have taken too much damage. You are too weak to continue."));
                    break;
                }
            } else if (options.ans === "2. Take Health Potion") {
                if (numberHealthPotions > 0) {
                    heroHealth += healthPotionHealAmount;
                    numberHealthPotions--;

                    console.log(chalk.yellow(`You use a health potion for ${healthPotionHealAmount}.`));
                    console.log(chalk.green(`You now have ${heroHealth} health.`));
                    console.log(chalk.yellow(`You have ${numberHealthPotions} health potions left.`));
                } else {
                    console.log(chalk.red("You have no health potions left. Defeat enemies for a chance to get health potions."));
                }
            } else if (options.ans === "3. Run") {
                console.log(chalk.gray(`You run away from the ${enemy}.`));
                continue;
            }
        }

        if (heroHealth < 1) {
            console.log(chalk.red("You are out of the battle. You are too weak."));
            break;
        }

        console.log(chalk.green(`${enemy} was defeated!`));
        console.log(chalk.green(`You have ${heroHealth} health.`));

        let randomNumber = Math.floor(Math.random() * 100 + 1);
        if (randomNumber < healthPotionDropChance) {
            numberHealthPotions++;
            console.log(chalk.yellow(`The ${enemy} dropped a health potion.`));
            console.log(chalk.green(`Your health is ${heroHealth}.`));
            console.log(chalk.yellow(`You now have ${numberHealthPotions} health potions.`));
        }

        let userOption = await inquirer.prompt({
            name: "ans",
            type: "list",
            message: "What would you like to do now?",
            choices: ["1. Continue", "2. Exit"]
        });

        if (userOption.ans === "1. Continue") {
            console.log(chalk.cyan("You continue on your adventure."));
        } else {
            console.log(chalk.cyan("You successfully exit from DeadZone."));
            break;
        }

        console.log(chalk.bold.cyan("Thank you for playing.\n"));
    }
}

game();
