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

		const file = await bucket.file(`${userid}/${input.book}.html`).download();

		return file[0].toString('utf8');
	}),

	set: protectedProcedure.input(z.object({ highlight: z.string(), book: z.string() })).mutation(async ({ ctx, input }) => {
		const userid = ctx.session.user.id;

		return await bucket.file(`${userid}/${input.book}.html`).save(input.highlight, { resumable: false })
	}),

});
