import { Fragment, useEffect, useState } from 'react';
import { Meteor, User, Previous, Settings } from '../assets';

const UserPage = () => {
    const [userData, setUserData] = useState([]);
    const [dropDown, setDropDown] = useState(false);

    const getUserData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:4000/profilePage', {
                method: "GET",
                headers: { "Auth-token": token }
            });
            const jsonData = await response.json();
            setUserData(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getUserData();
    },[]);

    const logOut = () => {
        const confirmOut = confirm("Are you sure you want to log out?");
        if (confirmOut) {
            localStorage.removeItem('token');
            window.location = '/login';
        } else {
            return;
        }
    };

    const myPosts = () => {
        window.location = '/myPosts';
    };

    const myReplies = () =>{
        window.location = '/myReplies';
    };

    const changePassword = () =>{
        window.location = '/profilePage/changePassword';
    };

    const dropDownToggle = () => {
        setDropDown(prevState => !prevState);
    };

    return (
        <Fragment>
            <div className='relative w-[100vw] h-[100vh] flex flex-col items-center font-roboto'>
                <div className='bg-second flex flex-col mt-5 py-8'>
                    {userData.map(data => (
                        <div 
                            key={data.username}
                            className='flex flex-col items-center gap-5 w-[60vw] h-full
                            phone:w-[90vw] tablet:w-[75vw] laptop:w-[45vw]'
                        >
                            <header className='relative flex flex-col justify-center items-center'>
                                <nav className='flex items-center justify-between mb-5
                                phone:w-[80vw]
                                tablet:w-[70vw]
                                laptop:w-[40vw]'>
                                    <a href='/posts'>
                                        <img src={Previous} alt='Previous Logo' className='phone:w-10 tablet:w-10'/>
                                    </a>
                                    <h1 className='text-4xl text-center font-bold ml-5'>Your Profile</h1>
                                    <button
                                        type="button"
                                        className='relative flex justify-center
                                        phone:w-16
                                        tablet:w-[9vw]
                                        laptop:w-[5vw]'
                                        onClick={dropDownToggle}
                                    >
                                        <img src={Settings} alt='Settings Logo' className='phone:w-10 tablet:w-10'/>
                                    </button>
                                    <div 
                                        className={`absolute ${dropDown ? 'visible' : 'hidden'} right-[-2vw] bg-second border text-center top-10`}
                                    >
                                        <ul>
                                            <li 
                                                onClick={changePassword} 
                                                className='cursor-pointer hover:bg-third hover:text-first px-2 py-1'
                                            >Change Password</li>
                                            <li
                                                onClick={logOut} 
                                                className='cursor-pointer hover:bg-third hover:text-first px-2 py-1'
                                            >Log Out</li>
                                        </ul>
                                    </div>
                                </nav>
                                <h1 className='text-2xl font-semibold mb-6 text-fifth'>{data.username}</h1>
                                <img src={User} alt='Profile Image' className='w-28 mb-10'/>
                                <h3 className='text-2xl font-semibold'>{data.first_name} {data.last_name}</h3>
                                <h3 className='text-xl italic font-medium'>{data.email}</h3>
                            </header>
                            <div className='flex gap-3 mt-1 mb-10'>
                                <button className='text-lg text-first bg-third hover:bg-fourth rounded-lg w-28 py-1' onClick={myPosts}>My Posts</button>
                                <button className='text-lg text-first bg-third hover:bg-fourth rounded-lg w-28 py-1' onClick={myReplies}>My replies</button>
                            </div>
                        </div>
                    ))}
                </div>
                <img src={Meteor} className='fixed w-[inherit] h-[inherit] z-[-10] bottom-0 object-cover'/>
            </div>
        </Fragment>
    );
};

export default UserPage;