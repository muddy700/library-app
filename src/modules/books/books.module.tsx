import { Navigate, Route, Routes } from "react-router-dom";
import { BookDetails, BooksList, Create, Update } from "./components";

export const BooksModule = () => {
	return (
		<Routes>
			<Route index element={<Navigate to={"list"} />} />
			<Route path="list" element={<BooksList />} />
			<Route path="create" element={<Create />} />
			<Route path=":bookId/details" element={<BookDetails />} />
			<Route path=":bookId/update" element={<Update />} />
		</Routes>
	);
};
