import { BaseTask } from "../types";

type TaskRowProps = {
	taskInfo: BaseTask;
	hoveredTask: number;
	toggleHoveredTask: (taskId: number) => void;
	eventHandler: (eventId: number, taskId: number) => void;
};

export const TaskRow = ({ taskInfo, eventHandler, hoveredTask, toggleHoveredTask }: TaskRowProps) => {
	return (
		<div className="grid grid-cols-7 my-1 border rounded py-1 hover:shadow-xl hover:bg-gray-300/25" onMouseEnter={() => toggleHoveredTask(taskInfo.id)} onMouseLeave={() => toggleHoveredTask(0)}>
			<span className="bg-gray-300 rounded px-2 font-light place-self-center col-span-1">{taskInfo.id}</span>
			<span className="place-self-center col-span-3 text-left">{taskInfo.title}</span>
			{hoveredTask === taskInfo.id && (
				<div className="col-start-6 col-span-2 ">
					<button className="bg-indigo-300 px-2 py-1 rounded-md hover:bg-indigo-600" onClick={() => eventHandler(1, taskInfo.id)}>
						View
					</button>
					<button className="mx-3 bg-sky-300 px-2 py-1 rounded-md hover:bg-sky-600" onClick={() => eventHandler(2, taskInfo.id)}>
						Edit
					</button>
					<button className="bg-red-300 px-2 py-1 rounded-md hover:bg-red-600" onClick={() => eventHandler(3, taskInfo.id)}>
						Delete
					</button>
				</div>
			)}
		</div>
	);
};
