const Navbar = () => {
  return (
    <nav className="flex justify-between items-center mb-28">
      <div className="flex items-center">
        <div className="w-7 h-7 bg-indigo-600 rounded-full mr-2"></div>
        <span className="text-2xl font-bold text-white">Pixel</span>
      </div>

      <a
        href="https://github.com/AmulGaurav/Pixel"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
      >
        GitHub
      </a>
    </nav>
  );
};

export default Navbar;
