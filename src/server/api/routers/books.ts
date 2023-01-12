import type { BookType } from "@/components/Sidebar/Book";
import { BookCreateInputSchema } from "@/schema";
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
						id: book.id,
						title: data.volumeInfo.title,
						author: data.volumeInfo.authors[0],
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
