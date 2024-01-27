const session = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
        sid: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: true
        },
        sess: {
            type: Sequelize.JSON,
            allowNull: false
        },
        expire: {
            type: Sequelize.DATE,
            allowNull: false,
            unique: true
        },
    },{
        timestamps: false,
    });
    return Session;
}
export default session;