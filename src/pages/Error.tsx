import { Link } from 'react-router-dom';

export default function Error() {
  return(
    <div>
      <h1>Error</h1>
      <p>
        An error has occurred! Click <Link to={'/stores'}>here</Link> to return
        home.
      </p>
    </div>
  );
}
