import { Link } from 'react-router-dom';

export default function NotFound() {
  return(
    <div>
      <h1>404</h1>
      <p>
        You&apos;re lost! Click <Link to={'/stores'}>here</Link> to return
        home.
      </p>
    </div>
  );
}
