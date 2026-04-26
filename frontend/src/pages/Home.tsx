import { useState } from "react";
import Modal from "../components/Modal";

const Home = () => {
    const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);

    const [index, setIndex] = useState<number>(0);
    const handlePrev = () => {
        console.log('prev');
        setIndex((prev) => Math.max(0, prev - 1));
    }
    const handleNext = () => {
        console.log('next');
        setIndex((prev) => Math.min(3, prev + 1));
    }
    const move = -150 * index;
    return (
        <div className="flex flex-col w-full h-screen bg-emerald-900 ">
            <div className="flex flex-row">
                <h1 className="text-xl font-bold text-gray-200">Drello</h1>
                <button onClick={() => handlePrev()}>prev</button>
                <button onClick={() => handleNext()}>next</button>
            </div>

            <div className="relative w-full flex-1 bg-emerald-800 overflow-hidden ">
                <div style={{ transform: `translateX(${move}px)` }} className="absolute left-1/2 -translate-x-[75px] border flex flex-row items-center h-full">
                    {//List
                        Array.from({ length: 3 }).map((_) => (
                            <div className="w-[150px] h-[250px] px-2 border ">
                                <div className="flex flex-col w-full h-full  bg-blue-500 rounded-lg">
                                    <span>list 1</span>
                                    <div className="flex flex-col gap-2 w-full flex-1 border overflow-y-scroll ">
                                        {//Cards
                                            Array.from({ length: 5 }).map((_) => (
                                                <div onClick={() => setIsCardModalOpen(true)} className="shrink-0 w-full h-[30px] bg-white ">
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <input type="text" className="w-full bg-white" />

                                    <input type="text" className="border" />
                                    <button className="border">新增</button>
                                </div>
                            </div>
                        ))
                    }
                    <div className="flex flex-row w-[150px] h-20 bg-emerald-500">
                        <input type="text" placeholder=" 新增列表" className="w-full border" />
                        <button className="text-white bg-yellow-500">新增列表</button>
                    </div>
                </div>
            </div>

            {/*Modals*/}
            <Modal isOpen={isCardModalOpen} onClose={() => setIsCardModalOpen(false)}>
                <>
                    <div className="flex flex-row justify-end items-center gap-2 w-full h-20 pr-2 bg-emerald-600 rounded-t-lg">
                        <button>cover</button>
                        <button>...</button>
                        <button>X</button>
                    </div>
                    <div className="flex flex-col gap-5 w-full h-full px-4 pt-5 ">
                        <div className="flex flex-row items-center gap-2 w-full ">
                            <div className="w-5 aspect-square border border-zinc-300 rounded-full"></div>
                            <input type="text" placeholder="name" className="flex-1 min-w-0 text-3xl font-semibold text-white" />
                        </div>
                        <div className="flex flex-row flex-wrap items-center gap-2">
                            {
                                Array.from({ length: 5 }).map((_) => (
                                    <button className="flex flex-row items-center justify-center shrink-0 h-5 p-4 border border-zinc-600 rounded-lg text-gray-300">新增</button>
                                ))
                            }

                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-gray-300">標籤</span>
                            <div className="flex flex-row flex-wrap items-center gap-1">
                                {
                                    Array.from({ length: 4 }).map((_) => (
                                        <div className="shrink-0 w-15 h-8 bg-emerald-700 rounded-lg"></div>
                                    ))
                                }

                                <button className='flex flex-row justify-center items-center shrink-0 w-8 aspect-square bg-zinc-700 rounded-lg text-2xl text-gray-300'>+</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="" className="text-gray-300">描述</label>
                            <textarea value='card' className="text-gray-300">
                            </textarea>
                        </div>
                    </div>
                </>
            </Modal>
        </div>
    )
}

export default Home