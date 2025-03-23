import { Request, Response } from 'express';
import { db } from '../../prisma/db';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const projectId = req.query.projectId;
    const allTasks = await db.task.findMany({
      where: { projectId: Number(projectId) },
      include: {
        assignee: true,
        attachment: true,
        comments: true,
        authorUser: true,
      },
    });

    res.status(200).json({
      status: 'success',
      data: allTasks,
      length: allTasks.length,
    });
  } catch (e: any) {
    res.status(400).json({
      status: 'fail',
      message: 'error retrieving projects' + e.message,
    });
  }
};
export const createTask = async (req: Request, res: Response) => {
  try {
    // const projectId = Number(req.query.projectId);
    const {
      taskName,
      description,
      startDate,
      tags,
      dueDate,
      priority,
      status,
      projectId,
    } = req.body;
    const newTask = await db.task.create({
      data: {
        taskName,
        priority,
        status,
        tags,
        description,
        startDate,
        dueDate,
        // project: { connect: { id: projectId } },
        projectId,
      },
    });

    res.status(201).json({
      status: 'success',
      data: newTask,
    });
  } catch (e: any) {
    res.status(400).json({
      status: 'fail',
      message: 'error creating new task' + e.message,
    });
  }
};
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const updatedTask = await db.task.update({
      where: { id: Number(taskId) },
      data: { status: status },
    });
    res.status(200).json({
      status: 'success',
      data: updatedTask,
    });
  } catch (e: any) {
    res.status(400).json({
      status: 'fail',
      message: 'error updating projects' + e.message,
    });
  }
};
export const getUserTasks = async (req: Request, res: Response) => {
  const userId = req.params;
  try {
    const tasksWithAuthorNameAndAssigneeName = await db.task.findMany({
      where: {
        // OR: [{ assignedUserId: Number(userId), authorUserId: Number(userId) }],
      },
    });
    const allUserTasks = await Promise.all(
      tasksWithAuthorNameAndAssigneeName.map(async (task) => {
        let assigneeName;
        if (task.assignedUserId) {
          assigneeName = await db.user.findUnique({
            where: { userId: 1 },
            select: { username: true },
          });
          console.log(assigneeName);
        }
        // const AuthorName = await db.user.findUnique({
        //   where: { userId: task.authorUserId! || undefined },
        //   select: { username: true },
        // });

        return { ...task, assigneeName };
      })
    );
    res.status(200).json({
      status: 'success',
      allUserTasks,
      length: allUserTasks.length,
    });
  } catch (e: any) {
    res.status(400).json({
      status: 'fail',
      message: 'error retrieving tasks distributions' + e.message,
    });
  }
};
