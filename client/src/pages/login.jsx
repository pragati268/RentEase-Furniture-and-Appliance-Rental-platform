const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">

      <div className="shadow-lg p-8 rounded-xl w-[25%]">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-3 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-3 mb-4 rounded"
        />

        <button className="bg-black text-white w-full py-3 rounded">
          Login
        </button>

      </div>
    </div>
  );
};

export default Login;