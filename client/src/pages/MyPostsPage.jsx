import { Fragment, useState, useEffect } from 'react';
import EditPost from '../components/EditPost';
import CreatePosts from '../components/CreatePosts';
import ReactTimeAgo from 'react-timeago';
import { Shiny, Add, AddDark } from '../assets';

const MyPostsPage = () => {
    const [posts, setPosts] = useState([]);
    const [showToggle, setShowToggle] = useState(false);

    const getPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('https://statusku-api.vercel.app/myPosts', {
                method: "GET",
                headers:{"Auth-token": token},
            });

            const jsonData = await response.json();
            setPosts(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getPosts();
    },[]);

    const deletePost = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const deletePost = await fetch(`http://localhost:4000/posts/${id}`, {
                method: "DELETE",
                headers: {"Auth-token": token},
            });

            if (deletePost.ok) {
                console.log("Post deleted successfully!");
            }
            setPosts(posts.filter(post => post.post_id !== id));
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleToggle = () => {
        setShowToggle(!showToggle);
    };

    const userProfile = () => {
        window.location = '/profilePage';
    };
    
    return (
        <Fragment>
            <div className='relative font-roboto h-[100vh] flex flex-col items-center'>
                <div className='bg-first flex flex-col w-[60vw] rounded-xl justify-center items-center py-14 
                phone:py-2 phone:w-[90vw]
                tablet:w-[70vw]
                laptop:w-[65vw]'>
                    <div className='mt-6 flex flex-col items-center'>
                        <header className='flex flex-col items-center mb-5'>
                            <h1 
                                className='text-4xl font-bold mb-3 phone:text-2xl'
                            >Your Posts</h1>
                            <button 
                                onClick={userProfile} 
                                className='text-2xl mb-5 text-first bg-fifth hover:bg-third rounded-lg w-52 py-1 
                                phone:text-sm phone:w-[30vw]
                                tablet:w-[20vw]
                                laptop:text-lg laptop:w-[12vw]'
                            >Back to Profile</button>

                            <button 
                                onClick={handleToggle} 
                                className='relative w-10'
                            >
                                <img src={Add} className="hover:scale-110" alt="Add Logo"/>
                                <img 
                                    src={AddDark}
                                    className="absolute top-0 left-0 opacity-0 transform hover:opacity-100 focus:opacity-100"
                                    alt="Add Logo Hovered"
                                />
                            </button>
                        </header>
                        {showToggle? <CreatePosts /> : null}
                        <main className='flex flex-col gap-12'>
                            {posts.map(post => (
                                <div key={post.post_id}>
                                    <ReactTimeAgo date={post.datetime} className="text-gray-800 phone:text-sm desktop:text-lg" />
                                    <div 
                                        className='whitespace-pre-wrap text-xl pb-1 p-2 border-2 border-third rounded-md text-ellipsis w-[50vw] min-h-5
                                        phone:text-sm phone:w-[82vw]
                                        tablet:w-[62vw]
                                        laptop:text-lg laptop:w-[55vw]'
                                    >{post.description}</div>
                                    <div className='flex flex-col mt-5'>
                                        <EditPost post={post}/>
                                        <button
                                            onClick={() => deletePost(post.post_id)}
                                            className='text-xl mt-3 text-first bg-third hover:bg-fourth rounded-lg w-28 py-1
                                            phone:text-sm phone:w-16
                                            tablet:w-[9vw]
                                            laptop:text-lg laptop:w-[5vw]'
                                        >Delete</button>
                                    </div>
                                </div>
                            ))}
                        </main>
                    </div>
                </div>
                <img src={Shiny} className='fixed w-[100vw] h-[100vh] z-[-10]' alt='Shiny Background'/>
            </div>
        </Fragment>
    );
};

export default MyPostsPage;