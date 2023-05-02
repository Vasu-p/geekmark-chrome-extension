import { diceCoefficient, isPartOf } from './string-compare.js';

export function get_closest_match(search_str, collection, iteratee) {
  const filtered = collection.filter((it) =>
    isPartOf(search_str, iteratee(it))
  );

  const sorted = diceCoefficient
    .sortMatch(
      search_str,
      filtered.map((it) => iteratee(it))
    )
    .map((sorted) => collection.find((it) => iteratee(it) === sorted.member));
  return sorted[sorted.length - 1];
}
