import { Request, Response } from 'express';
import { db } from '../../prisma/db';

export const getTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await db.user.findMany({});
    res.status(200).json({
      status: 'success',
      users,
      usersLength: users.length,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error performing users search: ${error.message}` });
  }
};
