import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../functions/product.functions";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { fetchProductsByfilter } from "../functions/product.functions";
import { Menu, Slider, Checkbox } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { getAllCategories } from "../functions/category.functions";

const { Item, SubMenu, ItemGroup } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState([]);

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const dispatch = useDispatch();

  useEffect(() => {
    loadAllProducts();
    //fetch all categories
    getAllCategories().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text });
    }, 350);
    return () => clearTimeout(delayed);
    // console.log("Text use Effect is triggered", text);
  }, [text]);

  //products based upon price range
  useEffect(() => {
    fetchProducts({ price });
  }, [ok]);

  //load products by default on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setLoading(true);
      setProducts(p.data);
      setLoading(false);
    });
  };

  //search input based products
  const fetchProducts = (arg) => {
    fetchProductsByfilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setCategoryId([]);
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  //load products based upon categories
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          value={c._id}
          checked={categoryId.includes(c._id)}
          name="category"
          className="pb-2 pl-4 pr-4"
          onChange={handleCheck}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));
  const handleCheck = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    // console.log(e.target.value);
    const inTheState = [...categoryId];
    const justChecked = e.target.value;
    const foundInTheState = inTheState.indexOf(justChecked);

    // All of this is done to ensure that they are no duplicates in the array of categories ID which is needed to send it backend
    //indexOf method return index if this find in the array otherwise return -1

    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      //if found pull out that index item
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryId(inTheState);
    fetchProducts({ category: inTheState });
    // console.log(inTheState);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-3">
          <h4>Filter</h4>
          <hr />
          <Menu mode="inline" defaultOpenKeys={["priceSlider", "category"]}>
            <SubMenu key="priceSlider" title={<h6>Bid Price Filter</h6>}>
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `Rs ${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="100000"
                />
              </div>
            </SubMenu>
            <SubMenu key="category" title={<h6>Catgories</h6>}>
              <div
                style={{
                  marginTop: "-10px",
                  // height: "200px",
                  // overFlow: "auto",
                  // position:'relative'
                }}
              >
                {showCategories()}
              </div>
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 pt-3">
          {loading ? (
            <h4 className=" text-danger">
              {" "}
              <LoadingOutlined />{" "}
            </h4>
          ) : (
            <h4 className=" text-dark"> Products </h4>
          )}

          {products.length < 1 && <p>No Product found</p>}
          <div className="row  m-4  pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
