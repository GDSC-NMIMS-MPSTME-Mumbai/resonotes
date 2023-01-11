import { BookCreateInputSchema } from "@/schema";
import { bucket } from "@/utils/storage";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const highlightsRouter = createTRPCRouter({
	get: protectedProcedure.input(BookCreateInputSchema).query(async ({ ctx, input }) => {
		const userid = ctx.session.user.id;

		const files = await bucket.getFiles({ prefix: `${userid}/${input.book}` })

		if (files[0].length === 0) {
			throw new Error("Book not found in Your Library");
		}

		return files[0]
	}),

	set: protectedProcedure.input(BookCreateInputSchema.and(z.object({ highlight: z.string() }))).mutation(async ({ ctx, input }) => {
		const userid = ctx.session.user.id;

		return await bucket.file(`${userid}/${input.book}.html`).save(input.highlight, { resumable: false })
	}),

});
