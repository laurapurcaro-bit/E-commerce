import moment from "moment";

export default function ProductCard({ product }) {
  return (
    <div className="card mb-3">
      <img
        src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
        alt={product.name}
        // className="img img-responsive"
        height="300px"
        width="230px"
        style={{ objectFit: "cover" }}
      />
      <p>{product.name}</p>
      <p>{moment(product.createdAt).fromNow()}</p>
      <p>{product.sold} sold</p>
    </div>
  );
}
