import { useState, useEffect, useRef } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";

function App() {
	const [products, setProducts] = useState([]);
	const [start, setStart] = useState(0);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const observer = useRef(null);
	const sentinelRef = useRef(null);

	// Fetch products in chunks
	const fetchData = async (start) => {
		if (loading || !hasMore) return;

		setLoading(true);
		const data = await fetch(
			`https://dummyjson.com/products?limit=20&skip=${start}`
		);
		const res = await data.json();

		setProducts((prev) => {
			const existingIds = new Set(prev.map((p) => p.id));
			const newProducts = res.products.filter(
				(p) => !existingIds.has(p.id)
			);
			return [...prev, ...newProducts];
		});
		setHasMore(start + 20 < res.total);
		setLoading(false);
	};

	// Fetch when start changes
	useEffect(() => {
		console.log("start", start);
		fetchData(start);
	}, [start]);

	// Setup IntersectionObserver once
	useEffect(() => {
		if (observer.current) observer.current.disconnect();

		// entries[0].isIntersecting tells us: Is the sentinel visible in the viewport?
		// If yes, and we still have products to load (hasMore) and are not already fetching (!loading), then:
		// setStart((prev) => prev + 20) → increments the offset → triggers next API call.
		observer.current = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasMore && !loading) {
					setStart((prev) => prev + 20);
				}
			},
			{ threshold: 1.0 } // Trigger only when sentinel is fully visible
		);

		/* Means: "Watch this element (the sentinel). Let me know when it becomes visible."
      The sentinel is a simple <div ref={sentinelRef} /> placed at the bottom of the product list.
      So when the user scrolls near the bottom, the sentinel enters the viewport → observer fires. */

		if (sentinelRef.current) {
			observer.current.observe(sentinelRef.current);
		}

		return () => observer.current?.disconnect();
	}, [hasMore, loading]);

	return (
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
				{/* Sentinel element at the bottom */}
				<div ref={sentinelRef} style={{ height: "1px" }}></div>
			</div>

			{loading && <div className="loading">Loading...</div>}
			{!hasMore && <div className="loading">All products loaded!</div>}
		</div>
	);
}

export default App;
