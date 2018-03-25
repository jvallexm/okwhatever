module.exports = function(sequelize, DataTypes){
    const user = sequelize.define("user", {
        id:      {
            type: DataTypes.STRING,
            primaryKey: true
        },
        image:         DataTypes.STRING,                   //not sure if string is correct.
        name:          DataTypes.STRING,
        likes:         DataTypes.STRING,
        brithdat:      DataTypes.STRING,
        bio:           DataTypes.STRING,
        gender:        DataTypes.STRING,
        interested_in: DataTypes.STRING
    });
    return user;
}

