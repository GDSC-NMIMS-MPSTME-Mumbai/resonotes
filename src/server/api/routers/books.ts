import type { BookType } from "@/components/Sidebar/Book";
import { BookCreateInputSchema } from "@/schema";
import { bucket } from "@/utils/storage";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const booksRouter = createTRPCRouter({
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const userid = ctx.session.user.id;

		const bookIds = await ctx.prisma.book.findMany({
			where: {
				user: userid
			}
		})

		const requests = bookIds.map((book) => {
			return new Promise((resolve, reject) => {
				fetch("https://www.googleapis.com/books/v1/volumes/" + book.book).then(res=>res.json()).then((data) => {
					resolve({
						id: data.id,
						title: data.volumeInfo.title,
						author: data.volumeInfo.authors?.[0],
						thumbnail: data.volumeInfo.imageLinks.thumbnail,
					})
				}).catch(err => reject(err))
			})
		});

		return await Promise.all(requests) as Array<BookType>;
	}),

	add: protectedProcedure.input(BookCreateInputSchema).mutation(async ({ ctx, input }) => {
		const userid = ctx.session.user.id;
		if (!input.book) throw new Error("Book ID is required");
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

		await bucket.file(`${userid}/${input.book}.html`).save("", { resumable: false })

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

		try {
			await bucket.file(`${userid}/${input.book}.html`).delete()
		} catch(err) {}

		return await ctx.prisma.book.delete({ where: {
			id: exists.id
		} })
	}),

	get: protectedProcedure.input(BookCreateInputSchema).query(async ({ ctx, input }) => {
		const userid = ctx.session.user.id;

		const exists = await ctx.prisma.book.findFirst({
			where: {
				user: userid,
				book: input.book
			}
		})

		if (!exists) {
			throw new Error("Book not found in Your Library");
		}

		const res = await fetch("https://www.googleapis.com/books/v1/volumes/" + input.book)
		const data = await res.json();

		return {
			id: data.id,
			title: data.volumeInfo.title,
			author: data.volumeInfo.authors?.[0],
			thumbnail: data.volumeInfo.imageLinks.thumbnail,
		}
	})
});
