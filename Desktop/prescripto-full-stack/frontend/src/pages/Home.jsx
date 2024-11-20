import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Announcements from '../components/Announcements'

const Home = () => {
  return (
    <div>
      <Header />
      {/* <Announcements /> */}
      {/* <SpecialityMenu /> */}
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home