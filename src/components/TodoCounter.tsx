import { api } from "../utils/api";

export default function TodoCounter() {
  const { data, isLoading, isError } = api.todo.getCount.useQuery();

  if (isLoading) {
    return <p>Loading stats...</p>;
  }

  if (isError) {
    return <p className="text-red-400">Oh no! Couldn't load stats</p>;
  }

  return (
    <p className="text-semibold text-xl">
      We have helped make {data} things happen!
    </p>
  );
}
