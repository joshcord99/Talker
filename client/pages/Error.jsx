import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error-page">
      <h1>Oops!</h1>
<h1>404: Page Not Found</h1>
<h1> ¯\_(ツ)_/¯</h1>
    </div>
  );
}




