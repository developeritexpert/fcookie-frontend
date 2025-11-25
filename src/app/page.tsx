"use client";

import Header from "../components/layout/Header";
import Banner from "../components/layout/Banner";
import CollectionSlider from "../components/layout/CollectionSlider";
import ContentImg from "../components/layout/ContentImg";
import ExploreCate from "../components/layout/ExploreCate";
import ProductsSlider from "../components/layout/ProductsSlider";
import DiscoverMore from "../components/layout/DiscoverMore";
import Footer from "../components/layout/Footer";

import { JSX } from "react";
export default function Page(): JSX.Element {
  return (
    <>
      {/* <Header /> */}
      <Banner />
      <CollectionSlider />
      <ContentImg />
      <ExploreCate />
      <ProductsSlider />
      <DiscoverMore />
      {/* <Footer /> */}
    </>
  );
}
