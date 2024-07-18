import { Fragment, useEffect, useState } from 'react';
import { Meteor, User, Previous } from '../assets';

const UserPage = () => {
    const [userData, setUserData] = useState([]);
    
    const url = 'https://statusku-api.vercel.app/profilePage';

    const getUserData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(url, {
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
        localStorage.removeItem('token');
        window.location = '/login';
    };

    const myPosts = () => {
        window.location = '/myPosts';
    };

    const myReplies = () =>{
        window.location = '/myReplies';
    };

    return (
        <Fragment>
            <div className='relative w-[100vw] h-[100vh] flex flex-col items-center font-roboto'>
                <div className='bg-second flex flex-col mt-5 py-8'>
                    {userData.map(data => (
                        <div 
                            key={data.username}
                            className='flex flex-col items-center gap-5 w-[60vw] h-full
                            phone:w-[90vw] tablet:w-[75vw] laptop:w-[45vw] '
                        >
                            <header className='relative flex flex-col justify-center items-center'>
                                <nav className='flex w-full items-center justify-start'>
                                    <a 
                                        href='/posts'
                                        className='self-start absolute left-[-20vw] top-[-5px]
                                        phone:left-[-10vw] phone:top-[-20px]
                                        tablet:left-[-15vw] tablet:top-[-15px]
                                        laptop:left-[-10vw] laptop:top-[-20px]'
                                    >
                                        <img src={Previous} alt='Previous Logo' className='phone:w-8 tablet:w-12'/>
                                    </a>
                                    <h1 className='text-4xl font-bold text-center mb-5 ml-8'>Your Profile</h1>
                                </nav>
                                <h1 className='text-2xl font-semibold mb-6 text-fifth'>{data.username}</h1>
                                <img src={User} alt='Profile Image' className='w-28 mb-3'/>
                                <h3 className='text-2xl font-semibold'>{data.first_name} {data.last_name}</h3>
                                <h3 className='text-xl italic font-medium'>{data.email}</h3>
                            </header>
                            <div className='flex gap-3 mt-1 mb-10'>
                                <button className='text-lg text-first bg-third hover:bg-fourth rounded-lg w-28 py-1' onClick={myPosts}>My Posts</button>
                                <button className='text-lg text-first bg-third hover:bg-fourth rounded-lg w-28 py-1' onClick={myReplies}>My replies</button>
                            </div>
                            <button className='text-xl text-first bg-third hover:bg-fourth rounded-lg w-24 py-1' onClick={logOut}>Logout</button>
                        </div>
                    ))}
                    <footer></footer>
                </div>
                <img src={Meteor} className='fixed w-[inherit] h-[inherit] z-[-10] bottom-0 object-cover'/>
            </div>
        </Fragment>
    );
};

export default UserPage;