import { Success } from "../types";

type BannerProps = {
	data: Success;
	actionHandler: (actionId: number) => void;
};

export const SuccessBanner = ({ data, actionHandler }: BannerProps) => {
	const itWasNotDeletingAction = (): boolean => {
		if (!data.message.includes("deleted")) return true;
		return false;
	};

	return (
		<div className="flex flex-col px-6  py-3 gap-y-10 bg-green-300 rounded-md my-3">
			<div className="font-medium text-lg">{data.message}</div>
			<div className="flex gap-x-5 justify-center">
				{itWasNotDeletingAction() && (
					<button className="bg-indigo-300 px-2 py-1 rounded-md hover:bg-indigo-400 border border-black font-medium" onClick={() => actionHandler(1)}>
						View Task
					</button>
				)}
				<button className="mx-3 bg-blue-300 px-2 py-1 rounded-md hover:bg-blue-400 border border-black font-medium" onClick={() => actionHandler(2)}>
					Add New
				</button>
				<button className="bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400 border border-black font-medium" onClick={() => actionHandler(3)}>
					Todos List
				</button>
			</div>
		</div>
	);
};
