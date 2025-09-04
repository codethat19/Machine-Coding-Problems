export default function ProductCard({ image, title }) {
	return (
		<div className="product-card">
			<img src={image} alt={title} className="product-img" />
			<div>{title}</div>
		</div>
	);
}
