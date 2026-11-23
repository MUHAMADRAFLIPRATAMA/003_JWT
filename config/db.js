const db = require('../models');

async function connectDatabase() {
    try {
        await db.sequelize.authenticate();
        console.log('Database connected successfully');

        await db.sequelize.sync()

        const queryInterface = db.sequelize.getQueryInterface();
        const userColumns = await queryInterface.describeTable('Users');

        if (!userColumns.password) {
            await queryInterface.addColumn('Users', 'password', {
                type: db.Sequelize.STRING,
                allowNull: true
            });
            console.log('Added missing Users.password column');
        }

        console.log('Database synchronized');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
}

module.exports = connectDatabase;