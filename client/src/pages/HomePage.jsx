import { Fragment } from 'react';
import { Notes, Approved } from '../assets';

const HomePage = () => {
    const register = () => {
        window.location = '/register';
    };

    const login = () =>{
        window.location = '/login';
    };

    return (
        <Fragment>
            <div className='bg-first font-roboto'>
                <header className='mb-20 border-b-2 bg-second'>
                    <nav className='flex justify-end py-7 px-10 
                    phone:justify-center phone:py-3
                    tablet:justify-end tablet:py-3'>
                        <div className='flex gap-8 phone:py-1'>
                            <button 
                                onClick={login}
                                className='text-2xl text-first bg-third hover:bg-fourth rounded-lg w-28 px-2
                                phone:text-lg phone:w-20
                                laptop:text-xl laptop:w-24' 
                            >Login</button>
                            <button 
                                onClick={register}
                                className='text-2xl text-first bg-third hover:bg-fourth rounded-lg w-28 py-2
                                phone:text-lg phone:w-20
                                laptop:text-xl laptop:w-24' 
                            >Register</button>
                        </div>
                    </nav>
                </header>
                <main className='relative px-5'>
                    <section className='mb-20 tablet:justify-center'>
                        <div className='flex items-center mb-5 
                        phone:justify-center 
                        tablet:justify-start'>
                            <img 
                                src={Notes}
                                alt='Notes Logo'
                                className='phone:w-24 tablet:w-32 laptop:w-28'/>
                            <h1 className='text-7xl font-semibold mb-2
                            phone:text-4xl
                            tablet:text-5xl
                            laptop:text-6xl'>StatusKu</h1>
                        </div>
                        <h2 className='phone:text-lg phone:text-center tablet:text-start tablet:text-xl
                        laptop:text-2xl'
                        >Tempat sederhana untuk upload status teks...</h2>
                    </section>
                    <section className='flex flex-col gap-5 justify-center items-center
                    phone:items-center
                    tablet:items-start tablet:flex-row-reverse
                    laptop:justify-between'>
                        <img src={Approved} alt='Notes Logo' className='phone:mt-[-5vh] phone:w-60 tablet:mt-[-10vh]
                        tablet:w-96 laptop:mt-[-25vh] laptop:w-[35vw] laptop:mr-[4vw]' />
                        <p className='text-2xl w-1/2 
                        phone:text-lg phone:w-[90vw] phone:text-center
                        tablet:mt-2 tablet:w-[40vw] tablet:text-start tablet:text-2xl
                        laptop:text-2xl'>
                            StatusKu adalah website CRUD (Create, Read, Update, Delete) sederhana yang memungkinkan Anda untuk membuat dan mengelola postingan status teks. Bagikan pemikiran, momen, atau update singkat Anda.
                        </p>
                    </section>
                </main>
                <footer className='mt-[22vh] phone:mt-24'>
                    <div className="flex flex-col text-center text-xl py-8 bg-second 
                    phone:text-sm
                    tablet:text-lg
                    laptop:text-xl">
                        <h2>Ikon dari 
                            <a href="https://www.flaticon.com/" title="Flaticon" className='font-semibold'> www.flaticon.com</a>
                        </h2>
                        <h2>Gambar dari
                            <a href="https://pixabay.com/" title="Pixabay" className='font-semibold'> www.flaticon.com</a>
                        </h2>
                        <h2>Dikembangkan oleh Ryan Nicholas Purba</h2>
                        <h2>Copyright &copy; 2024 StatusKu.com</h2>
                    </div>
                </footer>
            </div>
        </Fragment>
    );
};

export default HomePage;