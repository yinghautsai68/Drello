import { useState } from "react";

const Home = () => {
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
                                                <div className="shrink-0 w-full h-[30px] bg-white ">
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <input type="text" className="w-full bg-white" />
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
        </div>
    )
}

export default Home