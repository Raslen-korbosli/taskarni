import { Request, Response } from 'express';
import { db } from '../../prisma/db';

export const getTeam = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await db.team.findMany({});
    const teamsWithUserName = await Promise.all(
      teams.map(async (team) => {
        const productOwner = await db.user.findUnique({
          where: { userId: team.productOwnerUserId! },
          select: { username: true },
        });
        const productManager = await db.user.findUnique({
          where: { userId: team.projectManagerUserId! },
          select: { username: true },
        });
        return { ...team, productOwner, productManager };
      })
    );

    res.status(200).json({
      status: 'success',
      teamsWithUserName,
      teamsWithUserNameLength: teamsWithUserName.length,
    });
  } catch (error: any) {
    res.status(500).json({
      message: `Error performing teams with usernames: ${error.message}`,
    });
  }
};
