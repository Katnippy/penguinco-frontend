import { useParams } from 'react-router-dom';

export default function Store() {
  const params = useParams<{ id: string }>();

  return (
    <>
      <h1>Store {params.id}</h1>
    </>
  );
}
