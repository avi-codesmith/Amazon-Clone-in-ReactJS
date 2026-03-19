export default function ShowMoreBtn({ loadingState, handleLimit }) {
  return (
    <button
      disabled={loadingState}
      className="show-btn"
      onClick={() => {
        handleLimit();
      }}
    >
      {loadingState ? "Loading..." : "Show More"}
    </button>
  );
}
