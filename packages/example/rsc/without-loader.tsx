import Counter from "../components/Counter";

export default async function Contact() {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(1000);
    const data = await fetch("https://jsonplaceholder.typicode.com/todos").then(res => res.json()) as any[];
    return <div className="flex flex-col gap-4 p-4">
        <h1 className="text-xl font-bold">Without using loader</h1>
        <p>The rsc is fetched when accessing the route by tanstack router.</p>
        <Counter />
        {data.map((todo: any) => {
            return <p key={todo.id}>{todo.title}</p>
        })}
    </div>
} 