import React from "react";
import Header from '../index/header.jsx';
import Navbar from '../index/nabvar.jsx';
import Carousel from '../index/carousel.jsx';
import IntroSection from '../index/introSection.jsx';
import AboutUsSection from '../index/aboutUsSection.jsx';
import Footer from '../index/footer.jsx';
import 'bootstrap';
import '../styles/styleIndex.css'


function Index() {
  return (
    <div>
      <Header />
      <Navbar />
      <Carousel />
      <IntroSection />
      <AboutUsSection />
      <Footer />
    </div>
  );
}

export default Index;