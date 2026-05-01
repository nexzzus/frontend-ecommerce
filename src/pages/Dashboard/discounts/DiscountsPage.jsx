import React, {useEffect} from 'react';
import DiscountsTable from "../../../components/discounts/DiscountsTable.jsx";
import Swal from "sweetalert2";
import {toast} from "sonner";
import {deleteDiscountsService, getDiscountsService} from "../../../services/discountService.js";
import {useThemeStyles} from "../../../context/useThemeStyles.js";
import Button from "../../../components/Button.jsx";
import Modal from "../../../components/Modal.jsx";
import DiscountsForm from "../../../components/discounts/DiscountsForm.jsx";
 
const DiscountsPage = () => {
    const styles = useThemeStyles()
    const [discounts, setDiscounts] = React.useState([]);
    const [editingDiscount, setEditingDiscount] = React.useState(null);
    const [open, setOpen] = React.useState(false);
 
    const fetchDiscounts = async () => {
        const res = await getDiscountsService()
        setDiscounts(res.data);
    }
 
    useEffect(() => {
        const loadDiscounts = async () => {
            await fetchDiscounts();
        }
        loadDiscounts();
    }, [])
 
    const handleEdit = (discount) => {
        setOpen(true);
        setEditingDiscount(discount);
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
                await deleteDiscountsService(id)
                toast.success("Descuento eliminado correctamente")
                await fetchDiscounts()
            }
 
        } catch (e) {
            console.log(e)
        }
    }
 
    const handleOpen = () => {
        setOpen(true);
        setEditingDiscount(null)
    }
 
    const handleClose = () => {
        setOpen(false);
        setEditingDiscount(null)
    }
 
    const modalTitle = editingDiscount?.id ? `${editingDiscount.code}` : "Nuevo descuento"
 
    return (
        <div>
            <Modal
            open={open}
            onClose={handleClose}
            title={modalTitle}
            >
                <DiscountsForm
                    fetchDiscount={fetchDiscounts}
                    onClose={handleClose}
                    editingDiscount={editingDiscount}
                    setEditingDiscount={setEditingDiscount}
                />
            </Modal>
            <div className={"flex justify-between"}>
                <h1 className={`${styles.textPrimary} font-bold text-2xl md:text-3xl`}>Gestión de descuentos</h1>
                <Button
                    onClick={handleOpen}
                    title={"Nuevo descuento"}
                    variant={"new"}
                >
                    +Nuevo descuento
                </Button>
            </div>
 
            <DiscountsTable
                onEdit={handleEdit}
                onDelete={handleDelete}
                discounts={discounts}
            />
        </div>
    );
};
 
export default DiscountsPage;