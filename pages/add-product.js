import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { fetchData } from "../API/productApi";
import AddProduct from "../components/AddProduct";
import { useSelector } from "react-redux";

const AddProductPage = ({ brands, categories }) => {
  const auth = useSelector((state) => state.auth);
  const { token, isLoggedIn } = auth;

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  return <AddProduct token={token} brands={brands} categories={categories} />;
};

export const getServerSideProps = async () => {
  const brands = await fetchData("GET", "brands");
  const categories = await fetchData("GET", "categories");

  return {
    props: {
      brands,
      categories,
    },
  };
};

export default AddProductPage;
