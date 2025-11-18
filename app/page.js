"use client"
import React from 'react'
import Header from '@/app/Components/layout/Header'
import Banner from './Components/layout/Banner'
import CollectionSlider from './Components/layout/Collection-slider'
import ContentImg from './Components/layout/Content-img'

export default function page() {
  return (
    <>
      <Header />
      <Banner />
      <CollectionSlider/>      
      <ContentImg/>
    </>
  )
}
