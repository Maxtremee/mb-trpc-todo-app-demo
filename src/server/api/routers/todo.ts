import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getCount: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.count();
  }),
  getTodos: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  addTodo: protectedProcedure
    .input(
      z.object({
        text: z.string().min(1),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.todo.create({
        data: {
          text: input.text,
          User: {
            connect: {
              email: ctx.session.user.email as string,
            },
          },
        },
      });
    }),
});
