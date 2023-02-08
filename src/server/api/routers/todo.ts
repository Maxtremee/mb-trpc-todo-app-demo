import { z } from "zod";
import { TODO_STATES } from "../../../utils/todoStates";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const newRouter = createTRPCRouter({
  test: protectedProcedure.query(() => {
    return "test";
  }),
});

export const todoRouter = createTRPCRouter({
  nestedRouter: newRouter,
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
  updateTodo: protectedProcedure
    .input(
      z.object({
        state: z.enum(TODO_STATES),
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          state: input.state,
        },
      });
    }),
});
