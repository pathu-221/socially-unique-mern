export default function Loading() {
	return (
		<main className="min-h-screen bg-dark flex flex-col gap-8 p-8 justify-center items-center">
			<div className="w-[60%] p-4 card shadow-xl bg-dark-focus min-h-[500px] rounded-2xl flex flex-col gap-2 animate-pulse">
				<title>Loading</title>
				<span className="flex items-center">
					<span className="bg-slate-700 rounded-full h-10 aspect-square w-10"></span>
					<span className="flex gap-2.5 flex-col px-1">
						<span className="bg-slate-700 rounded-md w-20 h-2"></span>
						<span className="bg-slate-700 rounded-md w-28 h-2"></span>
					</span>
				</span>
				<span className="flex flex-col gap-2 mt-2">
					<span className="bg-slate-700 rounded-md w-full h-2.5"></span>
					<span className="bg-slate-700 rounded-md w-full h-2.5"></span>
					<span className="bg-slate-700 rounded-md w-1/2 h-2.5"></span>
					<span className="bg-slate-700 rounded-md w-full h-80 mt-4"></span>
				</span>
			</div>
			<div className="w-[60%] p-4 card shadow-xl bg-dark-focus min-h-[500px] rounded-2xl flex flex-col gap-2 animate-pulse">
				<span className="flex items-center">
					<span className="bg-slate-700 rounded-full h-10 aspect-square w-10"></span>
					<span className="flex gap-2.5 flex-col px-1">
						<span className="bg-slate-700 rounded-md w-20 h-2"></span>
						<span className="bg-slate-700 rounded-md w-28 h-2"></span>
					</span>
				</span>
				<span className="flex flex-col gap-2 mt-2">
					<span className="bg-slate-700 rounded-md w-full h-3"></span>
					<span className="bg-slate-700 rounded-md w-full h-3"></span>
					<span className="bg-slate-700 rounded-md w-1/2 h-3"></span>
					<span className="bg-slate-700 rounded-md w-full h-80 mt-4"></span>
				</span>
			</div>
		</main>
	);
}
