module.exports = function(sequelize, DataTypes){
    const message = sequelize.define("message", {
        id:         {
            type: DataTypes.STRING,
            primaryKey: true
        },
        fromId:     DataTypes.STRING,
        inboxTo:    DataTypes.BOOLEAN,
        inboxFrom:  DataTypes.BOOLEAN,
        text:       DataTypes.STRING,
        readTo:     DataTypes.BOOLEAN,
        readFRom:   DataTypes.BOOLEAN
    });
    
    return message;
}