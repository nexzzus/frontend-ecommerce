import React, {useEffect} from 'react';
import CategoriesTable from "../../../components/categories/CategoriesTable.jsx";
import {deleteCategoryService, getCategoriesService} from "../../../services/categoryService.js";
import Swal from "sweetalert2";
import {toast} from "sonner";
import {useThemeStyles} from "../../../context/useThemeStyles.js";
import Button from "../../../components/Button.jsx";
import Modal from "../../../components/Modal.jsx";
import CategoriesForm from "../../../components/categories/CategoriesForm.jsx";
 
const CategoriesPage = () => {
    const styles = useThemeStyles();
    const [categories, setCategories] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [editingCategory, setEditingCategory] = React.useState(false);
 
    const fetchCategories = async () => {
        const response = await getCategoriesService();
        setCategories(response.data);
    }
 
    useEffect(() => {
        const loadCategories = async () => {
            await fetchCategories();
        }
        loadCategories();
    }, []);
 
    const handleEdit = (category) => {
        setOpen(true);
        setEditingCategory(category);
    }
 
    const handleDelete = async (id) => {
        try {
 
            const result = await Swal.fire({
                title: "¿Eliminar?",
                text: "No podrás revertir esto",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
            });
 
            if (result.isConfirmed) {
                await deleteCategoryService(id)
                toast.success("Categoría eliminada correctamente")
                await fetchCategories()
            }
 
        } catch (e) {
            console.log(e)
        }
    }
 
    const handleOpen = () => {
      setOpen(true);
      setEditingCategory(null);
    }
 
    const handleClose = () => {
        setOpen(false);
        setEditingCategory(null);
    }
 
    const modalTitle = editingCategory?.id ? `Editar categoría: ${editingCategory.name}` : "Nueva categoría";
 
    return (
        <>
            <Modal
            open={open}
            onClose={handleClose}
            title={modalTitle}
            >
                <CategoriesForm
                    onClose={handleClose}
                    setEditingCategory={setEditingCategory}
                    editingCategory={editingCategory}
                    fetchCategories={fetchCategories}
                />
            </Modal>
 
            <div className={"w-full"}>
                <div className={"flex justify-between items-center mb-6"}>
                    <h1 className={`${styles.textPrimary} text-2xl sm:text-3xl font-bold`}>
                        Gestión de categorías
                    </h1>
                    <Button
                        title={"Nueva categoría"}
                        variant={"new"}
                        onClick={handleOpen}
                    >
                        +Nueva categoría
                    </Button>
                </div>
 
                <CategoriesTable
                    categories={categories}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />
            </div>
        </>
    );
};
 
export default CategoriesPage;