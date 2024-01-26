const user = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(500),
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING(500),
            allowNull: false,
        }
    },{
        timestamps: true,
    });
    return User;
}
export default user;