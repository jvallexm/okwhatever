module.exports = function(sequelize, DataTypes){
    const user = sequelize.define("user", {
        id:      {
            type: DataTypes.STRING,
            primaryKey: true
        },
        image:   DataTypes.STRING,                   //not sure if string is correct.
        name:    DataTypes.STRING,
        likes:   DataTypes.STRING
    });
    return user;
}

