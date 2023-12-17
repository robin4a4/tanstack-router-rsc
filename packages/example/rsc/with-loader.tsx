import Counter from "../components/Counter";

export default async function About() {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(1000);
    const data = await fetch("https://jsonplaceholder.typicode.com/todos").then(res => res.json()) as any[];
    return <div className="flex flex-col gap-4 p-4">
        <h1 className="text-xl font-bold">Using loader</h1>
        <p>The rsc is preloaded by tanstack router. The data in this component is not preloaded.</p>
        <Counter />
        {data.map((todo: any) => {
            return <p>{todo.title}</p>
        })}
    </div>
} 