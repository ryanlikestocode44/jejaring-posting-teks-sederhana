import { Fragment, useState } from 'react';
import PropTypes from 'prop-types'

const ReplyTo = ({ id }) =>{
    ReplyTo.propTypes = {
        id: PropTypes.string.isRequired
    }

    const [description, setDescription] = useState("");
    const [charCount, setCharCount] = useState(0);
    const [newReplyError, setNewReplyError] = useState(null); // Error Value

    const handleDescriptionChange = (e) => {
        const newReply = e.target.value;
        if (newReply.length > 0) {
            setNewReplyError(null);
        } else {
            setNewReplyError("Reply cannot be empty");
        }
        setDescription(newReply);
        setCharCount(newReply.length);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const body = {description};
            const response = await fetch(`http://localhost:4000/posts/reply/${id}`, {
                method: "POST",
                headers: {"Content-type": "application/json", "Auth-token": token},
                body: JSON.stringify(body),
            });

            console.log(response.json());
            setDescription("");
            window.location = `/posts/${id}`;
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <Fragment>
            <div 
                className='flex flex-col font-roboto justify-center items-center w-[95vw] rounded-lg py-2
                phone:w-[95vw]
                tablet:w-[75vw]
                laptop:w-[60vw]
                desktop:w-[50vw]'
            >
                <form onSubmit={onSubmitForm} className='flex flex-col gap-2'>
                    <label 
                        htmlFor='reply'
                        className='text-2xl phone:text-xl'
                    >Ketik Reply</label>
                    <textarea
                        id='reply'
                        type="text"
                        maxLength={5000}
                        value={description} 
                        onChange={handleDescriptionChange}
                        className='block text-lg pb-1 px-2 border-2 border-third rounded-lg min-h-2 resize-y
                        phone:w-[95vw]
                        tablet:w-[75vw]
                        laptop:w-[60vw]
                        desktop:w-[50vw]'
                    />
                    <span className='text-md text-gray-500 ml-1'>{charCount} / 5000</span>
                    {newReplyError && <div className='text-red-500 text-lg'>{newReplyError}</div>}
                    <button
                        className='text-2xl mt-2 text-first bg-third hover:bg-fourth rounded-lg w-28 py-1
                        phone:text-lg phone:w-20'
                    >Reply</button>
                </form>
            </div>
        </Fragment>
    );
};

export default ReplyTo;