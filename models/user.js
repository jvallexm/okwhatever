module.exports = function(sequelize, DataTypes){
    const user = sequelize.define("user", {
        id: 
        image:   DataTypes.STRING,                   //not sure if string is correct.
        name:    DataTypes.STRING,
        likes:    DataTypes.STRING
    });
    return user;
}

