import { BookWhereInputSchema, HighlightUncheckedCreateInputSchema } from "@/schema";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const highlightsRouter = createTRPCRouter({
	getAll: protectedProcedure.input(BookWhereInputSchema).query(async ({ ctx, input }) => {
		const userid = ctx.session.user.id;

		if (!input.book) {
			throw new Error("Book id is required");
		}

		const combination = await ctx.prisma.book.findFirst({
			where: {
				user: userid,
				book: input.book
			}
		})

		if (!combination) {
			throw new Error("Book does not exist in Your Library");
		}

		return await ctx.prisma.highlight.findMany({
			where: {
				Book: combination
			}
		})
	}),

	add: protectedProcedure.input(HighlightUncheckedCreateInputSchema.and(z.object({ book: z.number() }))).mutation(async ({ ctx, input }) => {
		const combination = await ctx.prisma.book.findFirst({
			where: {
				book: input.book,
				user: ctx.session.user.id
			}
		})

		if (!combination) {
			throw new Error("Book does not exist in Your Library");
		}

		const exists = await ctx.prisma.highlight.findFirst({
			where: {
				Book: combination,
				page: input.page
			}
		})

		if (exists) {
			throw new Error("Highlight already exists in Your Library");
		}

		return await ctx.prisma.highlight.create({
			data: {
				page: input.page,
				highlight: input.highlight,
				combination: combination.id,
				voice: input.voice
			}
		})
	}),

	delete: protectedProcedure.input(HighlightUncheckedCreateInputSchema.and(z.object({ book: z.number() }))).mutation(async ({ ctx, input }) => {
		const combination = await ctx.prisma.book.findFirst({
			where: {
				book: input.book,
				user: ctx.session.user.id
			}
		})

		if (!combination) {
			throw new Error("Book does not exist in Your Library");
		}

		const exists = await ctx.prisma.highlight.findFirst({
			where: {
				Book: combination,
				page: input.page
			}
		})

		if (!exists) {
			throw new Error("Highlight does not exist in Your Book");
		}

		return ctx.prisma.highlight.delete({ where: exists })
	})
});
