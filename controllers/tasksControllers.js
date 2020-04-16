const Tasks = require('../models/Taks');
const Projects = require('../models/Projects');
const { validationResult } = require('express-validator');

async function findProject(req, res) {
	const { project } = req.body;
	// buscar el proyecto al que queremos guardar la tarea
	const projecyFind = await Projects.findById(project);
	if (!projecyFind) {
		res.status(404).json({ message: 'No existe el proyecto' });
	}
	// Validamos el usuario
	if (projecyFind.creator.toString() !== req.user.id) {
		return res.status(401).json({ message: 'No esta autorizado' });
	}
}

exports.createTask = async (req, res) => {
	/** validamos los campos de la tarea */
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ message: errors.array() });
	}
	try {
		/** Buscar si existe el proyecto */
		findProject(req, res);

		// creamos una nueva tarea
		const newTask = new Tasks(req.body);
		newTask.save();
		res.json({ message: 'Tarea creada', tasks: newTask });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error de servidor' });
	}
};

exports.getTasks = async (req, res) => {
	const { project } = req.body;

	try {
		/** Buscar si existe el proyecto */
		findProject(req, res);

		/** Buscar tareas */
		const TasksFind = await Tasks.find({ project });
		res.json({ message: 'Tareas encontradas', TasksFind });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Hubo un error' });
	}
};

exports.updateTask = async (req, res) => {
	/** Nueva tarea que remplazara */
	const { project, name, state } = req.body;
	const newTask = {};
	if (name) newTask.name = name;
	if (state) newTask.state = state;

	try {
		let task = await Tasks.find({ project });
		if (!task) {
			return res.status(404).json({ message: 'No exista la tarea' });
		}

		/** Verificar si es el creador del proyecto */
		findProject(req, res);

		/** Actualizar tarea */
		task = await Tasks.findByIdAndUpdate(
			{ _id: req.params.id },
			{ $set: newTask },
			{ new: true }
		);

		res.json({ message: 'Tarea actualizada', task });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error en el servidor' });
	}
};

exports.deleteTask = async (req, res) => {
	const { project } = req.body;
	try {
		let task = await Tasks.find({ project });
		if (!task) {
			return res.status(404).json({ message: 'No exista la tarea' });
		}

		/** Verificar si es el creador del proyecto */
		findProject(req, res);

		/** Eliminar Tarea */
		task = await Tasks.findByIdAndDelete({ _id: req.params.id });
		return res.json({ message: 'Tarea eliminado', task });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error en el sevidor' });
	}
};
