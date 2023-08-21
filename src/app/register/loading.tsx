export default async function Loading() {
	return (
		<main className="min-h-screen w-full bg-dark p-4 flex flex-col gap-8 md:p-8 justify-center items-center">
			<section className="w-full md:w-[60%] p-4 card shadow-xl bg-dark-focus rounded-2xl flex flex-col gap-4 animate-pulse">
				<span className="flex flex-col gap-3">
					<span className="flex flex-col gap-2">
						<span className="bg-slate-700 rounded-md w-1/4 h-2"></span>
						<span className="bg-slate-700 rounded-md w-full h-8"></span>
					</span>
					<span className="flex flex-col gap-2">
						<span className="bg-slate-700 rounded-md w-1/4 h-2"></span>
						<span className="bg-slate-700 rounded-md w-full h-8"></span>
					</span>
				</span>
			</section>
		</main>
	);
}
