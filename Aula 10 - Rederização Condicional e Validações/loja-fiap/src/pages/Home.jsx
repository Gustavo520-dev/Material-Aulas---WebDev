import { useState, useEffect } from "react";
import SectionContainer from "../components/SectionContainer";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [electronics, setElectronics] = useState([]);
  const [jewelery, setJewelery] = useState([]);
  const [mensClothing, setMensClothing] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [lowestPriceProducts, setLowestPriceProducts] = useState([]);
  const [isLoading, setIsLoading] = useState([false]);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setIsLoading(true)
    fetch(`${API_URL}/category/electronics`)
      .then((res) => res.json())
      .then((data) => setElectronics(data));

    fetch(`${API_URL}/category/jewelery`)
      .then((res) => res.json())
      .then((data) => setJewelery(data));

    fetch(`${API_URL}/category/men's clothing`)
      .then((res) => res.json())
      .then((data) => setMensClothing(data));

    fetch(`${API_URL}`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data));

    fetch(`${API_URL}`)
      .then((res) => res.json())
      .then((data) => setLowestPriceProducts(data))
      .finally(() => setIsLoading(false));
  }, []);

  const filtrados = allProducts.filter(pegaItem => pegaItem.title.includes('jacket') || pegaItem.title.includes('coat')) || pegaItem.description.includes('jacket') || pegaItem.description.includes('coat')

  if(isLoading)
    return <p>Loading....</p>
  return (
    <div>
      <SectionContainer title="Eletrônicos">
        {electronics.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </SectionContainer>

      <SectionContainer title="Joias">
        {jewelery.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </SectionContainer>

      <SectionContainer title="Roupas Masculinas">
        {mensClothing.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </SectionContainer>

      <SectionContainer title="Favoritos">
        {allProducts
        .filter(pegaItem => pegaItem.rating.rate >=4)
        .sort((a,b) => b.rating.rate - a.rating.rate || b.price - a.price)
        .map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </SectionContainer>

      <SectionContainer title="Baratinhos da galera juro">
        {lowestPriceProducts
        .filter(pegaItem => pegaItem.price >= 0 && pegaItem.price <=100)
        .sort((a,b) => a.price - b.price)
        .map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </SectionContainer>

      <SectionContainer title="Jaquetas e Casacos">
        {filtrados.length > 0 ?

        filtrados
        .sort((a,b) => a.price - b.price)
        .map((product) => (
          <ProductCard key={product.id} {...product} />
        ))

        :
        <p>Nenhum Produto Encontrado.</p>
      
      }
      </SectionContainer>
    </div>
  );
}
