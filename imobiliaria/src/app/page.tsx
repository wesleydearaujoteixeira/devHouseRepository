import Image from "next/image";
import Register from "./(register)/register-account/page";
import Slider from "./slider/Slider";
import CategoryList from "./Category/CategoryList";

import home from './home.module.css';

export default function Home() {
  return (
    <main>
      <Slider/>
      <h2 className={home.title} > Veja imóveis disponiveis </h2>
      <CategoryList/>
    </main>
  );
}
