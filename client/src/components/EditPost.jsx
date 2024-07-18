import { Fragment, useState } from 'react';
import PropTypes from 'prop-types'

const EditPost = ({ post }) => {
    EditPost.propTypes = {
        post: PropTypes.object.isRequired
    }

    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = {description};
            const token = localStorage.getItem('token');
            const response = await fetch(`https://statusku-api.vercel.app/posts/${post.post_id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json", "Auth-token": token},
                body: JSON.stringify(body),
            });
            console.log(response.json());
            window.location = '/myPosts';
        } catch (err) {
            console.log(err.message);
        }
    }

    const [description, setDescription] = useState(post.description);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditClick = () => {
        setShowEditModal(!showEditModal);
    };
    
    const handleModalClose = () => {
        setDescription(post.description)
        setShowEditModal(false);
    };

    return (
        <Fragment>
            <div className='font-roboto'>
                <button
                    type="button"
                    data-toggle="modal"
                    data-target={`#id${post.post_id}`}
                    className='text-xl text-first bg-third hover:bg-fourth rounded-lg w-28 py-1 mb-4
                    phone:text-sm phone:w-16
                    tablet:w-[9vw]
                    laptop:text-lg laptop:w-[5vw]'
                    onClick={handleEditClick}
                >Edit</button>
                    
                <div 
                    className={`modal border-2 rounded-md p-6 ${showEditModal? '' : 'hidden'}
                        phone:p-3`}
                    id={`id${post.post_id}`}
                    onClick={() => (setDescription(post.description))}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <header className="flex items-center">
                                <h3 className='text-xl font-medium phone:text-lg'>Edit Post</h3>
                            </header>

                            <main>
                                <textarea
                                    id='status-post'
                                    type="text"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    className='block text-xl p-2 border-2 rounded-lg mb-5 min-h-5 resize-y
                                    phone:text-sm phone:w-[75vw] phone:p-1
                                    tablet:w-[60vw]
                                    laptop:text-lg laptop:w-[50vw] laptop:p-2'
                                />
                            </main>

                            <footer className="flex gap-3">
                                <button 
                                    data-dismiss="modal"
                                    onClick={e => updateDescription(e)}
                                    className='text-xl text-first bg-third hover:bg-fourth rounded-lg w-28 py-1
                                    phone:text-lg phone:w-16'
                                >Save</button>
                                <button 
                                    data-dismiss="modal"
                                    onClick={handleModalClose}
                                    className='text-xl text-first bg-third hover:bg-fourth rounded-lg w-28 py-1
                                    phone:text-lg phone:w-16'
                                >Close</button>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditPost;