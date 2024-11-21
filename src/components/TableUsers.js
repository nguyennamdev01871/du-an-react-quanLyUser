// TableUsers.js
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../service/UserService';
import ReactPaginate from 'react-paginate'
import ModalAddnew from './ModalAddnew';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalComfirm';
import _ from "lodash";
import { collapseToast } from 'react-toastify';





const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPages, setTotalpages] = useState(0)


  const [isShowmodalAddnew, setIsShowmodalAddnew] = useState(false);

  const [isShowEditUser, setIsShowEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({})

  const [isShowModalDelete,setIsShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({})


  const handClose = () => {
    setIsShowmodalAddnew(false);
    setIsShowEditUser(false);
    setIsShowModalDelete(false);
  }




  const handupdateUser = (user) => {
    setListUsers([user, ...listUsers])
  }




  const handEditUpadateUser = (user) => {
    let cloneListUser = _.cloneDeep(listUsers)
    let index = listUsers.findIndex(item => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    cloneListUser[index].last_name = user.last_name;
    setListUsers(cloneListUser);


  }


  const hanlDeleteUser = (user) => {
    setIsShowModalDelete(true); 
    setDataUserDelete(user); 
  };


  const haldleDeleteUserFromModal = (user) =>{
    let cloneListUser = _.cloneDeep(listUsers)
    cloneListUser = cloneListUser.filter(item => item.id  !== user.id);

    setListUsers(cloneListUser);

  }
  


  const handleEdiUser = (user) => {
    console.log(user)
    setDataUserEdit(user)
    setIsShowEditUser(true)

  }



  useEffect(() => {
    getUsers(1);

  }, []);



  const getUsers = async (page) => {
    const response = await fetchAllUser(page);
    if (response && response.data) {
      setListUsers(response.data);
      setTotalUser(response.total);
      setTotalpages(response.total_pages);

      console.log(response);
    }
  };



  const handlePageClick = (event) => {
    console.log("event", event);
    getUsers(event.selected + 1)

  }

  return (
    <>

      <div className='my-3 add-new'>
        <span>List User</span>
        <button className='btn btn-primary' aria-label='Add new user' onClick={() => (setIsShowmodalAddnew(true))}>Add New</button>
      </div>


      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>first_name</th>
            <th>last_name</th>
            <th>avatar</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 &&
            listUsers.map((item, index) => (
              <tr key={`user-${index}`}>
                <td>{item.id}</td>
                <td>{item.email}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td><img src={item.avatar} alt="avatar" width="50" height="50" /></td>
                <td style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button className='btn btn-warning' onClick={() => handleEdiUser(item)}>
                      Edit
                    </button>
                    <button className='btn btn-danger' onClick={() => hanlDeleteUser(item)}>
                      Delete
                    </button>
                  </div>
                </td>

              </tr>
            ))
          }
        </tbody>
      </Table>
      <div className="pagination-container">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>

      <ModalAddnew
        show={isShowmodalAddnew}
        handleClose={handClose}
        handupdateUser={handupdateUser}

      />

      <ModalEditUser
        show={isShowEditUser}
        dataUserEdit={dataUserEdit}
        handleClose={handClose}
        handEditUpadateUser={handEditUpadateUser}


      />


      <ModalConfirm
         show={isShowModalDelete}
         handleClose={handClose}
         dataUserDelete = {dataUserDelete}
         haldleDeleteUserFromModal= {haldleDeleteUserFromModal}

      />





    </>
  );
};

export default TableUsers;
