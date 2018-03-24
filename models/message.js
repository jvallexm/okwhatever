module.exports = function(sequelize, DataTypes){
    const message = sequelize.define("message", {
        id:         DataTypes.STRING,
        fromId:     DataTypes.STRING,
        inboxTo:    DataTypes.BOOLEAN,
        inboxFrom:  DataTypes.BOOLEAN,
        text:       DataTypes.STRING,
        readTo:     DataTypes.BOOLEAN,
        readFRom:   DataTypes.BOOLEAN
    });
    
    return message;
}