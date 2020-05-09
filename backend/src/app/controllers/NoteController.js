import * as Yup from 'yup';

import Note from '../models/Note';
import Project from '../models/Project';

class NotesController {
  async index(req, res){
    const notes = await Note.findAll({
      attributes: ['id', 'text', 'do'],
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(notes);
  }

  async store(req, res){
    const Schema = Yup.object().shape({
      text: Yup.string().required(),
      project_id: Yup.number().required(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const projectExist = await Project.findByPk(req.body.project_id);

    if(!projectExist) {
      return res.status(400).json({ error: 'Projeto não existe' })
    }

    const note = await Note.create(req.body, {
      attributes: ['id', 'text', 'do'],
      include: [
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name'],
        },
      ],
    });

    if(!note){
      return res.status(500).json()
    }

    return res.status(201).json(note);
  }

  async update(req, res){
    const { id } = req.params;
    req.body.id = id;

    const Schema = Yup.object().shape({
      id: Yup.number(),
      do: Yup.boolean(),
      text: Yup.string(),
    });

    if (!(await Schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }


    const note = await Note.findByPk(id);

    if(!note) {
      return res.status(400).json({ error: 'Nota não encotrada' })
    }

    await note.update(req.body)

    return res.json(note);
  }

  async delete(req, res){
    const { id } = req.params;

    const note = Note.findByPk(id);

    if(!note) {
      return res.status(400).json({ error: 'Nota não encotrada' })
    }

    await Note.destroy({
      where: {
        id
      }
    });

    return res.json();
  }
}

export default new NotesController();
