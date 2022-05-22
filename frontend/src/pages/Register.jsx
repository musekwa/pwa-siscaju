import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import Select from 'react-select';
import { register, reset } from "../features/auth/authSlice";
import Spinner from '../components/Spinner'

const selectOptions = [
  { value: 'Extensionista', label: 'Extensionista'},
  { value: 'Produtor', label: 'Produtor'},
  { value: 'Gestor', label: 'Gestor'}
]


function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: "",
    role: "",
  });

  const { fullname, email, password, password2, role } = formData;

   const { user, isLoading, isError, isSuccess, message } = useSelector(
     (state) => state.auth
   );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    if (isError){
      toast.error(message)
    }
    if (isSuccess || user){
      navigate('/')
    }
    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

 
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Password do not match');
    }
    else if (role === "") {
      toast.error("Role not allowed")
    }else if (fullname.split(" ").length < 2){
      toast.error("Enter your fullname")
    } 
    else {
      const userData = {
        fullname,
        email,
        password,
        role,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading){
    return <Spinner />
  }
 
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
        <section className="form">
          <div className="form-group">
            <form onSubmit={onSubmit}>
              <div className="form-groug">
                <input
                  type="text"
                  className="form-control"
                  id="fullname"
                  name="fullname"
                  value={fullname}
                  placeholder="Enter your fullname"
                  onChange={onChange}
                />
              </div>
              <div className="form-groug">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={onChange}
                />
              </div>
              <div className="form-groug">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  name="password2"
                  value={password2}
                  placeholder="Confirm your password"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <select name="role" value={formData.role} onChange={onChange}>
                  <option value="">Selecionar o seu perfil</option>
                  <option value="Extensionista">Extensionista</option>
                  <option value="Produtor">Produtor</option>
                  <option value="Gestor">Gestor</option>
                </select>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-block">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </section>
    </>
  );
}

export default Register;
