import { useEffect, useState } from "react";

export default function Home() {

  const [reactRepos, setReactRepos] = useState([]);
  const API = import.meta.env.VITE_GITHUB_API;
  
  useEffect(() => {
    fetch(`${API}node&per_page=5`)
    .then(res => res.json())
    .then(data => setReactRepos(data.items)) 
  }, [])
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">GitHub Repositories Explorer</h1>
    </div>
  );
}
