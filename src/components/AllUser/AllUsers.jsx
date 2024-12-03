import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const loadUsers = useLoaderData()
    const [users, setUsers] = useState(loadUsers);

    const handleDelete = id => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                fetch(`https://user-management-server-eight-sepia.vercel.app/users/${id}`, {
                    method: 'delete'
                })
                    .then(res => res.json())
                    .then(() => {
                        const remainUser = users.filter(user => user?._id !== id);
                        setUsers(remainUser);
                    })
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: "Your imaginary file is safe :)",
                    icon: "error"
                });
            }
        });
    }
    return (
        <div className="overflow-x-auto">
            <div className='my-[20px]'>
                <Link to={'/newuser'} className='btn btn-primary'>New User</Link>
            </div>
            <table className="table">
                {/* head */}
                <thead>
                    <tr className='bg-gray-900 text-white text-center'>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        users?.map((user, index) => <tr key={user?._id} className="bg-base-200 text-center hover:bg-slate-200">
                            <th>{index + 1}</th>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.gender}</td>
                            <td>{user?.status}</td>
                            <td>
                                <Link to={`/users/${user?._id}`} className='btn btn-link'>edit</Link>
                                <button onClick={() => handleDelete(user?._id)} className='btn btn-primary'>delete</button>
                            </td>
                        </tr>)

                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllUsers;