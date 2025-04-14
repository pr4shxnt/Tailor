import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { WLContext } from "../../Wishlist/WishlistContext";
import { AuthContext } from "../../Log-in/AuthProvider";
import CryptoJS from "crypto-js";
import { CreditCard, User, Wallet } from "lucide-react";
import UserDetails from "../UserDetails"
import PreviewItems from "./PreviewItems";

const CheckOutPage = () => {

  const { isUserAuthenticated, loading, cartData } = useContext(AuthContext);
  const { totalPrice, cartId } = useContext(WLContext);
  const [confirmModel, setConfirmModel] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const secret = "8gBm/:&EnhH.1/q"; // eSewa UAT secret key

  const [formdata, setFormdata] = useState({
    amount: "0",
    tax_amount: "0",
    total_amount: "0",
    transaction_uuid: "0",
    product_code: "EPAYTEST",
    product_service_charge: "0",
    product_delivery_charge: "0",
    success_url: "http://localhost:5173/user/payment-success",
    failure_url: "https://tailor-nu.vercel.app/user/payment-failure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
  });

  // Function to generate a unique transaction UUID
  const generateTransactionUUID = () => {
    return `${cartId}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  };

  // Set initial transaction UUID
  useEffect(() => {
    const transactionUUID = generateTransactionUUID();
    setFormdata((prev) => ({
      ...prev,
      transaction_uuid: transactionUUID,
    }));
  }, [cartId, totalPrice]);

  // Update form data when total price or cart ID changes
  useEffect(() => {
    const signatureString = `total_amount=${totalPrice},transaction_uuid=${formdata.transaction_uuid},product_code=EPAYTEST`;
    const hash = CryptoJS.HmacSHA256(signatureString, secret);
    const base64Signature = CryptoJS.enc.Base64.stringify(hash);

    setFormdata((prev) => ({
      ...prev,
      amount: totalPrice.toString(),
      tax_amount: "0",
      total_amount: totalPrice.toString(),
      signature: base64Signature,
    }));
  }, [totalPrice, formdata.transaction_uuid, cartData ]); 

 
  console.log("formdata", formdata);
  

  return (
    <div className="p-4   mx-auto">
      <div className="flex w-full flex-col lg:flex-row justify-between mb-6">
<div className="w-full">
  <PreviewItems/>
</div>
        <div className="w-[45%] flex flex-col">
          <div className="shadow"><UserDetails /></div>
          
      <div className="w-full p-6 rounded-lg shadow">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Pay Npr. {cartData.totalPrice} via</h2>
              </div>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Wallet className="w-5 h-5" />
                  <span>Cash on Delivery</span>
                </label>

                <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="Esewa"
                    checked={paymentMethod === "Esewa"}
                    onChange={() => setPaymentMethod("Esewa")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <img src="https://esewa.com.np/common/images/esewa-icon-large.png" alt="eSewa" className="w-5 h-5" />
                  <span>eSewa</span>
                </label>
              </div>
            </div>

      

      {paymentMethod === "Esewa" && (
                <form
                  action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                  method="POST"
                  className="mt-6"
                >
                  <input type="hidden" name="amount" value={formdata.amount} />
                  <input type="hidden" name="tax_amount" value={formdata.tax_amount} />
                  <input type="hidden" name="total_amount" value={formdata.total_amount} />
                  <input type="hidden" name="transaction_uuid" value={formdata.transaction_uuid} />
                  <input type="hidden" name="product_code" value={formdata.product_code} />
                  <input type="hidden" name="product_service_charge" value={formdata.product_service_charge} />
                  <input type="hidden" name="product_delivery_charge" value={formdata.product_delivery_charge} />
                  <input type="hidden" name="success_url" value={formdata.success_url} />
                  <input type="hidden" name="failure_url" value={formdata.failure_url} />
                  <input type="hidden" name="signed_field_names" value={formdata.signed_field_names} />
                  <input type="hidden" name="signature" value={formdata.signature} />

                  <button type="submit" className="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
                    Pay with eSewa
                  </button>
                </form>
              )}

              {paymentMethod === "COD" && (
                <button
                  onClick={() => setConfirmModel(true)}
                  className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Confirm Order
                </button>
              )}</div>
</div>
      

    

{confirmModel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold mb-4">Order Confirmed!</h3>
              <p className="text-gray-600 mb-6">Your order has been placed successfully with Cash on Delivery.</p>
              <button
                onClick={() => setConfirmModel(false)}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default CheckOutPage;
