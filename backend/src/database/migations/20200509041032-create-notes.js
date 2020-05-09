module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('notes', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        text: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        do: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
        project_id: {
          type: Sequelize.INTEGER,
          references: { model: 'projects', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      });
  },

  down: (queryInterface, ) => {
      return queryInterface.dropTable('notes');
  }
};
