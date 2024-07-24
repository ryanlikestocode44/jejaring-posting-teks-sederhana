import { Fragment, useState } from 'react'
import { Sprinkle } from '../assets';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            try {
                const token = localStorage.getItem("token");
                const body = { password };
                const response = await fetch('http://localhost:4000/profilePage/password', {
                    method: 'PUT',
                    headers: {"Content-type": "application/json", "Auth-token": token},
                    body: JSON.stringify(body),
                });

                const data = await response.json();
                console.log(data);
                
                if (data) {
                    setTimeout(() => {
                        alert('Password Updated Successfully!');
                        window.location = '/profilePage';
                    }, 3000)
                } else {
                    setError('Failed updating profile');
                }
            } catch (error) {
                setError('Input valid password');
            }
        }
    };

    const passwordTextHandler = (e) => {
        setPassword(e.target.value);
    }
  
    const confirmTextHandler = (e) => {
        setConfirmPassword(e.target.value);
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
                <h1 className='text-center text-3xl font-bold
                    phone:text-2xl'
                >Change Password</h1>
                <form className='flex flex-col items-center gap-2'>
                    <label 
                        htmlFor='password'
                        className='text-lg font-semibold'
                    >Password</label>
                    <input
                        id='password'
                        value={password}
                        onChange={passwordTextHandler}
                        type="password"
                        className='text-lg pb-1 px-2 block border-2 border-third rounded-lg mb-6 w-[25vw] h-9 
                        phone:w-[80vw]
                        tablet:w-[50vw]
                        laptop:w-[30vw]
                        desktop:w-[25vw]'
                        required
                    />

                    <label htmlFor='confirm-password' className='text-lg font-semibold'>Confirm Password</label>
                    <input 
                        id='confirm-password' 
                        value={confirmPassword} 
                        onChange={confirmTextHandler} 
                        type="password"
                        className='text-lg pb-1 px-2 block border-2 border-third rounded-lg mb-2 w-[25vw] h-9
                        phone:w-[80vw]
                        tablet:w-[50vw]
                        laptop:w-[30vw]
                        desktop:w-[25vw]'
                        required
                    />
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <button 
                        className='text-xl bg-third text-first font-medium rounded-lg w-32 px-2 py-2 mt-4 
                        phone:mt-12'
                        onClick={onSubmitForm}
                    >
                        Submit
                    </button>
                </form>
            </div>
            <img src={Sprinkle} className='fixed w-[100vw] h-[100vh] z-[-10] object-cover'/>
        </div>
      </Fragment>
  )
}

export default ChangePassword