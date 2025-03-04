"use client";
import Link from "next/link";
export default function GlobalError({ error, reset }) {
    return (
    
        <div>
            <h2>Hey! You broke the page, what gives!</h2>
            <h2>...Just kidding! Try resetting it.</h2>
            <button onClick={() => reset()}>Try again</button>

        </div>
    
    );
}