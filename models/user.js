module.exports = function(sequelize, DataTypes){
    const user = sequelize.define("user", {
        id:      {
            type: DataTypes.STRING,
            primaryKey: true
        },
        image:         DataTypes.STRING,  // not sure if string is correct.
        name:          DataTypes.STRING,  // User First Name
        likes:         DataTypes.STRING,  // For FB likes, now
        brithday:      DataTypes.INTEGER, // Parsed into age by client
        bio:           DataTypes.STRING,  // A Short (or long) description of the person
        gender:        DataTypes.STRING,  // Person's gender (give a lot of options for inclusivity)
        interested_in: DataTypes.STRING,  // Information about who the user is interested in
        faves:         DataTypes.STRING,  // A few of their favorite things
        wants_to:      DataTypes.STRING,  // Activities the user would want to do
        flirts_on:     DataTypes.BOOLEAN, // Switch to toggle the "flirt" button
        last_online:   DataTypes.INTEGER, // When the user was last online
        city:          DataTypes.STRING, 
        state:         DataTypes.STRING,
        complete:      DataTypes.BOOLEAN
    });

    return user;
}

