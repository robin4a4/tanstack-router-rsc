import Counter from "../components/Counter";

export default async function Home() {
    return <div className="flex flex-col gap-4 border border-green-500 rounded p-4">
        <h1 className="text-lg font-bold">This is rendered on the server</h1>
        <Counter />
    </div>
} 