export default function PaginationContainer({
	currentPage,
	goToNextPage,
	goToPreviousPage,
	noOfPages,
	handlePageChange,
}) {
	return (
		<div className="page-numbers-container">
			<button
				disabled={currentPage === 0}
				className="page-number"
				onClick={goToPreviousPage}
			>
				⬅️
			</button>
			{[...Array(noOfPages).keys()].map((n) => {
				return (
					<span
						className={`page-number ${
							currentPage === n ? "page-number-selected" : ""
						}`}
						key={n}
						onClick={() => handlePageChange(n)}
					>
						{n + 1}
					</span>
				);
			})}
			<button
				disabled={currentPage === noOfPages - 1}
				className="page-number"
				onClick={goToNextPage}
			>
				➡️
			</button>
		</div>
	);
}
