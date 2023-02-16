export default function CategoryForm(props) {
  return (
    <div className="p-3">
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          className="form-control p-3"
          placeholder="Write category name"
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
        ></input>
        <button className="btn btn-primary mt-3">Submit</button>
      </form>
    </div>
  );
}
