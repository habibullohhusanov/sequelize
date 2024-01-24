const comment = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comments", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        comment: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
    },
        {
            timestamps: true,
        }
    );
    return Comment;
}
export default comment;