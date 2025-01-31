import { Request, Response } from 'express';
import { db } from '../../prisma/db';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const allProject = await db.project.findMany();
    // res.json(allProject);
    res.status(200).json({
      status: 'success',
      data: allProject,
      length: allProject.length,
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: 'error retrieving projects',
    });
  }
};
export const createProject = async (req: Request, res: Response) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    const newProject = await db.project.create({
      data: { projectName: name, description, startDate, endDate },
    });

    res.status(201).json({
      status: 'success',
      data: newProject,
    });
    res.status(200).json();
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: 'error creating new project',
    });
  }
};
