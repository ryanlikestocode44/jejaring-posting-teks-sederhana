import { Fragment, useState } from 'react';
import { Sprinkle } from '../assets';

const LoginPage = () => {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [warningMessage, setWarningMessage] = useState("");

    const login = async (userLogin) => {
      try {
        const data = await fetch("https://statusku-api.vercel.app/login", {
          method: "POST",
          headers:{"Content-type": "application/json"},
          body: JSON.stringify(userLogin)
        });

        const jsonData = await data.json();

        if (jsonData.token) {
          localStorage.setItem('token', jsonData.token);
          window.location = '/posts';
        } else {
          setWarningMessage(jsonData.message);
        }
      } catch (err) {
        setWarningMessage('Invalid username or password.');
      }
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const username = usernameInput;
        const password = passwordInput;
        const userLogin = {username, password};
        login(userLogin);
    }

    const usernameTextHandler = (e) => {
      setUsernameInput(e.target.value);
    }

    const passwordTextHandler = (e) => {
      setPasswordInput(e.target.value);
    }


    return (
      <Fragment>
        <div className='relative flex flex-col items-center font-roboto'>
          <div 
            className='card bg-first flex flex-col justify-center items-center gap-8 rounded-lg mt-[5vh] py-10 
            phone:w-[95vw] phone:py-8 phone:mt-[20vh]
            tablet:w-[60vw] tablet:py-8 tablet:mt-[10vh]
            laptop:w-[45vw] laptop:py-8 laptop:mt-[5vh]
            desktop:w-[30vw] desktop:py-8 desktop:mt-[5vh]'
          >
            <h1 className='text-center text-3xl font-bold mb-5 
            phone:text-2xl phone:mb-2'
            >Login</h1>
            <form className='flex flex-col items-center gap-2'>
              <label 
                htmlFor='username'
                className='text-lg font-semibold'
              >Username</label>
              <input
                id='username'
                value={usernameInput}
                onChange={usernameTextHandler}
                type="text"
                className='text-lg pb-1 px-2 block border-2 border-third rounded-lg mb-6 w-[25vw] h-9 
                phone:w-[80vw]
                tablet:w-[50vw]
                laptop:w-[30vw]
                desktop:w-[25vw]'
                required
              />

              <label htmlFor='password' className='text-lg font-semibold'>Password</label>
              <input 
                id='password' 
                value={passwordInput} 
                onChange={passwordTextHandler} 
                type="password"
                className='text-lg pb-1 px-2 block border-2 border-third rounded-lg mb-2 w-[25vw] h-9
                phone:w-[80vw]
                tablet:w-[50vw]
                laptop:w-[30vw]
                desktop:w-[25vw]'
                required
              />
              {warningMessage && (
                <p className='text-red-500 text-lg'>{warningMessage}</p>
              )}
              <button 
                className='text-xl bg-third text-first font-medium rounded-lg w-32 px-2 py-2 mt-4 
                phone:mt-12'
                onClick={onSubmitForm}>
                Submit
              </button>
            </form>
            <p 
              className='text-lg'>Belum punya akun? 
              <a href='/register' 
              className='underline font-semibold hover:text-third'> Register</a>
            </p>
          </div>
          <img src={Sprinkle} className='fixed w-[100vw] h-[100vh] z-[-10] object-cover'/>
        </div>
      </Fragment>
    );
};

export default LoginPage;