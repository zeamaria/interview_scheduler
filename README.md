# Interview Scheduler

This project is intended for interviewers to book and keep track of upcoming interviews. This app allows users to book, edit, cancel and delete upcoming interviews, all shown in an easy to use week view UI.

## Setup
1. You will need to [clone the scheduler API!](https://github.com/zeamaria/scheduler-api).
2. Install dependencies with `npm install`.
3. Copy the .env.example to .env.development and fill in the variables.
4. Run `src/db/schema` on the development psql server.
5. Run curl request to `localhost:8001/api/debug/reset` to reset the database.
6. Start Developer Server for scheduler_api with `npm start`.
7. Start Webpack Development server for interview_scheduler with `npm start`.




## Dependencies
* @testing-library/react-hooks
* axios
* classnames
* normalize.css
* react
* react-dom
* react-scripts

## devDependencies
* @babel/core
* @storybook/addon-actions
* @storybook/addon-backgrounds
* @storybook/addon-links
* @storybook/addons
* @storybook/react
* @testing-library/jest-dom
* @testing-library/react
* babel-loader
* node-sass
* prop-types
