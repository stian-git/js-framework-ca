# GameZ

![image](https://tekniskpotet.no/img/gamez-screenshot.jpg)

A list of games retrieved from the Rawg.io API with info and description of each game.

# Table of Contents

- [Description](#description)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Contact](#contact)

## Description

A list of games retrieved from the Rawg.io API, with info and description of each game.
You may mark games as favourites for easy access in the future.

The front-end is also have an admin area available, where we can add additional tasks in the future.

Here are some of the features for this project:

- User Authentication
- Game-Content retrieved from Rest-API
- Mark and save your favourites
- Contact Schema uses SmtpJS
- User and favourites stored in LocalStorage API

## Built With

This project has been built with the following stack:

- [React.js](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com)
- [Wordpress](https://www.wordpress.org)
- [SmtpJS](https://smtpjs.com/)

## Getting Started

### Installing

To install this front-end you can clone the repo and install it, like this:

1. Clone the repo:

```bash
git clone https://github.com/stian-git/js-framework-ca.git
```

2. Install the dependencies:

```
npm install
```

### Configuration

Keys below for production environments should be added to the file: .env.production, otherwise: .env.development

1. Retrieve API access

You need an API key to access the games data.
Register an account on [https://rawg.io/](https://rawg.io/) and add the API key to: "REACT_APP_GAME_KEY".

2. Smtp.JS Secure Token

The Smtp.js token is needed to encrypt your SMTP credentials.
Just visit [https://smtpjs.com](https://smtpjs.com) and click the "Encrypt your SMTP Credentials" to open the form that needs to be filled out to retrieve the token. Add the token to the key: "REACT_APP_SMTP_TOKEN"

3. Wordpress Authentication

You need your own Wordpress installation to administer your users. Perform a default installation, but add the following plugin: [https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/](JWT Authentication for WP REST API).
Add the URL to the base of your Wordpress API to the key: "REACT_APP_WP_BASE_URL".
Example: REACT_APP_WP_BASE_URL="https://your.domain.com/wordpress/wp-json/"

### Running

To run the app, run the following commands after you have followed the installation instructions above:

```bash
npm run start
```

## Contributing

This was made for a school project so I'm not planning for regular maintenance, but rather use it to show some of my work.
However I will welcome feedback, suggestions and ideas. Please reach me through the contact information below.

## Contact

The best way to reach me would be through the following sites:

[My Portfolio](https://tekniskpotet.no)

[My LinkedIn page](https://www.linkedin.com/in/stian-martinsen-stormyr-1662a515/)
