const diary = (sequelize, Sequelize) => {
    const Diary = sequelize.define("diaries", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        text: {
            type: Sequelize.STRING(500),
            allowNull: false
        },
        imageUrl: {
            type: Sequelize.STRING(255),
            allowNull: true
        }
        },
        {
            timestamps: true,
        }
    );
    return Diary;
}

export default diary;