"use client"

import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);
    return <>
        <h1>Counter</h1>
        <div className="border border-gray-200 rounded p-2 flex gap-4 items-center justify-between w-auto mr-auto">
            <button onClick={() => setCount(count - 1)}>-</button>
            <span className="w-8 text-center">{count}</span>
            <button onClick={() => setCount(count + 1)}>+</button>
        </div>
    </>
}