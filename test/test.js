const chai = require("chai");
const expect = require("chai").expect;
const app = require("../server");
chai.use(require("chai-http"));

const userController = require("../controllers/userController");

//testing if userController gets all users (findAll function)
describe("findAll", function(){
    it("should display all users", function(){
            return chai.request(app).get("/api/users").then(function(res){
                console.log(res.body);
                expect(res.body).to.be.an("array");
            })

    });
});
