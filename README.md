# Glue config

## Motivation

Scrolling through twitter timeline, I saw a tweet (https://twitter.com/jachands/status/1500173829733240844) about messy config files on NodeJS projects.

Based on that, I've created a package that creates the config files using a **config.js** pre-configured and, when you run the application, it's create the file on **/tmp/** fs and generate a symlink. It'll unlink them when the process exit (gracefully or not).

## Setup

To create the config.js, just add an array of objects that contains filename and content properties, like this:

```js
module.exports = [
    {
        filename: ".env",
        content: `
            PORT=3000
        `
    },
    {
        filename: ".eslintrc.js",
        content: `
            {
                "extends": "eslint:recommended",
            }
        `
    }
]
```

And on your index.js, just add this:

```js
require('glue-config')();
require('dotenv').config();

console.log(process.env.PORT)
```

And that's it.