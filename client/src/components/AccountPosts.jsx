import { useState, useEffect } from 'react';
import { User, Reply, ReplyDark } from '../assets';
import ReactTimeAgo from 'react-timeago';
import { useParams } from 'react-router-dom';

const AccountPosts = () => {
    const { username } = useParams();
    const [ userPosts, setUserPosts ] = useState([]);

    const getUserPosts = async () => {
        try {
            const response = await fetch(`http://localhost:4000/profilePage/${username}/posts`, {
                method: "GET"
            });

            const jsonData = await response.json();
            setUserPosts(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getUserPosts();
    }, []);

    return (
        <>
            {userPosts.map(post => (
                <section key={post.post_id}>
                    <header className='flex justify-between items-center mb-2'>
                        <div className='flex items-center gap-2'>
                            <img src={User} alt='User Logo'className='phone:w-2 tablet:w-6 laptop:w-8'/>
                            <a>{post.username}</a>
                        </div>
                        <ReactTimeAgo 
                            date={post.datetime}
                            className="text-gray-800 phone:text-sm desktop:text-lg"
                        />
                    </header>
                    <main
                        className='whitespace-pre-wrap text-xl pb-1 p-2 border-2 border-third rounded-md text-ellipsis w-[50vw] min-h-5
                        phone:text-sm phone:w-[82vw]
                        tablet:w-[62vw]
                        laptop:text-lg laptop:w-[40vw]'
                    >{post.description}</main>
                    <footer>
                        <div className='flex gap-5 ml-2 mt-2'>
                            <a href={`/posts/${post.post_id}`}>
                                <div className="relative w-8">
                                    <img src={Reply} className="hover:scale-110" alt="Reply Logo" />
                                    <img
                                        src={ReplyDark}
                                        className="absolute top-0 left-0 opacity-0 transform hover:opacity-100 focus:opacity-100"
                                        alt="Reply Logo Hovered"
                                    />
                                </div>
                            </a>
                        </div>
                    </footer>
                </section>
            ))}
        </>
    )
}

export default AccountPosts;