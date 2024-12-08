const User = require('../../models/user');
async function findUsernamewithID(userId) {
    try {
        const user = await User.findById(userId); // Replace `User` with your user model.
        console.log(user);
        return user ? user.name : null; // Check for null.
    } catch (error) {
        console.error("Error finding user:", error);
        return null;
    }
}

module.exports = {
    findUsernamewithID,
}