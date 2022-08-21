import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { fetchData } from "../../API/productApi";

const AddProduct = ({ brands, categories, token }) => {
  const [formData, setFormData] = useState({
    code_name: "",
    brand_id: 0,
    category_id: 0,
    price: 0.0,
    quantity: 0,
  });

  const router = useRouter();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    fetchData("POST", "products", formData, {
      "Content-Type": "application/json",
      "x-access-token": token,
    })
      .then((data) => {
        console.log(data);
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box>
      <Typography mb={2} align="center" variant="h5">
        Add a New Product
      </Typography>
      <Box component="form" onSubmit={onSubmitHandler}>
        <Box
          mb={1}
          sx={{
            display: "flex",
            flexDirection: { xs: "column" },
            gap: 1,
          }}
        >
          <TextField
            sx={{ flexGrow: 1 }}
            size="small"
            label="Product Name"
            name="code_name"
            type="text"
            value={formData.code_name}
            onChange={onChangeHandler}
          />
          <FormControl>
            <InputLabel size="small" id="brand">
              Product Brand
            </InputLabel>
            <Select
              size="small"
              labelId="brand"
              id="brand"
              name="brand_id"
              value={formData.brand_id || ""}
              label="Product Brand"
              onChange={onChangeHandler}
            >
              <MenuItem value="" selected={!formData.brand_id}>
                -- Select Brand --
              </MenuItem>

              {brands.map((b) => (
                <MenuItem key={b.id} value={b.id}>
                  {b.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Must select one.</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel size="small" id="category">
              Product Category
            </InputLabel>
            <Select
              size="small"
              labelId="category"
              id="category"
              name="category_id"
              value={formData.category_id || ""}
              label="Product Category"
              onChange={onChangeHandler}
            >
              <MenuItem value="" selected={!formData.category_id}>
                -- Select Category --
              </MenuItem>
              {categories.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Must select one.</FormHelperText>
          </FormControl>

          <TextField
            sx={{ flexGrow: 1 }}
            size="small"
            label="Product Price"
            type="number"
            name="price"
            value={formData.price}
            onChange={onChangeHandler}
            inputProps={{ min: 0, step: 0.25 }}
          />
          <TextField
            sx={{ flexGrow: 1 }}
            size="small"
            label="Product Quantity"
            type="number"
            name="quantity"
            value={"" + formData.quantity}
            onChange={onChangeHandler}
            inputProps={{ min: 0 }}
          />
        </Box>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddProduct;
