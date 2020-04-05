const Project = require('../models/Projects');
const colors = require('colors');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {
	/** validamos los campos del projecto */
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ message: errors.array() });
	}

	/** datos del usuario que quiere authentificarse */
	const { name } = req.body;

	try {
		let project = await Project.findOne({ name });
		if (project) {
			return res.status(400).json({
				message: 'El proyecto ya existe',
			});
		}

		project = await new Project(req.body);
		/** guardamos identificador cifrado del creador del proyecto */
		project.creator = req.user.id;
		res
			.status(200)
			.json({ message: 'Tarea Creado correctamente', data: project });
		await project.save();
	} catch (error) {
		console.log(colors.red(error));
		res.status(500).json('Hay un error de servidor');
	}
};

exports.getProjects = async (req, res) => {
	try {
		let projects = await Project.find({ creator: req.user.id });
		return res.status(200).json({ projects });
	} catch (error) {
		console.log(colors.red(error));
		return res.status(500).json('No existen projectos');
	}
};

exports.updateProject = async (req, res) => {
	/** validamos que el projecto exista */
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ message: errors.array() });
	}

	/** Nuevo projecto que remplazara al siguiente */
	const { name } = req.body;
	const newProject = {};
	if(name) {
		newProject.name = name;
	}

	try {
		/** Buscamos el proyecto con y verificar si existe */
		let project = await Project.findById(req.params.id);
		if (!project) {
			return res.status(404).json({ message: "El proyecto no fue encontrado"});
		}

		/** Verificar si es el creador del proyecto */
		console.log(req.user)
		if(project.creator.toString() !== req.user.id) {
			return res.status(401).json({ message: "No esta autorizado"})
		}

		/** Actualizar projecto */
		project = await Project.findByIdAndUpdate({_id: req.params.id}, {$set: newProject}, {new: true});
		return res.status(200).json({ message: "Proyecto actualizado correctamente", project});
	} catch (error) {
		console.log(colors.red(error));
		return res.status(500).json({message: "No existe el proyecto"});
	}
};

exports.deleteProject = async (req, res) => {

	try {
		let project = await Project.findById(req.params.id);
		if (!project) {
			return res.status(404).json({ message: "El proyecto no fue encontrado"});
		}

		/** Verificar si es el creador del proyecto */
		if(project.creator.toString() !== req.user.id) {
			return res.status(401).json({ message: "No esta autorizado"})
		}

		project = await Project.findByIdAndDelete({_id: req.params.id});
		return res.json({ message: "Proyecto eliminado", project})
		
	} catch (error) {
		console.log(colors.red(error));
		return res.status(500).json({ message: "No existe el proyecto"});
	}
}