"use client"
import React from 'react'
import Header from '@/app/components/layout/Header'
import Banner from './components/layout/Banner'
import CollectionSlider from './components/layout/Collection-slider'
import ContentImg from './components/layout/Content-img'
import ExploreCate from './components/layout/Explore-cate'
import ProductsSlider from './components/layout/Products-slider'
import Discover from './components/layout/Discover-more'
import Footer from './components/layout/Footer'

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
