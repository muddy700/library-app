import { Error, GlobalError, Validation } from "../types";

type BannerProps = {
	data: Error;
};

export const ErrorBanner = ({ data }: BannerProps) => {
	if (!data.timestamp && !data.path) {
		const newError: GlobalError = data as unknown as GlobalError;

		return (
			<div className="flex flex-col text-start p-3 gap-y-2 bg-red-300 rounded-md my-3">
				<div>
					<b>Status:</b> {newError.status}
				</div>
				<div>
					<b>API:</b> {newError.instance}
				</div>
				<div>
					<b>Title:</b> {newError.title}
				</div>
				<div>
					<b>Type:</b> {newError.type}
				</div>
				<div>
					<b>Description: </b>
					{newError.detail}
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col text-start p-3 gap-y-2 bg-red-300 rounded-md my-3">
			<div>
				<b>Time:</b> {data.timestamp}
			</div>
			<div>
				<b>API:</b> {data.path}
			</div>
			<div>
				<b>Title:</b> {data.title}
			</div>
			<div>
				<b>Description: </b>
				{data.description}
			</div>
			{data.validations && (
				<div>
					<b>Validations: </b>
					<div className="pl-10">
						{data.validations.map((validation: Validation) => (
							<div key={validation.fieldName}>
								<b>{validation.fieldName}</b>: {validation.errorMessage}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
