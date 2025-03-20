// import { Request, Response } from 'express';
// import { db } from '../../prisma/db';

// export const getUsers = async (req: Request, res: Response): Promise<void> => {
//   const { query } = req.query;

//   try {
//     const tasks = await db.task.findMany({
//       where: {
//         OR: [
//           { taskName: { contains: query as string, mode: 'insensitive' } },
//           { description: { contains: query as string, mode: 'insensitive' } },
//         ],
//       },
//     });

//     const projects = await db.project.findMany({
//       where: {
//         OR: [
//           { projectName: { contains: query as string, mode: 'insensitive' } },
//           { description: { contains: query as string, mode: 'insensitive' } },
//         ],
//       },
//     });

//     // const users = await db.user.findMany({
//     //   where: {
//     //     OR: [{ username: { contains: query as string } }],
//     //   },
//     // });
//     res.status(200).json({
//       status: 'success',
//       tasks,
//       projects,
//       users: [],
//     });
//   } catch (error: any) {
//     res
//       .status(500)
//       .json({ message: `Error performing search: ${error.message}` });
//   }
// };
