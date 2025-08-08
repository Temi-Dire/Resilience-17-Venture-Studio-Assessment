# Resilience-17-Venture-Studio-Assessment

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

---

# Code Snippet

- When making a section for a page. Use the following format:
- the section top/bottom padding can be changed by changing the `py-25`
- the section background color can be changed by changing the `bg-background` class
- the section inner content width can be changed by adding a specific width to the div.container class, NEVER remove the `container` class itself. so example would be adding `max-w-md`, `max-w-sm` or `max-w-lg` to the end of div.container class

```tsx
<section className="flex w-full flex-col bg-background px-5 py-25">
	<div className="container mx-auto w-full">
		{/*  */}

		{/* content goes here */}
		<div className="py-12 bg-black" />

		{/*  */}
	</div>
</section>
```
