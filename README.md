# Questionnaire Editor - Frontend

<p align="center">
  <img src="https://user-images.githubusercontent.com/31348348/168585463-64802615-b4f3-47f2-b858-4757566d3bef.png" width="600" alt="Questionnaire Editor Logo" />
</p>

➡ Link to the Backend repository: **[Questionnaire Editor - Backend](https://github.com/alieldinayman/questionnaire-editor-backend)**

## Summary

A Full-stack React application with functionality for editing questionnaires (_with images_), measuring statistics, persisting and fetching structure utilizing a database by communicating with the backend.

## Features Showcase

<p align="center">
<img src="https://user-images.githubusercontent.com/31348348/168594349-48e2b56a-fc93-4b75-ac39-b8e02d12db1f.gif" width="600" alt="Nest Logo" />
</p>

## Tech Stack

-   [React](https://reactjs.org/) structured based on [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Vite](https://vitejs.dev/)
-   [Axios](https://axios-http.com/docs/intro)
-   [Sass](https://sass-lang.com/)
-   [Bulma](https://bulma.io/)
-   [Docker](https://www.docker.com/)

## Running the Frontend

```bash
# start the application
pnpm dev

# build for production
pnpm build
```

## Dockerizing

```bash
# building the frontend image
docker build -t questionnaire-editor-frontend .
```

## Design Decisions and Better Alternatives

-   Images are currently being uploaded as `Base64` encoded strings, which adds a size overhead of [roughly 37%](http://en.wikipedia.org/wiki/Base64). In a real world application, images would be uploaded as files in a `multipart/form-data` request using a library such as [multer](https://github.com/expressjs/multer), or uploaded to an external storage such as [Amazon Web Services (AWS)](https://aws.amazon.com/) and referenced with relative paths in the database.

-   The current design supports only one `Questionnaire` to simplify saving and representing data in the frontend; this means that any data saved will override any existing data in the database. However, the backend was made quite flexible to support scaling for supporting more than one questionnaire.

-   Rows and Columns, _referenced `Questions` and `Answers` throughout the application_, were kept in separate schemas in order to support scalability and adding unique features if required. However in the event they'd remain identical, it could be better to combine them under one schema.

-   Since there is only one page, routing as well as pages/templates (_from Atomic Design_) were not included, but could easily be added right away without any extra changes.
