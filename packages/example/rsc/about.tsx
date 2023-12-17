import Counter from "../components/Counter";

export default async function About() {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(1000);
    const data = await fetch("https://jsonplaceholder.typicode.com/todos").then(res => res.json()) as any[];
    return <>
        <h1 className="text-xl font-bold">About Page</h1>
        <Counter />
        {data.map((todo: any) => {
            return <p>{todo.title}</p>
        })}
    </>
} 