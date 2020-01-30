var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("POST /api/login", function() {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(function() {
    return db.sequelize.sync({ force: true });
  });

  it("login a user", function(done) {
    // Add some examples to the db to test with
    db.User.create(
      { email: "bknutson@commercialtribe.com", password: "password" },
    ).then(function() {
      // Request the route that returns all examples
      chai.request(server)
        .post('/api/login')
        .type('form')
        .send({
            '_method': 'POST',
            'password': 'password',
            'email': 'bknutson@commercialtribe.com'
        }).end((err, res) => {
            expect(err).to.be.null;

            expect(res.status).to.equal(200);

            expect(res).to.be.json;

            done();
        })

        // The `done` function is used to end any asynchronous tests
        
    });
  });
});