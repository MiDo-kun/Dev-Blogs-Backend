# Dev Blogs - Back End

## Project Description

This project is a blog site web application that provides visitors with simple yet informative blog posts. The back-end is built using the Model-View-Controller (MVC) architecture, which promotes a clean, modular, and maintainable codebase that is easier to develop, test, and scale.

The application is built using Express.js, a lightweight and unopinionated JavaScript framework for setting up routes, and MongoDB, a NoSQL database for storing document-based data. Additional packages such as cors, cookie-parser, JWT, mongoose, and bcrypt were used to assist Express.js in achieving the necessary features of the project.

## Main Objective/s

The motivation behind this project is to document my learning journey and share knowledge with readers by providing informative and direct-to-the-point information. Through this blog site web application, I aim to help others learn new concepts and stay updated on relevant topics in a simple and efficient manner. Additionally, this project allows me to practice my development skills and expand my knowledge in web development.

## Key Feature/s

- **MVC Architecture**: Ensures a clean, modular, and maintainable codebase that is easier to develop, test, and scale.
- **ORM Integration**: Use Mongoose to define and interact with database models in a structured way.
- **Password Hashing**: Securely store passwords by using bcrypt to hash and salt them before storing in the database.
- **Cross-Domain Communication**: Allow different domains to access specified routes to improve usage and scalability using CORS (Cross-Origin Resource Sharing).
- **User Authentication and Authorization**: Implement user authentication and authorization using JSON Web Tokens (JWT) to verify authorized access to specified routes.
- **Image Upload**: Used cloudinary to upload images in the cloud instead of storing it locally.

## What I've Learned

- **Deployment**: How to use onRender to deploy a web server.
- **Environment Variables**: How to hide sensitive data by using .env variables.
- **Database Modeling**: How to use Mongoose to design and interact with database models in a structured way.
- **Password Security**: How to securely store user passwords by hashing and salting them before storing in the database using bcrypt.
- **HTTP Methods**: How to define different HTTP methods like PUT in express routes for updating data in the database.
- **Cross-Origin Resource Sharing (CORS)**: How to enable origins to allow front-end applications to communicate with the API.
- **User Authorization**: How to use JSON Web Tokens (JWT) for user authorization when accessing specified API endpoints.
- **Image Upload**: Used cloudinary to store images efficiently.

Overall, this project provided me with a solid foundation in modern web development using Express and related technologies. The skills and knowledge I gained will be useful in future web development projects.

## Quick Installation

1. Clone the repository to your local machine:

   `git clone https://github.com/MiDo-kun/Dev-Blogs-Backend`

2. Navigate to the project directory:

   `cd your-repository`

3. Install the dependencies:

   `npm install`

4. Start the development server:

   `npm run dev`

Open your web browser and navigate to [http://localhost:5172](http://localhost:5172) to view the website.

## Contributing

Contributions are welcome! If you want to contribute to the project, please follow these guidelines:

1. Fork the repository to your own GitHub account.

2. Clone the repository to your local machine:

   `git clone https://github.com/MiDo-kun/Dev-Blogs-Backend`

3. Create a new branch for your changes:

   `git checkout -b your-branch-name`

4. Make your changes to the code.

5. Commit your changes:

   `git commit -m "Your commit message"`

6. Push your changes to your fork:

   `git push origin your-branch-name`

7. Create a pull request from your fork to the main repository.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
