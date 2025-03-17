// import { Request, Response } from 'express';
// import { db } from '../../prisma/db';

// export const search = async (req: Request, res: Response) => {
//   try {
//     const { query } = req.query;
//     const allTasks = await db.task.findMany({
//       where: { projectId: Number(projectId) },
//       include: {
//         assignee: true,
//         attachment: true,
//         comments: true,
//         authorUser: true,
//       },
//     });

//     res.status(200).json({
//       status: 'success',
//       data: allTasks,
//       length: allTasks.length,
//     });
//   } catch (e: any) {
//     res.status(400).json({
//       status: 'fail',
//       message: 'error retrieving projects' + e.message,
//     });
//   }
// };
