# PollApp

## Assignment content

The front end assignment consists on creating a simple poll application which works exclusively in the front end without back end interactions. The purpose of this assignment is to assess the level of maturity of the candidate and how the candidate manages the internal state of an application and the interactions between components. The UX/UI skills are not the target of this assignment, but it will be positively evaluated.

### General description

The application is a single page application which is divided in three sections. On the first section, the user can create a poll with up to 10 options. In the central one, the user can vote by selecting one of the options and pressing the "vote" button. On the right, the chart will update based on the questions created and the votes that each question got.

### Use cases

- As the owner, I want to change my poll question.
- As the owner, I want to add, edit or remove the options of my poll.
- As the owner, I want to reset the whole form, including answers.
- As the user, I want to see the UI refresh automatically when something changes.
- As the respondent, I want to send several answers.
- As the respondent, I want to see the changes in real time.

(Mockup provided)

### Non-functional requirements

- All fields have a limit of 80 characters.
- When the limit is reached, fields should be disabled.
- There should be always at least 2 options.
- The user can vote as many times as possible.
- The chart needs to adapt to the changes in the amount of answers or labels without missing values.
- The reset button should reset the whole UI: question, options and answers.
- It is mandatory to provide a deployment URL and source code.
- You can use 3rd party libraries or frameworks to develop this assignment.
- Writing automated tests is a plus.
- You must provide a README.md file with instructions.

## Notes

- There are 3 main components with the requested logic (`create-poll`, `display-poll-results`, `vote-poll`)
- Interactions and passing data between these components is managed by `DataService` and `VoteService`
  - `Input` could be used, but that's just a parent-child communication (which would work here). However, using a service to communicate between components gives us more flexibility and is definitely more elegant solution, for example, we can pass data to unrelated components, siblings components.
  - `VoteService` keeps track of **CRUD** operations
- Once browser will reload, the page won't be lost, because `localStorage` keeps the votes. Data will be lost when you'll clear cache & cookies of your browser.
- Internal state of an application is managed by `NGRX` store, for that please take a look into `store` folder
- UI/UX has been improved using `Angular Material`
- There's also Server-Side Rendering (SSR) working on localhost, haven't used any FaaS/Cloud Functions to do so on the deployment URL
- The app has been deployed to [https://cap-test-9588d.web.app/](https://cap-test-9588d.web.app/)
- Personally I haven't noticed any bugs, honestly speaking I'm not sure if you'd consider usage of `changeDetection` as a bad practice
- Basic RWD has been done using `Angular Flex-Layout`, however had to use previous version based on [#1200 (comment)](https://github.com/angular/flex-layout/issues/1200#issuecomment-604898951)
- `SharedModule` has been implemented for the basic case, it has a separated `MaterialModule` inside which consists all used `Angular Material` modules
- Given the fact that my time was limited, for a bonus decided to work on UI/UX a bit, instead of performing unit/E2E tests
- The code is relatively clean with following Dump Components, Separation of Concerns (SoC), Single Responsibility Rule (SRP) as well as you might notice that most of the code follows alphabetical order and meaningful names

### Run this locally

The same steps, as for every Angular application:

1. Clone the repository
2. Run `npm install` (`Node.js` and therefore `npm` must be installed)
3. Run `ng serve` (`Angular CLI` must be installed)
4. As long as port `4200` is free on your device, then it'll be launched on `localhost:4200`
5. For SSR: first `npm run build:ssr` then `npm run server:ssr`, as long as port `4000` is free on your device, then it'll be launched on `localhost:4000`. Check page source to see the SSR.
