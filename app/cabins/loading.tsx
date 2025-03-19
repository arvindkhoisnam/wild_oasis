import Spinner from "../_components/Spinner";

function loading() {
  return (
    <div>
      <Spinner />
      <p className="place-self-center">Loading cabin</p>
    </div>
  );
}

export default loading;
