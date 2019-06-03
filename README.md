# Cryptocurrency Calculator

The DEMO was deployed on Heroku. LINK: https://msq-test.herokuapp.com/

This is a simple cryptocurrency calculator.

Stack: React, Redux, Redux-Saga, Axios.

For converting cryptocurrencies I use Coinmarketcap API

Because of API limitation and CORS issue, I written a little proxy server on Express.

Frontend part is stored in folder `react/`

----
## Installation

```bash
# Install the all dependencies with npm

$ npm run install:all
```

## Run

For development:
```sh
$ npm run dev
```
## P.S.

If you want test this project locally - you need to import your own API_KEY in `.env.development` file. The link is [here](https://coinmarketcap.com/api/).
Otherwise, you can use my deployed project.