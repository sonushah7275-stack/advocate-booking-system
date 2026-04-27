import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopAdvocate from "../components/TopAdvocate";
import Banner from "../components/Banner";

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopAdvocate />
      <Banner />
    </div>
  );
};

export default Home;
