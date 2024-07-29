import { Fragment, useState, useEffect } from 'react';
import { Shapes, Notes, User, Reply, ReplyDark } from '../assets';
import ReactTimeAgo from 'react-timeago';

const PostsPage = () => {
    const [posts, setAllPosts] = useState([]);
    
    const sortAscDate = () => {
        setAllPosts([...posts].sort((a,b) => {return new Date(a.datetime).getTime() - new Date(b.datetime).getTime()}));
    };

    const sortDescDate = () => {
        setAllPosts([...posts].sort((a,b) => {return new Date(a.datetime) - new Date(b.datetime)}).reverse());
    };

    const getAllPosts = async () => {
        try {
            const response = await fetch('http://localhost:4000/posts', {
                method: "GET",
            });

            const jsonData = await response.json();
            setAllPosts(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };
    
    useEffect(() => {
        getAllPosts();
    },[]);

    return(
        <Fragment>
            <div className="relative flex flex-col items-center overflow-hidden">
                <header 
                    className='flex w-full phone:w-[100vw] justify-between items-center bg-third shadow-lg py-3 
                    phone:px-2
                    tablet:px-4
                    laptop:px-8'
                >
                    <div className='logo flex items-center gap-2'>
                        <img src={Notes} alt='Notes Logo' className='phone:w-6 tablet:w-10 laptop:w-12'/>
                        <h1 className='text-first font-semibold phone:text-lg tablet:text-xl laptop:text-2xl'>StatusKu</h1>
                    </div>
                    <a href='/profilePage'>
                        <img src={User} alt='User Logo'className='phone:w-8 tablet:w-12 laptop:w-14'/>
                    </a>
                </header>
                <main 
                    className='flex flex-col items mt-5 px-14 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 border border-gray-300 phone:px-5 laptop:px-8'
                >
                    <section className="flex justify-center my-10 gap-4">
                        <button 
                            className="text-first bg-third hover:bg-fourth font-bold py-2 px-4 rounded phone:text-sm desktop:text-lg" onClick={sortAscDate}
                        >Sort posts by old</button>
                        <button 
                            className="text-first bg-third hover:bg-fourth text-xl font-bold py-2 px-4 rounded ml-2 phone:text-sm desktop:text-lg" onClick={sortDescDate}
                        >Sort posts by new</button>
                    </section>
                    
                    {posts.map(post => (
                        <div key={post.post_id} className="flex flex-col justify-between mb-8 gap-3 border-b border-gray-200 py-4">
                            <div className="flex flex-col gap-5 text-xl mr-10 phone:mr-0 border-2 rounded-xl p-5">
                                <header className='flex justify-between'>
                                    <a 
                                        className='flex items-center gap-3
                                        phone:text-sm
                                        laptop:text-lg'
                                        href={`/profilePage/${post.username}`}
                                    >
                                        <img src={User} alt='User Logo'className='phone:w-6 tablet:w-10 laptop:w-12'/>
                                        <h3>{post.username}</h3>
                                    </a>
                                    <ReactTimeAgo date={post.datetime} className="text-gray-800 phone:text-sm desktop:text-lg" />
                                </header>
                                <main>
                                    <div 
                                        className='bg-fourth w-[65vw] rounded-lg p-5
                                        phone:p-2 phone:w-[80vw]
                                        tablet:w-[75vw]
                                        laptop:p-4 laptop:w-[60vw]
                                        desktop:w-[60vw]'
                                    >
                                        <p 
                                            className="whitespace-pre-wrap text-first font-semibold phone:text-sm laptop:text-lg"
                                        >{post.description}</p>
                                    </div>
                                </main>
                                <footer>
                                    <div className='flex gap-5 ml-3'>
                                        <a href={`/posts/${post.post_id}`}>
                                            <div className="relative w-8">
                                                <img src={Reply} className="hover:scale-110" alt="Reply Logo" />
                                                <img 
                                                    src={ReplyDark}
                                                    className="absolute top-0 left-0 opacity-0 transform hover:opacity-100 focus:opacity-100"
                                                    alt="Reply Logo Hovered" />
                                            </div>
                                        </a>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    ))}
                </main>
                <img src={Shapes} className='fixed w-[100vw] h-[100vh] z-[-10] object-cover' alt='Shiny Background'/>
            </div>
        </Fragment>
    );
};

export default PostsPage;