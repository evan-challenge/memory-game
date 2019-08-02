# Memory Game

React application is split by different routes and views to separate concerns, the main views are `Game`, `History` and `Intro`. There are two main Redux stores / reducers to handle game loop and game history records, those are also split into separate actions and reducers files. There's a single «service» to call API in order to get generated cards.

# Installation

1. Run `$ yarn` in root folder to install packages
2. Run `$ yarn api:start:dev` to start API
3. Run `$ yarn web:start:dev` to start React application

# Technology stack

- Yarn Workspaces – to manage monorepo with API and React application
- React & Redux – quite standard and popular approach, nothing innovative
- TypeScript – typings to make it easier to read through data management flow
- Express – Node.js web framework
- Ramda – functional toolkit, minimal usage in some practical cases
- Ant Design – UI Kit for quick UI prototyping
- Styled Components – CSS-in-JS
- ESLint and Prettier – code consistency
