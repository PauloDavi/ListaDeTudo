import Sequelize, { Model } from 'sequelize';

class Note extends Model {
  static init(sequelize){
    super.init({
      text: Sequelize.STRING,
      do: Sequelize.BOOLEAN
    }, {
      sequelize
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Project, { foreignKey: 'project_id', as: 'project' });
  }
}

export default Note;
