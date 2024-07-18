import { Fragment, useState } from 'react';

const CreatePosts = () => {
    const [description, setDescription] = useState("");
    const [charCount, setCharCount] = useState(0);
    const [newPostError, setNewPostError] = useState(null);

    const handleDescriptionChange = (e) => {
        const newPost = e.target.value;
        if (newPost.length > 0) {
            setNewPostError(null)
        } else {
            setNewPostError("Please enter a description")
        }
        setDescription(newPost);
        setCharCount(newPost.length);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const body = {description};
            const response = await fetch("https://statusku-api.vercel.app/posts", {
                method: "POST",
                headers: { 
                    "Content-type": "application/json", 
                    "Auth-token": token
                },
                body: JSON.stringify(body),
            });
            console.log(response.json());

            setDescription("");
            window.location = '/myPosts';
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <Fragment>
            <div className='flex flex-col items-center my-1 mb-8'>
                <h1 className='text-2xl font-bold mb-6
                phone:text-lg'>Create A Post</h1>
                <form onSubmit={onSubmitForm}>
                    <div>
                        <label className='text-lg mb-3' htmlFor='status-post'>Buat Status Baru</label>
                        {/* <input 
                            type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className='text-2xl pb-1 px-2 block border-2 rounded-lg mb-5 w-[22vw] h-8 text-wrap'
                        /> */}
                        <textarea
                            id='status-post'
                            type="text"
                            maxLength={5000}
                            value={description}
                            onChange={handleDescriptionChange}
                            className='block text-xl pb-1 px-2 border-2 rounded-lg mb-1 w-[50vw] min-h-5 resize-y
                            phone:w-[75vw]
                            tablet:w-[60vw]
                            laptop:w-[55vw]
                            desktop:w-[50vw]'
                        />
                        <span className='text-sm text-gray-600 ml-1'>{charCount} / 5000</span>
                        {newPostError && <div className='text-red-500 text-lg'>{newPostError}</div>}
                    </div>
                    <button className='text-xl text-first bg-fifth hover:bg-fourth rounded-lg w-28 py-1 mt-4
                    phone:text-lg phone:w-16'>Post</button>
                </form>
            </div>
        </Fragment>
    );
};

export default CreatePosts;