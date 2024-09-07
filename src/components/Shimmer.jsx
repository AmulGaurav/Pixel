const Shimmer = () => {
  return (
    <div className="mx-auto max-w-[600px] pt-8">
      <div className="flex justify-center mb-4">
        <div className="bg-gray-700 h-10 w-32 rounded animate-pulse"></div>
        <div className="bg-gray-700 h-10 w-32 rounded animate-pulse ml-4"></div>
      </div>

      <div className="bg-gray-700 rounded-xl px-5 pt-5 pb-2 mb-12 animate-pulse">
        <div className="bg-gray-600 h-8 w-full rounded mb-4"></div>
        <div className="bg-gray-600 h-8 w-full rounded mb-4"></div>
      </div>

      <div className="bg-gray-700 h-40 w-full rounded animate-pulse mt-4"></div>
    </div>
  );
};

export default Shimmer;
