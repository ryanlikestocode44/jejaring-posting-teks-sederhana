import {Fragment, useState, useEffect} from 'react';
import EditReply from '../components/EditReply';
import { Shiny } from '../assets';
import ReactTimeAgo from 'react-timeago';

const MyRepliesPage = () => {
    const [replies, setReplies] = useState([]);

    const getReplies = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/myReplies', {
                method: "GET",
                headers:{"Auth-token": token},
            });

            const jsonData = await response.json();

            setReplies(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        getReplies();
    },[]);

    const deleteReply = async (id) => {
        try {
            const token = localStorage.getItem("token");
            const deleteReply = await fetch(`http://localhost:4000/posts/reply/${id}`, {
                method: "DELETE",
                headers: {"Auth-token": token},
            });
            
            if (deleteReply.ok) {
                console.log("Reply berhasil dihapus!");
            }
            setReplies(replies.filter(reply => reply.reply_id !== id));

        } catch (err) {
            console.log(err.message);
        }
    };

    const userProfile = () => {
        window.location = '/profilePage';
    };
    
    return (
        <Fragment>
            <div className='font-roboto h-[100vh] flex flex-col items-center'>
                <div className='bg-first flex flex-col w-[60vw] rounded-xl justify-center items-center
                phone:py-2 phone:w-[90vw]
                tablet:w-[70vw]
                laptop:w-[65vw]'>
                    <div className='mt-6 flex flex-col items-center pb-8'>
                        <header className='flex flex-col items-start w-full mb-5'>
                            <h1 className='font-bold mb-3 phone:text-2xl'>Your Replies</h1>
                            <button 
                                onClick={userProfile}
                                className='text-2xl mb-5 text-first bg-fifth hover:bg-third rounded-lg w-52 py-1
                                phone:text-sm phone:w-[30vw]
                                tablet:w-[20vw]
                                laptop:text-lg laptop:w-[12vw]'
                            >Back to Profile</button>
                        </header>
                        <main className='flex flex-col gap-12'>
                            {replies.map(reply => (
                                <div key={reply.reply_id}>
                                    <ReactTimeAgo date={reply.datetime} className="text-gray-800 phone:text-sm desktop:text-lg" />
                                    <div 
                                        className='whitespace-pre-wrap text-xl pb-1 p-2 border-2 rounded-md text-ellipsis w-[50vw] min-h-5
                                        phone:text-sm phone:w-[82vw]
                                        tablet:w-[62vw]
                                        laptop:text-lg laptop:w-[55vw]'
                                    ><a href={`/posts/${reply.post_id}`} className='hover:text-fifth'>{reply.description}</a></div>
                                    <div className='flex flex-col mt-5'>
                                        <EditReply reply={reply}/>
                                        <button
                                            onClick={() => deleteReply(reply.reply_id)}
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

export default MyRepliesPage;