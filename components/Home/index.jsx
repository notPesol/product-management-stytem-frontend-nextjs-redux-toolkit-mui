import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import { fetchProducts, fetchData } from "../../API/productApi";

const Home = ({ products, update }) => {
  const auth = useSelector((state) => state.auth);
  const { isLoggedIn, token } = auth;

  const [formData, setFormData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [onEdit, setOnEdit] = useState(false);

  const [brands, setBrand] = useState([]);
  const [categories, setCategories] = useState([]);

  const router = useRouter();

  console.log(formData);

  useEffect(() => {
    if (onEdit) {
      // fetch brands and categories for select
      fetchData("GET", "brands", null, { "x-access-token": token }).then(
        (brands) => {
          setBrand(brands || []);
          if (brands.length > 0) {
            const selectedBrand = brands.find(
              (b) => b.name === formData["brand_name"]
            );
            if (selectedBrand) {
              setFormData((prevState) => ({
                ...prevState,
                brand_id: selectedBrand?.id,
              }));
            }
          }
        }
      );
      fetchData("GET", "categories", null, { "x-access-token": token }).then(
        (categories) => {
          setCategories(categories || []);

          if (categories.length > 0) {
            const selectedCategory = categories.find(
              (c) => c.name === formData["category_name"]
            );
            if (selectedCategory) {
              setFormData((prevState) => ({
                ...prevState,
                category_id: selectedCategory?.id,
              }));
            }
          }
        }
      );
    }
  }, [onEdit]);

  const onEditHandler = (product) => {
    setOnEdit(true);
    setSelectedProduct(product);
    setFormData(product);
  };

  const updateHandler = () => {
    // update logic here...
    setOnEdit(false);
    setSelectedProduct(null);
    setFormData(null);

    if (formData && formData.id) {
      fetchProducts("PUT", formData, { "Content-Type": "application/json" })
        .then((data) => {
          console.log(data);
          update();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const onFormDataChangeHandler = (e) => {
    const { name, value } = e.target;
    if (formData && formData.id) {
      setFormData((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    }
  };

  const onDeleteHandler = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const onDeleteConfirmHandler = () => {
    if (selectedProduct) {
      fetchProducts(
        "DELETE",
        { id: selectedProduct.id },
        { "Content-Type": "application/json" }
      )
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          closeDialog();
          toggleUpdate();
        });
    }
  };

  if (!isLoggedIn) {
    return (
      <Box textAlign="center">
        <Typography mb={2} variant="h3">
          Must Login First!
        </Typography>
        <Button variant="contained" onClick={() => router.replace("/login")}>
          Login
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" align="center" mb={2}>
        Product Management System App
      </Typography>
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Id</TableCell>
              <TableCell align="right">Product Name</TableCell>
              <TableCell align="right">Product Brand</TableCell>
              <TableCell align="right">Product Category</TableCell>
              <TableCell align="right">Product Price</TableCell>
              <TableCell align="right">Product Quantity</TableCell>
              <TableCell colSpan={2} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => {
              // if click edit icon on row
              if (onEdit && selectedProduct === p && formData) {
                return (
                  <TableRow key={p.id}>
                    <TableCell component="th">{p.id}</TableCell>
                    <TableCell align="right">
                      <TextField
                        name="code_name"
                        value={formData["code_name"]}
                        onChange={onFormDataChangeHandler}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Select
                        label="Select a Brand"
                        labelId="brand"
                        id="brand"
                        name="brand_id"
                        onChange={onFormDataChangeHandler}
                        value={formData["brand_id"] || ""}
                      >
                        {brands.map((b) => (
                          <MenuItem
                            selected={b.name === formData["brand_name"]}
                            key={b.id}
                            value={b.id}
                          >
                            {b.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="right">
                      <Select
                        label="Select a Category"
                        labelId="category"
                        id="category"
                        name="category_id"
                        onChange={onFormDataChangeHandler}
                        value={formData["category_id"] || ""}
                      >
                        {categories.map((c) => (
                          <MenuItem
                            key={c.id}
                            value={c.id}
                            selected={c.name === formData["category_name"]}
                          >
                            {c.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={onFormDataChangeHandler}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={onFormDataChangeHandler}
                      />
                    </TableCell>
                    <TableCell colSpan={2} align="center">
                      <IconButton color="primary" onClick={updateHandler}>
                        <CheckIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              } else {
                return (
                  <TableRow key={p.id}>
                    <TableCell component="th">{p.id}</TableCell>
                    <TableCell align="right">{p["code_name"]}</TableCell>
                    <TableCell align="right">{p["brand_name"]}</TableCell>
                    <TableCell align="right">{p["category_name"]}</TableCell>
                    <TableCell align="right">
                      {Number(p.price).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">{p.quantity}</TableCell>
                    <TableCell colSpan={2} align="center">
                      <IconButton
                        color="primary"
                        onClick={() => onEditHandler(p)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => onDeleteHandler(p)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>
          Are you sure to delete {selectedProduct?.name}
        </DialogTitle>
        <DialogActions>
          <Button onClick={closeDialog} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={onDeleteConfirmHandler}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
