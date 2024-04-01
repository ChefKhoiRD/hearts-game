# Hearts Game

Rather than players against house, the game is flipped to player vs player and the dealer becomes neutral. Players bet (2?) gold per round and are dealt 2 cards. Each player’s first card is dealt as an upcard and all other cards are dealt face-down. The goal is to get closer to 21 than your opponents and win the round. If players push (ex: 2 or more players hit the same number), the gold will be split between them.

The dealer (bot) does not deal themselves a hand, but rather, offers players power ups, for example, shields, gold, etc. Additionally the dealer acts as a shop and occasionally offers players lower-level power ups at a cost.

The rules are to be ironed out when the time comes, my initial plan for the game is to create a standard game of Blackjack that is playable within Discord Activies. My twist to make the game different will come later.

## Discord App Pitches 2024

This is my submission to [Discord App Pitch 2024](https://discord.com/build/app-pitches-2024). 

### Implications
1. Submissions due April 1st.
2. A prototype must be submitted. (There has to be some level of development)
3. Must be played within Discord Activities. 
4. Multiplayer scope is limited to players within a voice call.


## Technical Details

This repo is an example built on top of two javascript frameworks

1. [ReactJS](https://reactjs.org/) - A frontend javascript UI framework
2. [Colyseus](https://www.colyseus.io/) - A full-stack state-management library

## Client architecture

The client (aka front-end) is using [ViteJS](https://vitejs.dev/)'s React Typescript starter project. Vite has great starter projects in [many common javascript frameworks](https://vitejs.dev/guide/#trying-vite-online). All of these projects use the same config setup, which means that if you prefer VanillaJS, Svelte, etc... you can swap frameworks and still get the following:

- Fast typescript bundling with hot-module-reloading
- Identical configuration API
- Identical environment variable API

## Server architecture

The server (aka back-end) is using Express with typescript. Any file in the server project can be imported by the client, in case you need to share business logic.

## Colyseus

We're going to manage and synchronize our embedded app's state via [Colyseus](https://www.colyseus.io/). Our server is stateful and will hold the source of truth for our embedded app, and each client will post messages to the server to modify this state. ⚠️ This example is not (yet) architected to scale to production. It is meant for rapid prototyping and to showcase common SDK and API patterns.

## Setting up your Discord Application

Before we write any code, lets follow the instructions [here](https://discord.com/developers/docs/activities/building-an-activity#step-1-creating-a-new-app) to make sure your Discord application is set up correctly.

## Setting up your environment variables

In order to run your app, you will need to create a `.env` file. Rename the file [/examples/react-colyseus/example.env](/examples/react-colyseus/example.env) to `.env` and fill it in with the appropriate OAuth2 variables. The OAuth2 variables can be found in the OAuth2 tab on the developer portal, as described [here](https://discord.com/developers/docs/activities/building-an-activity#find-your-oauth2-credentials)

```.env
# Example .env file
# Rename this from example.env to .env
VITE_CLIENT_ID=PASTE_OAUTH2_CLIENT_ID_HERE
CLIENT_SECRET=PASTE_OAUTH2_CLIENT_SECRET_HERE
```

## Running your app locally

As described [here](https://discord.com/developers/docs/activities/building-an-activity#step-4-running-your-app-locally-in-discord), we encourage using a tunnel solution such as [cloudflared](https://github.com/cloudflare/cloudflared#installing-cloudflared) for local development.
To run your app locally, run the following from this directory (/examples/react-colyseus)

```
pnpm install # only need to run this the first time
pnpm dev
pnpm tunnel # from another terminal
```