import React, {useEffect, useState} from 'react';
import ProductTable from "../../../components/products/ProductTable.jsx";
import {deleteProductService, getProductsService} from "../../../services/productService.js";
import {useThemeStyles} from "../../../context/useThemeStyles.js";
import Button from "../../../components/Button.jsx";
import Modal from "../../../components/Modal.jsx";
import ProductForm from "../../../components/products/ProductForm.jsx";
import Swal from "sweetalert2";
import {deleteUser} from "../../../services/userService.js";
import {toast} from "sonner";
 
const ProductsPage = () => {
    const styles = useThemeStyles()
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
 
    const fetchProducts = async () => {
        const res = await getProductsService()
        setProducts(res.data)
    }
 
    useEffect(() => {
        const loadProducts = async () => {
            await fetchProducts()
        }
        loadProducts()
    }, [])
 
    const handleOpenModal = () => {
        setOpen(true)
        setEditingProduct(null)
    }
 
    const handleCloseModal = () => {
        setOpen(false)
        setEditingProduct(null)
    }
 
    const handleEdit = (product) => {
        setEditingProduct(product)
        setOpen(true)
    }
 
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar?",
            text: "No podrás revertir esto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
        });
        try {
            if (result.isConfirmed) {
                await deleteProductService(id)
                toast.success("Producto eliminado correctamente")
                await fetchProducts()
            }
        } catch
            (error) {
            console.error('Error al eliminar producto:', error);
            toast.error("Error al eliminar el producto. Por favor intenta de nuevo.");
        }
    }
 
    const modalTitle = editingProduct?.id ? `Editar Usuario: ${editingProduct.name}` : "Nuevo Producto";
 
    return (
        <>
            <Modal
                open={open}
                onClose={handleCloseModal}
                title={modalTitle}
            >
                <ProductForm
                    fetchProducts={fetchProducts}
                    onClose={handleCloseModal}
                    setEditingProduct={setEditingProduct}
                    editingProduct={editingProduct}
                />
            </Modal>
            <div className={"w-full"}>
                <div className={"flex justify-between"}>
                    <h1 className={`text-2xl sm:text-3xl font-bold ${styles.textPrimary}`}>
                        Gestion de productos
                    </h1>
                    <Button
                        variant={"new"}
                        onClick={handleOpenModal}
                        title={"Nuevo producto"}
                    >
                        + Nuevo producto
                    </Button>
                </div>
                <ProductTable
                    products={products}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </>
    );
};
 
export default ProductsPage;