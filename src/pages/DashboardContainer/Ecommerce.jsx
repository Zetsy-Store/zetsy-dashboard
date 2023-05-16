import React from "react";
import "./styles/ecommerce.style.css";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProductTable from "../../components/Ecommerce/ProductTable";
import { getProductsByStoreId } from "../../api/store";
import { useShopContext } from "../../contexts/Shop";
import Fuse from "fuse.js";

export default function Ecommerce({ handleTabChange, theme }) {
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  // @section => store products
  const [{ activeShop }] = useShopContext();
  const [storeProducts, setStoreProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [, dispatchShopData] = useShopContext();
  const [shopLoader, setShopLoader] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      let _storeProducts = await getProductsByStoreId(activeShop?._id);
      _storeProducts.reverse();
      dispatchShopData({ type: "add-products", payload: _storeProducts });
      setStoreProducts(_storeProducts);
      setShopLoader(false);
    })();
  }, []);

  const filterProductsUsingObject = (_keyword) => {
    const options = {
      includeScore: true,
      // Search in `author` and in `tags` array
      keys: [
        "name",
        "description.productInfo",
        "description.productCode",
        "description.productSku",
        "description.category",
        "priceInformation.salesPrice",
      ],
    };

    const fuse = new Fuse(storeProducts, options);

    const _filteredProducts = fuse.search(_keyword);
    let _items = [];
    if (_filteredProducts.length > 0)
      _filteredProducts.forEach((_item) => {
        _items.push(_item.item);
      });

    setFilteredProducts(_items);
  };

  return (
    <div className={`ecommerce__container ${theme}`}>
      <div className="ecommerceContainer__header">
        <div>
          <h1>Ecommerce</h1>
          <p className="subtitle">Dashboard - Ecommerce - List</p>
        </div>
        <div className="actionBtns">
          <Button>
            <i className="ri-price-tag-3-line"></i> New Category
          </Button>
          <Button onClick={() => handleTabChange("new-product")}>
            <i className="ri-add-line"></i>
            <p>New Product</p>
          </Button>
        </div>
      </div>

      <div className="paper productList">
        <div className="filter">
          <Box sx={{ minWidth: 220 }}>
            <FormControl fullWidth>
              <InputLabel id="product-status">Status</InputLabel>
              <Select
                labelId="product-status"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="out-of-stock">Out of Stock</MenuItem>
                <MenuItem value="active">In Stock</MenuItem>
                <MenuItem value="low-stock">Low Stock</MenuItem>
                <MenuItem value="draft">Draft</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <div className="productSearchContainer">
            <i className="ri-search-line"></i>
            <input
              type="text"
              onChange={(e) => filterProductsUsingObject(e.target.value)}
              placeholder="Search Product..."
            />
          </div>
        </div>
        {!shopLoader ? (
          <ProductTable
            storeProducts={
              filteredProducts.length > 0 ? filteredProducts : storeProducts
            }
          />
        ) : (
          <>Loading...</>
        )}
      </div>
    </div>
  );
}
