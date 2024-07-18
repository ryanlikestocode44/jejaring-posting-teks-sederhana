import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Sprinkle, Previous, Add, AddDark } from '../assets';
import ReplyTo from '../components/ReplyTo';
import ReactTimeAgo from 'react-timeago';

const SingularPostPage = () => {
    const { postID } = useParams();
    const [replies, setAllReplies] = useState([]);
    const [showToggle, setShowToggle] = useState(false);

    const sortAscDate = () => {
        setAllReplies([...replies].sort((a,b) => {return new Date(a.datetime).getTime() - new Date(b.datetime).getTime()}));
    };
    const sortDescDate = () => {
        setAllReplies([...replies].sort((a,b) => {return new Date(a.datetime) - new Date(b.datetime)}).reverse());
    };

    const getAllReplies = async () => {
        try {
            const response = await fetch(`https://statusku-api.vercel.app/${postID}`, {
                method: "GET",
            });
            
            const jsonData = await response.json();
            setAllReplies(jsonData);
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleToggle = () => {
        setShowToggle(!showToggle);
    };
    
    useEffect(() => {
        getAllReplies();
    }, []);

    return(
        <Fragment>
            <div className='relative flex flex-col items-center font-roboto'>
                <div className='bg-second flex flex-col justify-center items-center p-6 gap-6'>
                    <a href='/posts' className='self-start'>
                        <img 
                            src={Previous}
                            alt='Previous Logo'
                            className='phone:ml-1 phone:w-10 tablet:w-12'
                        />
                    </a>
                    <div className="flex justify-center items-center mb-2">
                        <button 
                            className="bg-fifth hover:bg-fourth text-first font-bold py-2 px-4 rounded"
                            onClick={sortAscDate}
                        >Sort replies by old</button>
                        <button 
                            className="bg-fifth hover:bg-fourth text-first font-bold py-2 px-4 rounded ml-2" 
                            onClick={sortDescDate}
                        >Sort replies by new</button>
                    </div>
                    <button 
                        onClick={handleToggle} 
                        className='relative w-12'
                        >
                        <img src={Add} className="hover:scale-110" alt="Add Logo"/>
                        <img 
                            src={AddDark}
                            className="absolute top-0 left-0 opacity-0 transform hover:opacity-100 focus:opacity-100"
                            alt="Add Logo Hovered"
                            />
                    </button>
                    {showToggle? <ReplyTo id={postID}/> : null}
                    <div className="flex flex-col">
                        {replies.map(reply => (
                            <div 
                                key={reply.reply_id}
                                className="flex flex-col gap-2 mb-4 px-5 py-3 border-b-2 border-b-third"
                            >
                                <div 
                                    className="text-xl whitespace-pre-wrap 
                                    phone:w-[90vw]
                                    tablet:w-[75vw]
                                    laptop:w-[60vw]
                                    desktop:w-[50vw]"
                                >{reply.description}</div>
                                <ReactTimeAgo date={reply.datetime} className="text-lg text-gray-800"/>
                                {/* <div className="text-lg text-gray-600">{reply.datetime}</div> */}
                            </div>
                        ))}
                    </div>
                </div>
                <img src={Sprinkle} className='fixed w-[100vw] h-[100vh] z-[-10] object-cover'/>
            </div>
        </Fragment>
    );
};

export default SingularPostPage;