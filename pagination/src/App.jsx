import "./App.css";
import { useEffect, useState } from "react";
import { PAGE_SIZE } from "./constants";
import ProductCard from "./components/ProductCard";
import PaginationContainer from "./components/PaginationContainer";

function App() {
	const [products, setProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);

	const fetchData = async () => {
		const data = await fetch("https://dummyjson.com/products?limit=500");
		const res = await data.json();

		setProducts(res.products);
	};

	useEffect(() => {
		fetchData();
	}, []);

	const totalProducts = products.length;
	const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
	const start = currentPage * PAGE_SIZE;
	const end = (currentPage + 1) * PAGE_SIZE;

	const handlePageChange = (n) => {
		setCurrentPage(n);
	};

	const goToNextPage = () => {
		if (currentPage < noOfPages - 1) {
			setCurrentPage((prevPage) => prevPage + 1);
		}
	};

	const goToPreviousPage = () => {
		if (currentPage > 0) {
			setCurrentPage((prevPage) => prevPage - 1);
		}
	};

	return !products.length ? (
		<h1>No products found</h1>
	) : (
		<div className="app">
			<h1>Products</h1>
			<div className="products-container">
				{products.slice(start, end).map((product) => (
					<ProductCard
						key={product.id}
						image={product.thumbnail}
						title={product.title}
					/>
				))}
			</div>

			<PaginationContainer
				currentPage={currentPage}
				goToNextPage={goToNextPage}
				goToPreviousPage={goToPreviousPage}
				noOfPages={noOfPages}
				handlePageChange={handlePageChange}
			/>
		</div>
	);
}

export default App;
