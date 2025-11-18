"use client"
import React from 'react'
import Header from '@/app/Components/layout/Header'
import Banner from './Components/layout/Banner'
import CollectionSlider from './Components/layout/Collection-slider'
import ContentImg from './Components/layout/Content-img'
import ExploreCate from './Components/layout/Explore-cate'
import ProductsSlider from './Components/layout/Products-slider'
import Discover from './Components/layout/Discover'
import Footer from './Components/layout/Footer'

export default function page() {
  return (
    <>
      <Header />
      <Banner />
      <CollectionSlider/>      
      <ContentImg/>
      <ExploreCate/>
      <ProductsSlider/>
      <Discover/>
     <Footer/>
    </>
  )
}
