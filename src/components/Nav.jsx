import { BsCart3 } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import customAPI from "../api";
import { logoutUser } from "../features/userSlice";
import { Navlist } from "./Navlist";
import { clearCartItem } from "../features/cartSlice";

const Nav = () => {
  const user = useSelector((state) => state.userState.user);
  const countInCart = useSelector((state) => state.cartState.numItemsInCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlingLogout = async () => {
    try {
      await customAPI.get("/auth/logout");
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/");
    } catch (error) {
      dispatch(logoutUser());
      dispatch(clearCartItem());
      navigate("/");
    }
  };
  return (
    <nav className="bg-base-200">
      <div className="navbar mx-auto max-w-6xl px-8">
        <div className="navbar-start">
          <NavLink to="/" className="hidden lg:flex text-3xl items-center">
            <img
              src="\public\LOGO NAFARA.png"
              alt="Logo"
              className="h-25 w-auto rounded-full"
            />
          </NavLink>
          {/* Mobile device */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6 " />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-200 rounded-box w-52"
            >
              <Navlist />
            </ul>
          </div>

          {/* PC device */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal">
              <Navlist />
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          <NavLink to="/cart" className="btn btn-ghost btn-circle btn-md">
            <div className="indicator">
              <BsCart3 />
              <span className="badge badge-primary badge-sm indicator-item">
                {countInCart}
              </span>
            </div>
          </NavLink>
          {user && (
            <button
              className="btn brn-error btn-outline btn-md"
              onClick={handlingLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
