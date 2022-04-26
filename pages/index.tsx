import { FormEvent, useCallback, useRef, useState } from 'react';
import { SearchResults } from '../components/SearchResults';

type Results = {
  totalPrice: number;
  data: any[];
};

export default function Home() {
  // const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({
    data: [],
    totalPrice: 0,
  } as Results);

  const search = useRef<string>('');

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.current.trim()) return;

    const response = await fetch(
      `http://localhost:3333/products?q=${search.current}`,
    );

    const data = await response.json();

    const totalPrice = data.reduce((total, product) => {
      return total + product.price;
    }, 0);

    setResults({ totalPrice, data });
  }

  const addToWishlist = useCallback((id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type='text'
          onChange={(e) => (search.current = e.target.value)}
        />
        <button type='submit'>Buscar</button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishlist={addToWishlist}
      />
    </div>
  );
}
