import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import 'react-toastify/dist/ReactToastify.css';
import { putupdateUser } from '../service/UserService';
import { toast } from 'react-toastify';


const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit,handEditUpadateUser } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [last_name,setLast_name] = useState("")


  useEffect(() => {
    if (dataUserEdit) {
      setName(dataUserEdit.first_name || ""); 
      setJob(dataUserEdit.last_name || ""); 
     
    }
  }, [dataUserEdit]);


  const handleEditUser = async () => {
    const res = await putupdateUser( name, job);
   if(res && res.updatedAt){
    handEditUpadateUser({
      first_name:name,
      last_name:job,
      id:dataUserEdit.id
    })

    handleClose();
    toast.success("Update succsessfully")
   }
  };

  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">Name</label>
              <input
                className="form-control"
                id="nameInput"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="jobInput" className="form-label">Job</label>
              <input
                className="form-control"
                id="jobInput"
                value={job}
                onChange={(event) => setJob(event.target.value)}
              />
            </div>

         



          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditUser}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditUser;
