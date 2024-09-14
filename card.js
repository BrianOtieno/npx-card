#!/usr/bin/env node

'use strict';

// Importing modules
import boxen from 'boxen';
import chalk from 'chalk';
import inquirer from 'inquirer';
import clear from 'clear';
import open from 'open';
import fs from 'fs';
import request from 'request';
import path from 'path';
import ora from 'ora';
import cliSpinners from 'cli-spinners';

// Clear console
clear();

// Create inquirer prompt
const prompt = inquirer.createPromptModule();

// Define questions for user interaction
const questions = [
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
            {
                name: `Send me an ${chalk.green.bold('email')}?`,
                value: () => {
                    open('mailto:obrienotieno@icloud.com');
                    console.log('\nAll set! Waiting to hear from you!\n');
                }
            },
            {
                name: `Download my ${chalk.magentaBright.bold('Profile')}?`,
                value: () => {
                    const loader = ora({
                        text: 'Downloading Profile...',
                        spinner: cliSpinners.material,
                    }).start();
                    
                    const filePath = path.join(process.cwd(), 'brianotieno-profile.html');
                    request('https://nairobi-quantum-fusion.com/brianotieno')
                        .pipe(fs.createWriteStream(filePath))
                        .on('finish', () => {
                            console.log(`\nProfile downloaded at ${filePath}\n`);
                            open(filePath);
                            loader.stop();
                        })
                        .on('error', (err) => {
                            console.error('Error downloading the profile:', err);
                            loader.stop();
                        });
                }
            },
            {
                name: `Schedule a 30-minute ${chalk.redBright.bold('Meeting')}?`,
                value: () => {
                    open('https://calendly.com/brianotieno/30min');
                    console.log('\nSee you soon!\n');
                }
            },
            {
                name: 'Just quit.',
                value: () => {
                    console.log('Adios. Hasta la vista.\n');
                }
            }
        ]
    }
];

// Define user profile data
const data = {
    name: chalk.bold.green('Brian Otieno'),
    handle: chalk.white('@BrianOtieno'),
    work: `${chalk.white('Founder & Quantum Scientist at')} ${chalk.hex('#2b82b2').bold('NQF')}`,
    twitter: chalk.gray('https://twitter.com/') + chalk.cyan('OBrienOtieno'),
    github: chalk.gray('https://github.com/') + chalk.green('BrianOtieno'),
    linkedin: chalk.gray('https://linkedin.com/in/') + chalk.blue('obrienotieno'),
    web: chalk.cyan('https://nairobi-quantum-fusion.com'),
    npx: chalk.red('$ npx') + ' ' + chalk.magenta('brianotieno'),

    labelWork: chalk.white.bold('       Work:'),
    labelTwitter: chalk.white.bold('    Twitter:'),
    labelGitHub: chalk.white.bold('     GitHub:'),
    labelLinkedIn: chalk.white.bold('   LinkedIn:'),
    labelWeb: chalk.white.bold('        Web:'),
    labelCard: chalk.white.bold('       Card:')
};

// Generate and display user profile
const profile = boxen(
    [
        `${data.name}`,
        '',
        `${data.labelWork}  ${data.work}`,
        '',
        `${data.labelTwitter}  ${data.twitter}`,
        `${data.labelGitHub}  ${data.github}`,
        `${data.labelLinkedIn}  ${data.linkedin}`,
        `${data.labelWeb}  ${data.web}`,
        '',
        `${data.labelCard}  ${data.npx}`,
        '',
        `${chalk.italic('I am open to collaborations in quantum research & innovation,')}`,
        `${chalk.italic('my inbox is always open. Whether you have a')}`,
        `${chalk.italic('question or just want to say hi, I will try my best')}`,
        `${chalk.italic('to get back to you!')}`
    ].join('\n'),
    {
        margin: 1,
        float: 'center',
        padding: 1,
        borderStyle: 'single',
        borderColor: 'green'
    }
);

console.log(profile);

// Display tip for interactive elements
const tip = [
    `Tip: Try ${chalk.cyanBright.bold('cmd/ctrl + click')} on the links above`,
    ''
].join('\n');
console.log(tip);

// Prompt user for action
prompt(questions).then(answer => {
    if (typeof answer.action === 'function') {
        answer.action();
    }
});
