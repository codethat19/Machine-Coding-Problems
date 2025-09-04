import { useState, useEffect, useRef, useCallback } from "react";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
	const [products, setProducts] = useState([]);
	const [start, setStart] = useState(0);
	const [loading, setLoading] = useState(false);
	const [productsQuantity, setProductsQuantity] = useState(0);
	const isLoadingRef = useRef(false);

	const handleInfiniteScroll = useCallback(async () => {
		if (isLoadingRef.current) return; // Prevent multiple calls

		const scrollHeight = document.documentElement.scrollHeight;
		const innerHeight = window.innerHeight;
		const scrollTop = document.documentElement.scrollTop;

		if (scrollHeight - innerHeight - scrollTop < 10) {
			setStart((prevStart) => prevStart + 20);
			console.log("Calling API");
		}
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			// Check if we've already loaded all products
			if (productsQuantity > 0 && products.length >= productsQuantity) {
				return;
			}

			isLoadingRef.current = true;
			setLoading(true);

			const data = await fetch(
				`https://dummyjson.com/products?limit=20&skip=${start}`
			);
			const res = await data.json();
			setProductsQuantity(res.total);
			setProducts((prevProducts) => {
				// Filter out any duplicate products by ID
				const existingIds = new Set(prevProducts.map((p) => p.id));
				const newProducts = res.products.filter(
					(p) => !existingIds.has(p.id)
				);
				return [...prevProducts, ...newProducts];
			});
			setLoading(false);
			isLoadingRef.current = false;
		};

		fetchData();
	}, [start, products.length, productsQuantity]);

	useEffect(() => {
		window.addEventListener("scroll", handleInfiniteScroll);

		return () => window.removeEventListener("scroll", handleInfiniteScroll);
	}, [handleInfiniteScroll]);

	return !products.length ? (
		<>
			<h1>Products</h1>
			<h3>No products found</h3>
		</>
	) : (
		<div className="app">
			<h1>Products</h1>
			<div className="products-container">
				{products.map((product) => (
					<ProductCard
						key={product.id}
						image={product.thumbnail}
						title={product.title}
					/>
				))}
			</div>
			{loading && <div className="loading">Loading</div>}
			{productsQuantity > 0 && products.length >= productsQuantity && (
				<div className="loading">All products loaded!</div>
			)}
		</div>
	);
}

export default App;
