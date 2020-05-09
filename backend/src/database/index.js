import Sequelize from 'sequelize';

import Note from '../app/models/Note';
import Project from '../app/models/Project';

import databaseConfig from '../config/database';

const models = [Note, Project];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection))
    .map((model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
