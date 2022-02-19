1) Run-  npm install    it will install all dependent modules to run the project
2) change the Connection String in env.js file for database connection
3) use http://localhost:4000/generateToken -post api to generate token for accesing all user routes
  in body pass= {"username": "test", "password": "test@123!"}
  
4) use http://localhost:4000/users   -get, -post  (for getting all users and inserting a user)
5) use http://localhost:4000/users/:id   -get, -put, -delete (use id not _id field as it was given project requirement)

To RUN PROJECT COMMAND-  node app.js

**Test Cases**
1) it should not generate token with wrong credentials
2) it should generate token
3) it should GET all the users
4) it should GET a user by the given id
5) it should not POST a user without name field
6) it should POST a user 
7) it should UPDATE a user given the id
8) it should DELETE a user with given id

TO RUN TESTING COMMAND- npm test