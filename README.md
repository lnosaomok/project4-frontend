# Chef's Place...

## Description

Chef's Place is the app for chefs of all skill levels to show case their recipe creations and also engage with the cooking community. The app gives users the ability to add new recipes to their accound, recommend their recipes to others and also get nutrition information for the ingredients that they have

![Application Screenshot](/project4/public/home.png)

Users can also see the nutritional info for the recipes that they see recommeded

![Application Screenshot](/project4/public/nutrition.png)

Users can also create posts that other users can see and add responses to.

![Application Screenshot](/project4/public/posts.png)

Users can also add image reviews to the recipes they tried

![Application Screenshot](/project4/public/images.png)

## Table of Contents

- Project
  - GitHub Repo
  - Production App
- Wireframes
  - link to Wireframes
  - link to React Architecture?
- User Stories
- Features
  - Components
- Technologies
  - Libraries
- Installation/Setup?
- Credits

## Project

- [Front-End](https://github.com/lnosaomok/project4-frontend)
- [Back-End](https://github.com/lnosaomok/project4-backend)

## Wireframes

## User Stories

- MVP

1. As a user, I want to be able to get nutrition information for a a recipe made out of ingredients that I have.
2. As a user, I want to be able see recipes that other users have reccommeded.
3. As a user I want to be able to see the ratings and image reviews for all the recommeded recipes.
4. As a user I want to be able to see the nutritional info of the recipes other users have shared.
5. As a user I want to be able to add ratings and reviews to recipes recommeded by other users.
6. As a user, I want to be able to see message posts/questions asked by other user along with the responses that the user gets.
7. As a user, I want to be able to filter my recommeded recipes to see the recipe I am looking for.
8. As a user, I want to be able to save my recipes and return to see them later by logging in again to the application

## Installation/Setup

1. Clone this repository
2. Start mongoDB server locally
3. Run npm install
4. To run locally, use command npm run dev

## Technologies

### Frontend

The front end of the application is build mainly using react, coupled with compononts from Material UI and Materialize CSS.

- [React](https://reactjs.org/)
- [Material Design](https://materializecss.com/about.html)
- [Material UI](https://material-ui.com/)

### Backend

The back-end is based on a Mongo/Express/Node backend as well as the PubNub publisher/subscriber pattern where the app creates channels and listens for messages from the subscribed channel, immediately relaying back the information to the user.

The App also makes use of the EDAMAM API where majority of the recommended recipes were seeded from.

- [Edamam API](https://www.edamam.com/)

### Database

- [MongoDB](https://docs.mongodb.com/manual/)
- [Mongoose](https://www.npmjs.com/package/mongoose)

### Server Side

- [Express](https://expressjs.com/)

### Version Control / Deployment

- [Git](https://git-scm.com/doc)
- [Heroku](https://devcenter.heroku.com/categories/reference)

### Approach

| Time   |                                        Task                                        |
| ------ | :--------------------------------------------------------------------------------: |
| 1 Day  | Produce proof of concept for the pub/sub pattern to make sure that it is feastible |
| 1 Days |                       Initial UX design and front end setup                        |
| 1 Days |                       Back end set up and complete UX design                       |
| 1 Day  |              Testing, troubleshooting, refining styling of components              |
| 1 Day  |                                  Final polishing                                   |
| 1 Day  |                              Deployment/Documentation                              |

## Challenges

- Working with pages that require data to be passed to them (show routes) and there is still a bug where the data props are list when user refreshes on a show route.
- Working with pubsub system for adding reactions to messages
