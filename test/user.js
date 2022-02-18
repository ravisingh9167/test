
let mongoose = require("mongoose");
let User = require('../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
  beforeEach((done) => { //Before each test we empty the database
      User.deleteMany({}, (err) => { 
         done();           
      });        
  });

  /*
    *  Generate token
    */
  describe('POST /generateToken', () => {

    it('it should not generate token with wrong credentials', (done) => {
      chai.request(app)
        .post("/generateToken")
        .send({username: 'test1', password: 'test@123!'})
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Username or Password is incorrect')
          done();
        })
    })

    it('it should generate token', (done) => {
      chai.request(app)
        .post("/generateToken")
        .send({username: 'test', password: 'test@123!'})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          process.env.TOKEN= res.body.token;
          done();
        })
    })
  });


  /*
    * Test the /GET route
    */
  describe('GET /users', () => {
    it('it should GET all the users', (done) => {
      chai.request(app)
        .get("/users")
        .set({ Authorization: `Bearer ${process.env.TOKEN}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        })
    });

    it('it should GET a user by the given id', (done) => {
      let user = new User({ name: "test2", address: "test add1", dob: "24-09-2000", state: "MH" });
      user.save((err, user) => {
        chai.request(app)
          .get('/users/' + user.id)
          .set({ Authorization: `Bearer ${process.env.TOKEN}` })
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id');
            res.body.should.have.property('name');
            res.body.should.have.property('address');
            res.body.should.have.property('dob');
            res.body.should.have.property('state');
            res.body.should.have.property('id').eql(user.id);
            done();
          });
      });

    });
  });

  //Post User
  describe('POST /users', () => {
    it('it should not POST a user without name field', (done) => {
      let user = {
        //name: "Test",
        address: "Kalyan",
        dob: '23-07-1997',
        state: "maharashtra"
      }
      chai.request(app)
        .post('/users')
        .set({ Authorization: `Bearer ${process.env.TOKEN}` })
        .send(user)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('name');
          res.body.errors.name.should.have.property('kind').eql('required');
          done();
        });
    });

    it('it should POST a user ', (done) => {
      let user = {
        name: "Test",
        address: "Kalyan",
        dob: '23-07-1997',
        state: "maharashtra"
      }
      chai.request(app)
        .post('/users')
        .set({ Authorization: `Bearer ${process.env.TOKEN}` })
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eql('User Created Successfully');
          res.body.data.should.have.property('id');
          done();
        });
    });
  })

  //Checking PUT request
  describe('PUT /users/:id', () => {
    it('it should UPDATE a user given the id', (done) => {
      let user = new User({ name: "test2", address: "test add1", dob: "24-09-2000", state: "MH" })
      user.save((err, user) => {
        chai.request(app)
          .put('/users/' + user.id)
          .set({ Authorization: `Bearer ${process.env.TOKEN}` })
          .send(user)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql('User Updated Successfully');
            res.body.result.should.have.property('id').eql(user.id);
            done();
          });
      });
    });
  });

  //test Delete User 
  describe('DELETE /users/:id', () => {
    it('it should DELETE a user with given id', (done) => {
      let user = new User({ name: "test2", address: "test add1", dob: "24-09-2000", state: "MH" })
      user.save((err, book) => {
        chai.request(app)
          .delete('/users/' + user.id)
          .set({ Authorization: `Bearer ${process.env.TOKEN}` })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success').eql('User Deleted Successfully');
            res.body.result.should.have.property('deletedCount').eql(1);
            done();
          });
      });
    });
  });

});

