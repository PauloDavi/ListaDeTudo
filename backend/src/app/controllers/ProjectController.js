import * as Yup from 'yup';
import Project from '../models/Project';

class ProjectController {
  async index(req, res){
    const projects = await Project.findAll();
    return res.json(projects);
  }

  async store(req, res){
    const { name } = req.body;

    const Schema = Yup.object().shape({
      name: Yup.string(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const project = await Project.create({name});

    if(!project){
      return res.status(500).json();
    }

    return res.status(201).json(project);
  }

  async update(req, res){
    const { id } = req.params;

    const Schema = Yup.object().shape({
      name: Yup.string(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const project = await Project.findByPk(id);

    if(!project) {
      return res.status(400).json({ error: 'Projeto não encotrado' });
    }

    await project.update(req.body);

    return res.json(project);
  }

  async delete(req, res){
    const { id } = req.params;

    const project = Project.findByPk(id);

    if(!project) {
      return res.status(400).json({ error: 'Projeto não encotrado' });
    }

    await Project.destroy({
      where: {
        id
      }
    });

    return res.json();
  }
}

export default new ProjectController();
