import { BookCreateInputSchema } from "@/schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const booksRouter = createTRPCRouter({
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const userid = ctx.session.user.id;

		return await ctx.prisma.book.findMany({
			where: {
				user: userid
			}
		})
	}),

	add: protectedProcedure.input(BookCreateInputSchema).mutation(async ({ ctx, input }) => {
		const userid = ctx.session.user.id;
		const data = {
			user: userid,
			book: input.book
		}

		const exists = await ctx.prisma.book.findFirst({
			where: data
		})

		if (exists) {
			throw new Error("Book already exists in Your Library");
		}

		return await ctx.prisma.book.create({
			data
		})
	}),

	delete: protectedProcedure.input(BookCreateInputSchema).mutation(async ({ ctx, input }) => {
		const userid = ctx.session.user.id;
		const data = {
			user: userid,
			book: input.book
		}

		const exists = await ctx.prisma.book.findFirst({
			where: data
		})

		if (!exists) {
			throw new Error("Book does not exist in Your Library");
		}

		return await ctx.prisma.book.delete({ where: exists })
	})
});
