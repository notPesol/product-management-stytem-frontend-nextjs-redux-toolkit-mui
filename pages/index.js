import { useSelector, useDispatch } from "react-redux";
import { init } from "../app/authSlice";

import Home from "../components/Home";

import { fetchProducts } from "../API/productApi";
import { useEffect, useState } from "react";

export default function HomePage() {
  const auth = useSelector((state) => state.auth);
  const { token } = auth;
  const [products, setproducts] = useState([]);
  const [updated, setUpdated] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const localToken = localStorage.getItem("token") || "";
    if (localToken) {
      window.onbeforeunload = () => {
        localStorage.setItem("token", token);
      };
      dispatch(init(localToken));
    }

    if (token || (token && updated)) {
      setUpdated(false);
      fetchProducts("GET", "", { "x-access-token": token })
        .then((p) => setproducts(p))
        .catch((err) => console.log(err));
    }

    return () => {
      window.onbeforeunload = null;
    };
  }, [token, dispatch, updated]);

  return <Home products={products} update={() => setUpdated(true)} />;
}
