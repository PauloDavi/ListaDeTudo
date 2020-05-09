import Sequelize, { Model } from 'sequelize';

class Project extends Model {
  static init(sequelize){
    super.init({
      name: Sequelize.STRING
    }, {
      sequelize
    });

    return this;
  }
}

export default Project;
