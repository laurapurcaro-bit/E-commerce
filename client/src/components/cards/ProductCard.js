import moment from "moment";

export default function ProductCard({ product }) {
  function productDesc(description) {
    if (description.length < 60) {
      return description;
    } else {
      return description.substring(0, 60) + "...";
    }
  }
  return (
    <div className="card mb-3 hoverable">
      <img
        src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
        alt={product.name}
        // className="img img-responsive"
        height="300px"
        width="230px"
        style={{ objectFit: "cover" }}
      />
      <div className="card-body">
        <h5>{product?.name}</h5>
        <p className="card-text">{productDesc(product?.description)}</p>
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary col card-button-footer"
          style={{ borderBottomLeftRadius: "5px" }}
        >
          View Product
        </button>
        <button
          className="btn btn-outline-primary col card-button-footer"
          style={{ borderBottomRightRadius: "5px" }}
        >
          Add to Cart
        </button>
      </div>
      {/* <p>{moment(product?.createdAt).fromNow()}</p>
      <p>{product?.sold} sold</p> */}
    </div>
  );
}
