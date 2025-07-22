import { games } from "../data/games";

export function useSortedGames() {
  const mostRecent = [...games].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const mostPopular = [...games].sort((a, b) => (b.visits ?? 0) - (a.visits ?? 0));

  const recommended = [...games].sort(() => Math.random() - 0.5);

  return {
    mostRecent,
    mostPopular,
    recommended,
  };
}
