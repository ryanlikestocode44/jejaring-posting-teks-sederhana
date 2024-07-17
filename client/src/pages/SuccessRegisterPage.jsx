const SuccessRegisterPage = () => {
  const login = () =>{
    window.location = '/login';
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 ">
      <div className="flex flex-col items-center gap-6 max-w-md mx-auto bg-white rounded-lg shadow-md p-4 mt-[10vh]">
        <h2 className="text-4xl font-bold mb-4 text-center">Success Creating New Account!</h2>
        <p className="text-xl text-gray-600 mb-4 text-center">Your account has been successfully created. Please log in to your account to start using the app.</p>

        <button 
          className='bg-third hover:bg-fourth text-white font-bold py-2 px-4 rounded'
          onClick={login}
        >Go to Login</button>
      </div>
    </div>
  );
}

export default SuccessRegisterPage;