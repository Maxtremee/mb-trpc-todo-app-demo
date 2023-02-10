import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import AddTodo from "../components/AddTodo";
import AuthSection from "../components/AuthSection";
import TodoCounter from "../components/TodoCounter";
import TodosGrid from "../components/TodosGrid";

const Home: NextPage = () => {
  const { status } = useSession();
  return (
    <>
      <Head>
        <title>MB tRPC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container flex flex-col justify-center gap-12 px-4 py-16 ">
          <div className="flex items-center gap-2 sm:flex-col md:flex-row">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              <span className="text-mb">Masterborn</span> tRPC Todo App Demo 🔥
            </h1>
            <AuthSection />
          </div>
          <TodoCounter />
          {status === "authenticated" && (
            <>
              <AddTodo />
              <TodosGrid />
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
