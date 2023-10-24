const inquirer = require('inquirer');
const fs = require('fs');

// define constant to add license badge to generated read-me
const licensesBadgeUrls = {
    Apache: 'https://img.shields.io/badge/License-Apache%202.0-blue.svg',
    GNU: 'https://img.shields.io/badge/License-GPLv3-blue.svg',
    OpenBSD: 'https://img.shields.io/badge/License-OpenBSD-blue.svg',
    Rust: 'https://img.shields.io/badge/License-MIT-blue.svg',
    ISC: 'https://img.shields.io/badge/License-ISC-blue.svg',
    MIT: 'https://img.shields.io/badge/License-MIT-yellow.svg',
    Mozilla: 'https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg',
    Boost: 'https://img.shields.io/badge/License-Boost_1.0-lightblue.svg',
    Eclipse: 'https://img.shields.io/badge/License-EPL_1.0-red.svg',
};

const generateREADME = (ProjectTitle, description, install, usage, license, contributing, tests, github, email, phone) => {
    const badgeUrl = licensesBadgeUrls[license];
    const licenseBadge = `![${license} License](${badgeUrl})`;
    const licenseNotice = `
    ## License
    This application is covered under the [${license} License](${badgeUrl}).`;
    return `
# ${ProjectTitle}
# ${licenseBadge}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Description
${description}

## Installation
${install}

## Usage
${usage}

## License
${licenseBadge}
${licenseNotice}

## Contributing
${contributing}

## Tests
${tests}

## Questions
- GitHub Profile: [${github}](https://github.com/${github})
- Email: ${email}
- Phone: ${phone}`;
}

inquirer
    .prompt([
        {
            type: 'input',
            name: 'ProjectTitle',
            message: 'What is your project name?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a brief description of your project.'
        },
        {
            type: 'input',
            name: 'install',
            message: 'How can a user install your project?'
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Provide instructions and examples for use. Note, to add screenshot add file path.'
        },
        {
            type: 'list',
            message: 'Choose a license type you want included in your README.',
            name: 'license',
            choices: ['Apache', 'GNU', 'OpenBSD', 'Rust', 'ISC', 'MIT', 'Mozilla', 'Boost', 'Eclipse']
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'What guidelines would you like to include for the developer community to contribute to your project?'
        },
        {
            type: 'input',
            name: 'tests',
            message: 'What specific instructions so you want to include to run tests (hint, include the commands to test)?'
        },
        // Add prompts for GitHub profile, email, and phone
        {
            type: 'input',
            name: 'github',
            message: 'GitHub Profile (username):'
        },
        {
            type: 'input',
            name: 'email',
            message: 'Email address:'
        },
        {
            type: 'input',
            name: 'phone',
            message: 'Phone number:'
        },
    ])
    .then((answers) => {
        const { ProjectTitle, description, install, usage, contributing, tests, github, email, phone } = answers;
        const license = answers.license;
        const readMe = generateREADME(ProjectTitle, description, install, usage, license, contributing, tests, github, email, phone);
        console.log(readMe)
        // Generate the table of contents for the updated README content
        fs.writeFileSync('README.md', readMe, (err) => err ? console.log(err) : console.log('success'));
    });