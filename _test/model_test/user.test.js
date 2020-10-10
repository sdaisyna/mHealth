const User = require('../.././model/user')
const mongoose = require('mongoose');
const DbTest = 'mongodb://localhost:27017/testmhealth'

beforeAll(async () => {
    await mongoose.connect(DbTest, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
})

afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
})

describe('User Schema Test', () => {
    it('Should be able to add new user', async () => {
        let user = await User.create({
            'firstName': "Daisyna",
            'lastName': "Shrestha",
            'age': "22",
            'email': "sdaisyna335@gmail.com",
            'password': "daisy123"
        });
        expect(user.firstName).toMatch("Daisyna");
        expect(user.lastName).toMatch("Shrestha");
        expect(user.age).toMatch(22);
        expect(user.email).toMatch("sdaisyna335@gmail.com");
        expect(user.password).toMatch("daisy123");
    })

    it('Should be able to update user', async () => {
        let user = await User.findOne({
            'firstName': 'Daisyna'
        });
        user.firstName = 'Daisy';

        let newUser = await user.save();
        expect(newUser.firstName).toBe('Daisy');
    })

})