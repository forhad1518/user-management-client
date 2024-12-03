import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditUser = () => {
    const user = useLoaderData()
    const navigate = useNavigate()

    const hanleCreateUser = event => {
        event.preventDefault()
        const name = event.target.name.value;
        const email = event.target.email.value;
        const gender = event.target.gender.value
        const status = event.target.status.value

        const updateUser = { name, email, gender, status }
        fetch(`https://user-management-server-eight-sepia.vercel.app/users/${user?._id}`, {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        })
            .then(res => res.json())
            .then(() => {
                Swal.fire({
                    title: "Update!",
                    text: "Your Personal Data!",
                    icon: "success"
                  });
                navigate('/')
            })
    }
    return (
        <div>
            <div className='my-[20px]'>
                <Link to='/' className='btn btn-primary'>All User</Link>
            </div>
            <div className='text-center'>
                <h1 className='text-2xl  font-bold'>User Update</h1>
                <p className='text-gray-400'>Use the below form create a new account</p>
            </div>
            <div>
                <form onSubmit={hanleCreateUser}>
                    {/* Input Name */}
                    <div className="form-control">
                        <label className="label ">
                            <span className="label-text text-gray-400">Name</span>
                        </label>
                        <input
                            type="text"
                            name='name'
                            placeholder="name"
                            defaultValue={user?.name}
                            className="input input-bordered" required />
                    </div>

                    {/* Input Email */}
                    <div className="form-control">
                        <label className="label ">
                            <span className="label-text text-gray-400">Email</span>
                        </label>
                        <input
                            type="email"
                            name='email'
                            placeholder="email"
                            defaultValue={user?.email}
                            className="input input-bordered"
                            required />
                    </div>

                    {/* Input Gender */}
                    <div className="flex gap-10 items-center my-4">
                        <label className="label ">
                            <span className="label-text text-gray-400">Gender</span>
                        </label>
                        <div className='flex gap-x-10'>
                            <div className='flex items-center space-x-2'>
                                <input
                                    type="radio"
                                    name="gender"
                                    value='male'
                                    className="radio radio-success"
                                    required />
                                <span>Male</span>

                            </div>
                            <div className='flex items-center space-x-2'>
                                <input type="radio" name="gender" value='female' className="radio radio-success" required />
                                <span>Female</span>
                            </div>
                        </div>
                    </div>

                    {/* Input Active Status */}
                    <div className="flex gap-10 items-center my-4">
                        <label className="label ">
                            <span className="label-text text-gray-400">Status</span>
                        </label>
                        <div className='flex gap-x-10'>
                            <div className='flex items-center space-x-2'>
                                <input type="radio" name="status" value='active' className="radio radio-success" required />
                                <span>Active</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <input type="radio" name='status' value='inactive' className="radio radio-success" required />
                                <span>Inactive</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <input type="submit" value="Update" className='btn btn-primary w-full' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;

/* 
{
    "_id": "674dd4de90eaff8317f41d31",
    "name": "Forhad Hossen",
    "email": "ahforhad20@gmail.com",
    "gender": "male",
    "status": "active"
}

*/