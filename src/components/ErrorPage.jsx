import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>

        <p className="text-xl text-gray-700 mb-4">
          {error.statusText ||
            error.message ||
            "Sorry, an unexpected error has occurred."}
        </p>

        {error.status === 404 ? (
          <p className="text-gray-600 mb-6">
            The page you&#39;re looking for doesn&#39;t exist.
          </p>
        ) : (
          <p className="text-gray-600 mb-6">
            Our team has been notified and we&#39;re working on it.
          </p>
        )}

        <Link
          to="/"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
