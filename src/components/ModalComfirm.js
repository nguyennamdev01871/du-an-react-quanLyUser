import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteupdateUser } from '../service/UserService'
import {  toast } from 'react-toastify';

const ModalConfirm = (props) => {
    const { show, handleClose, dataUserDelete ,haldleDeleteUserFromModal} = props;

    const confirmDelete = async () => {
        const res = await deleteupdateUser(dataUserDelete.id);
        if (res && +res.statusCode === 204) {
            toast.success("delete successfully")
            handleClose();
            haldleDeleteUserFromModal(dataUserDelete);

        }else{
            toast.error("error...")
        }
        console.log("check", res)

    };

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
                        {dataUserDelete && (
                            <p>
                                <b>Email: {dataUserDelete.email} ?</b>
                            </p>
                        )}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalConfirm;
