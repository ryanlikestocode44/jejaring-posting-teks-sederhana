import {Fragment, useState} from 'react';
import { Sprinkle } from '../assets';

const RegisterPage = () => {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [firstNameInput, setFirstNameInput] =useState("");
    const [lastNameInput, setLastNameInput] = useState("");

    // Error Value
    const [warningMessage, setWarningMessage] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    
    const usernameRegex = /^[a-zA-Z]+(?:[_-]?[a-zA-Z])/; // To check if username starts from a letter and max length is 30
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // To check email input format

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const username = usernameInput;
        const password = passwordInput;
        const email = emailInput;
        const first_name = firstNameInput;
        const last_name = lastNameInput;
        const registerUser = {username, email, first_name, last_name, password};
        register(registerUser);
    }

    const usernameTextHandler = (e) => {
      const inputValue = e.target.value;
      if (inputValue.length > 1 && usernameRegex.test(inputValue)) {
        setUsernameError(null)
      } else {
        setUsernameError('Invalid username');
      }
      setUsernameInput(inputValue);
    }

    const passwordTextHandler = (e) => {
      const inputValue = e.target.value;
      if (inputValue.length > 0 && inputValue.length >= 8){
        setPasswordError(null)
      } else {
        setPasswordError('Password must be at least 8 characters');
      }
      setPasswordInput(inputValue);
    }
    
    const emailTextHandler = (e) => {
      const inputValue = e.target.value;
      if (emailRegex.test(inputValue)) {
        setEmailError(null);
      } else {
        setEmailError('Invalid email address');
      }
      setEmailInput(inputValue);
    }

    const firstNameTextHandler = (e) => {
      const inputValue = e.target.value;
      setFirstNameInput(inputValue);
    }

    const lastNameTextHandler = (e) => {
      const inputValue = e.target.value;
      setLastNameInput(inputValue);
    }

    const register = async (registerUser) => {
        try {
          const data = await fetch("http://localhost:4000/register", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(registerUser)
          });

          const jsonData = await data.json();

          if (jsonData.token) {
            localStorage.setItem('token', jsonData.token);
            window.location = '/success';
          } else {
            setWarningMessage(jsonData.message);
          }
        } catch (err) {
          setWarningMessage('Registration Error.');
        }
      };

    return (
      <Fragment>
        <div className='relative flex flex-col items-center font-roboto'>
          <div 
            className='card bg-first flex flex-col justify-center items-center w-[30vw] gap-2 rounded-lg py-10
            phone:w-[95vw] phone:py-8 phone:my-[10vh]
            tablet:w-[60vw] tablet:py-8
            laptop:w-[45vw] laptop:py-8 laptop:my-[2vh]
            desktop:w-[30vw] desktop:py-8'
          >
            <h1 className='text-center text-3xl font-bold
            phone:text-2xl phone:mb-2'
            >Register</h1>
            <form className='flex flex-col items-center gap-2 mt-8'>
              <label 
                htmlFor='username'
                className='text-lg font-semibold'>Username</label>
              <input
                id='username'
                value={usernameInput}
                onChange={usernameTextHandler}
                type="text"
                className='border-third text-lg pb-1 px-2 block border-2 rounded-lg mb-2 w-[25vw] h-9
                phone:w-[80vw]
                tablet:w-[50vw]
                laptop:w-[30vw]
                desktop:w-[25vw]'
                required
              />
              {usernameError && <div className='text-red-500'>{usernameError}</div>}

              <label htmlFor='password' className='text-lg font-semibold'>Password</label>
              <input 
                id='password' 
                value={passwordInput}
                onChange={passwordTextHandler} 
                type="password" 
                className='border-third text-lg pb-1 px-2 block border-2 rounded-lg mb-2 w-[25vw] h-9
                phone:w-[80vw]
                tablet:w-[50vw]
                laptop:w-[30vw]
                desktop:w-[25vw]'
                required
              />
              {passwordError && <div className='text-red-500'>{passwordError}</div>}

              <label htmlFor='email' className='text-lg font-semibold'>Email</label>
              <input 
                id='email'
                value={emailInput}
                onChange={emailTextHandler}
                type="email"
                className='border-third text-lg pb-1 px-2 block border-2 rounded-lg mb-2 w-[25vw] h-9
                phone:w-[80vw]
                tablet:w-[50vw]
                laptop:w-[30vw]
                desktop:w-[25vw]'
                required
              />
              {emailError && <div className='text-red-500'>{emailError}</div>}

              <label htmlFor='firstName' className='text-lg font-semibold'>First Name</label>
              <input 
                id='firstName' 
                value={firstNameInput} 
                onChange={firstNameTextHandler} 
                type="text" 
                className='border-third text-lg pb-1 px-2 block border-2 rounded-lg mb-2 w-[25vw] h-9
                phone:w-[80vw]
                tablet:w-[50vw]
                laptop:w-[30vw]
                desktop:w-[25vw]'
                required
              />

              <label htmlFor='lastName' className='text-lg font-semibold'>Last Name</label>
              <input 
                id='lastName' 
                value={lastNameInput}
                onChange={lastNameTextHandler}
                type="text" 
                className='border-third text-lg pb-1 px-2 block border-2 rounded-lg mb-2 w-[25vw] h-9
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
                className='text-xl bg-third text-first font-medium rounded-lg w-32 px-2 py-2 mt-4'
                onClick={onSubmitForm}>
                Submit
              </button>
            </form>
            <p
              className='text-lg mt-5'>Sudah punya akun? <a href='/login' className='underline font-semibold hover:text-third'>Login</a>
            </p>
          </div>
          <img src={Sprinkle} className='fixed w-[100vw] h-[100vh] z-[-10] object-cover'/>
        </div>
      </Fragment>
    );
};

export default RegisterPage;