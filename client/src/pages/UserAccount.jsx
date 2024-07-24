import { Fragment, useEffect, useState } from 'react';
import { Meteor, User, Previous } from '../assets';
import AccountPosts from '../components/AccountPosts';
import { useParams } from 'react-router-dom';

const UserAccount = () => {
    const { username } = useParams();
    const [userData, setUserData] = useState([]);

    const getAccountData = async () => {
        try {
            const response = await fetch(`http://localhost:4000/profilePage/${username}`, {
                method: "GET"
            });
            const jsonData = await response.json();
            setUserData(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getAccountData();
    }, []);

    return (
        <Fragment>
            <div className='relative w-[100vw] h-[100vh] flex flex-col items-center font-roboto overflow-x-hidden'>
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
                                        phone:left-[-5vw] phone:top-[-20px]
                                        tablet:left-[-20vw] tablet:top-[-15px]
                                        laptop:left-[-10vw] laptop:top-[-20px]'
                                    >
                                        <img src={Previous} alt='Previous Logo' className='phone:w-8 tablet:w-12'/>
                                    </a>
                                    <h1 className='text-4xl font-bold text-center mb-5 ml-8 phone:text-3xl'>Account Profile</h1>
                                </nav>
                                <h1 className='text-2xl font-semibold mb-6 text-fifth'>{data.username}</h1>
                                <img src={User} alt='Profile Image' className='w-28 mb-3'/>
                                <h3 className='text-2xl font-semibold'>{data.first_name} {data.last_name}</h3>
                                <h3 className='text-xl italic font-medium'>{data.email}</h3>
                            </header>
                            <main className='flex flex-col gap-12'>
                                <h1 className='text-xl font-semibold text-center border-t-2 border-fifth pt-5 mt-8'>{data.username}`s Posts</h1>
                                <AccountPosts />
                            </main>
                        </div>
                    ))}

                </div>
                <img src={Meteor} className='fixed w-[inherit] h-[inherit] z-[-10] bottom-0 object-cover'/>
            </div>
        </Fragment>
    );
};

export default UserAccount;