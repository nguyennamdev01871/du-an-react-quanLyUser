import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from "../service/UserService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalAddnew = (props) => {
  const { show, handleClose, handupdateUser } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [avatar, setavatar] = useState("");

  const checkEmpty = (value) => {
    return !value || value.trim() === '';
  };
  


  const handleSave = async () => {
   
    if (
      checkEmpty(first_name) ||
      checkEmpty(last_name) ||
      checkEmpty(name) ||
      checkEmpty(job) ||
      checkEmpty(email) ||
      checkEmpty(avatar)
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
  
    try {
      const res = await postCreateUser(name, job);
      if (res && res.id) {

        handleClose();
        setName('');
        setJob('');
        setEmail('');
        setfirst_name('');
        setlast_name('');
        setavatar('');
  
        toast.success("created successfully");
  
        handupdateUser({
          id: res.id,
          first_name: first_name,
          last_name: last_name,
          email: email,
          name: name,
          avatar: avatar
        });
  
        console.log(res);
      } else {
        toast.error("Error occurred while creating user.");
      }
    } catch (error) {
      toast.error(`Error: ${error.message || "An unknown error occurred"}`);
    }
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
          
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>

              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">firtName</label>
                <input
                  className="form-control"
                  id="nameInput"
                  value={first_name}
                  onChange={(event) => setfirst_name(event.target.value)}
                />
              </div>


              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">lastName</label>
                <input
                  className="form-control"
                  id="nameInput"
                  value={last_name}
                  onChange={(event) => setlast_name(event.target.value)}
                />
              </div>



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

              <div className="mb-3">
                <label htmlFor="jobInput" className="form-label">email</label>
                <input
                  className="form-control"
                  id="jobInput"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>


              <div className="mb-3">
                <label htmlFor="jobInput" className="form-label">avata</label>
                <input
                  className="form-control"
                  id="jobInput"
                  value={avatar}
                  onChange={(event) => setavatar(event.target.value)}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddnew;
