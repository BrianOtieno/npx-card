#!/usr/bin/env node

'use strict'

// const boxen = require("boxen");
import boxen from "boxen";
// const chalk = require("chalk");
import chalk from "chalk";
// const inquirer = require("inquirer");
import inquirer from "inquirer";
// const clear = require("clear");
import clear from "clear";
// const open = require("open");
import open from "open";
// const fs = require('fs');
import fs from "fs"
// const request = require('request');
import request from "request";
// const path = require('path');
import path from "path";
// const ora = require('ora');
import ora from "ora";
// const cliSpinners = require('cli-spinners');
import cliSpinners from "cli-spinners";

clear();

const prompt = inquirer.createPromptModule();

const questions = [
    {
        type: "list",
        name: "action",
        message: "What you want to do?",
        choices: [
            {
                name: `Send me an ${chalk.green.bold("email")}?`,
                value: () => {
                    open("mailto:obrienotieno@icloud.com");
                    console.log("\nAll Set!, Waiting to hear from you!\n");
                }
            },
            {
                name: `Download my ${chalk.magentaBright.bold("Resume")}?`,
                value: () => {
                    // cliSpinners.dots;
                    const loader = ora({
                        text: ' Downloading Profile',
                        spinner: cliSpinners.material,
                    }).start();
                    let pipe = request('https://regent-ai.com/brianotieno/profile').pipe(fs.createWriteStream('./brianotieno-profile.html'));
                    pipe.on("finish", function () {
                        let downloadPath = path.join(process.cwd(), 'brianotieno-profile.html')
                        console.log(`\nProfile Downloaded at ${downloadPath} \n`);
                        open(downloadPath)
                        loader.stop();
                    });
                }
            },
            {
                name: `Schedule a 30 minute ${chalk.redBright.bold("Meeting")}?`,
                value: () => {
                    open('https://calendly.com/brianotieno/30min');
                    console.log("\n See you soon! \n");
                }
            },
            {
                name: "Just quit.",
                value: () => {
                    console.log("Adios. Hasta la vista.\n");
                }
            }
        ]
    }
];

const data = {
    name: chalk.bold.green("             Brian Otieno"),
    handle: chalk.white("@BrianOtieno"),
    work: `${chalk.white("Chief Technology Officer at")} ${chalk
        .hex("#2b82b2")
        .bold("AI Regent")}`,
    twitter: chalk.gray("https://twitter.com/") + chalk.cyan("OBrienOtieno"),
    github: chalk.gray("https://github.com/") + chalk.green("BrianOtieno"),
    linkedin: chalk.gray("https://linkedin.com/in/") + chalk.blue("obrienotieno"),
    web: chalk.cyan("https://regent-ai.com"),
    npx: chalk.red("npx") + " " + chalk.white("brianotieno"),

    labelWork: chalk.white.bold("       Work:"),
    labelTwitter: chalk.white.bold("    Twitter:"),
    labelGitHub: chalk.white.bold("     GitHub:"),
    labelLinkedIn: chalk.white.bold("   LinkedIn:"),
    labelWeb: chalk.white.bold("        Web:"),
    labelCard: chalk.white.bold("       Card:")
};

const me = boxen(
    [
        `${data.name}`,
        ``,
        `${data.labelWork}  ${data.work}`,
        ``,
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        `${data.labelWeb}  ${data.web}`,
        ``,
        `${data.labelCard}  ${data.npx}`,
        ``,
        `${chalk.italic(
            "I am open to new collaborations in tech and innovation,"
        )}`,
        `${chalk.italic("my inbox is always open. Whether you have a")}`,
        `${chalk.italic(
            "question or just want to say hi, I will try "
        )}`,
        `${chalk.italic(
            "my best to get back to you!"
        )}`
    ].join("\n"),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: "single",
        borderColor: "green"
    }
);

console.log(me);
const tip = [
    `Tip: Try ${chalk.cyanBright.bold(
        "cmd/ctrl + click"
    )} on the links above`,
    '',
].join("\n");
console.log(tip);

prompt(questions).then(answer => answer.action());