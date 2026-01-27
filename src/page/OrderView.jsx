import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { priceFormat } from "../utils";
import customAPI from "../api";

export const loader = (storage) => async () => {
  const user = storage.getState().userState.user;
  if (!user) {
    toast.warn("Login untuk mengakses halaman ini");
    return redirect("/login");
  }
  let orders;
  if (user.role !== "owner") {
    const { data } = await customAPI.get("/order/current/user");
    orders = data.data;
  } else {
    const { data } = await customAPI.get("/order");
    orders = data.data;
  }

  return { orders };
};

const OrderView = () => {
  const { orders } = useLoaderData();
  if (!orders.length) {
    return (
      <h1 className="text-center text-primary font-bold text-3xl border-b border-secondary py-3">
        Orderan anda masih kosong
      </h1>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <td>No .</td>
            <td>Order By</td>
            <td>Product</td>
            <td>Total</td>
            <td>Status Pembayaran</td>
          </tr>
        </thead>
        <tbody>
          {orders.map((item, index) => (
            <tr key={item._id} className="hover">
              <th>{index + 1}</th>
              <td>
                {item.firstName} {item.lastName}
              </td>
              <td>
                <ul className="list-disc">
                  {item.itemsDetail.map((itemProduct, idx) => (
                    <li key={idx} className="mb-2">
                      <span className="font-medium">{itemProduct.name}</span>
                      <br />
                      <span className="text-gray-500">
                        {itemProduct.quantity} x{" "}
                        {priceFormat(itemProduct.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="font-bold">{priceFormat(item.total)}</td>
              <td>
                {item.status === "pending" ? (
                  <span className="badge badge-info p-3">Pending</span>
                ) : item.status === "success" ? (
                  <span className="badge badge-success p-3 text-white">
                    Success
                  </span>
                ) : (
                  <span className="badge badge-error p-3 text-white">
                    Failed
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderView;
