const VerificationForm = () => {
  return (
    <div className="absolute bottom-8 left-4 right-4">

      <div className="w-full flex flex-col bg-gray-800/10 p-3 border-gray-600 backdrop-filter backdrop-blur-sm border border-gray-600 text-right mb-20 rounded-3xl rounded-br-none z-10 gap-4">
        <span>Name</span>
        <span>Registered</span>
        <span>Transport Info</span>
      </div>

      <form action="/" method="get">
        <div className="flex items-center w-full">
          <input
            type="text"
            placeholder="Phone Number"
            className="border border-r-none p-2 rounded-l-lg basis-4/5 focus:outline-none outline-none"
          />
          <button className="bg-blue-500 text-white border border-l-none p-2 rounded-r-lg basis-1/5">
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;
