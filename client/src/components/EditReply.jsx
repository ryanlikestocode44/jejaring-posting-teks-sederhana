import {Fragment, useState} from 'react';
import PropTypes from 'prop-types'

const EditReply = ({ reply }) => {
    EditReply.propTypes = {
        reply: PropTypes.object.isRequired
    }

    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:4000/posts/reply/${reply.reply_id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json", "Auth-token": token},
                body: JSON.stringify(body),
            });
            
            console.log(response.json());
            window.location = '/myReplies';
        } catch (err) {
            console.log(err.message);
        }
    }

    const [description, setDescription] = useState(reply.description);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEditClick = () => {
        setShowEditModal(!showEditModal);
    };
    
    const handleModalClose = () => {
        setDescription(reply.description)
        setShowEditModal(false);
    };

    return (
        <Fragment>
            <div>
                <button
                    type="button"
                    data-toggle="modal"
                    data-target={`#id${reply.reply_id}`}
                    className='text-xl text-first bg-third hover:bg-fourth rounded-lg w-28 py-1 mb-4
                    phone:text-sm phone:w-16
                    tablet:w-[9vw]
                    laptop:text-lg laptop:w-[5vw]'
                    onClick={handleEditClick}
                >Edit</button>

                <div 
                    className={`modal border-2 p-6 ${showEditModal? '' : 'hidden'}`}
                    id={`id${reply.reply_id}`}
                    onClick={() => (setDescription(reply.description))}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <header className="flex justify-between items-center">
                                <h3 className='text-xl font-medium phone:text-lg'>Edit Reply</h3>
                            </header>

                            <main>
                                <textarea
                                    id='status-post'
                                    type="text"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    className='block text-xl pb-1 px-2 border-2 rounded-lg mb-5 w-[50vw] min-h-5 resize-y
                                    phone:text-sm phone:w-[75vw] phone:p-1
                                    tablet:w-[60vw]
                                    laptop:text-lg laptop:w-[50vw] laptop:p-2'
                                    maxLength={250}
                                />
                            </main>

                            <footer className="flex gap-3">
                                <button 
                                    data-dismiss="modal"
                                    onClick={e => updateDescription(e)}
                                    className='text-xl text-first bg-third hover:bg-fourth rounded-lg w-28 py-1
                                    phone:text-lg phone:w-16'
                                >Edit</button>
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

export default EditReply;