# restipe
A humble demonstration of a REST api using Node.js, Express, and MySQL.

## Setup
This assumes you have a MySQL database up and running with an 'interview' database created.
```
git clone https://github.com/ryanmccants/restipe.git
cd restipe
npm install
export PWUSER=your-db-username
export PWPASS=your-db-password
node db_setup.js
node app.js
```
## Design Notes
### First steps
I familiarized myself with Node and assessed the target environment. I upgraded Node and npm to current releases. Had I not been able to, my choices of frameworks and javascript features would have been limited (fat arrows, generators, async/await). I then set up my development environment to match my target with Node 7.10.0, MySQL, and phpMyAdmin. 3hrs

### Framework decisions
I researched popular web frameworks for creating a RESTful api. I knew Express would be a solid candidate considering I had not been terrible invested in the Node ecosystem (yet) and I've heard plenty about it. Stats from [npmjs.com](https://www.npmjs.com/) confirmed. I also considered the more modern framework [koajs.com](https://www.koajs.com/) from the Express team. I opted against it for Express' larger ecosystem of documentation and middle-ware as well as my likelihood of applying my learning investment towards something already in production. 1hr

### Development
I got a basic Express skeleton in place. I spent most of my time experimenting with the Node MySQL client and how I wanted to structure my app. I wanted a separate api router that could have different middle-ware path in the case I also wanted to implement a form-based CRUD route too. I tested the api with [Postman](https://www.getpostman.com/).

### To Do
Next, I'd like to abstract out the 'resource' model from the router to have a clearer MVC distinction then add better validation and error handling to give better feedback to the user.

## Lofty Future Implementations
* Spiffy front-end
* Add a controller to test REST endpoints for the resources in the database.
* Catalog the tests to a mapped table
* Use websockets to journal the tests to the front-end as they are happening
