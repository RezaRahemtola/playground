function getSortedEvenNumbers(array: number[]): string {
  return array
    .sort((a, b) => a - b)
    .filter((nb) => nb % 2 === 0)
    .join(' - ');
}

export default getSortedEvenNumbers;
