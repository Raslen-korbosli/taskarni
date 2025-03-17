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
    const { projectName, description, startDate, endDate } = req.body;
    console.log(req.body);
    const newProject = await db.project.create({
      data: { projectName, description, startDate, endDate },
    });

    res.status(201).json({
      status: 'success',
      data: newProject,
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      message: 'error creating new project' + e,
    });
  }
};
