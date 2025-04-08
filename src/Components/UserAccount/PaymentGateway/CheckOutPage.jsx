import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { WLContext } from "../../Wishlist/WishlistContext";
import CryptoJS from "crypto-js";

const CheckOutPage = () => {
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
    failure_url: "http://localhost:5173/failure",
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
  }, [cartId]);

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
  }, [totalPrice, formdata.transaction_uuid]); // Updated to trigger on both totalPrice and transaction_uuid

  console.log("Form Data:", formdata); // Debugging Log
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2">Select Payment Method</h2>
      <div className="mb-4 space-x-4">
        <label>
          <input
            type="radio"
            name="payment"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />{" "}
          Cash on Delivery
        </label>

        <label>
          <input
            type="radio"
            name="payment"
            value="Esewa"
            checked={paymentMethod === "Esewa"}
            onChange={() => setPaymentMethod("Esewa")}
          />{" "}
          eSewa
        </label>
      </div>

      {paymentMethod === "Esewa" && (
        <form
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST"
          className="space-y-2"
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

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
            Pay with eSewa
          </button>
        </form>
      )}

      {paymentMethod === "COD" && (
        <button
          onClick={() => setConfirmModel(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Confirm Order
        </button>
      )}

      {confirmModel && (
        <div className="mt-4 p-4 border rounded shadow">
          <p>Order placed with Cash on Delivery!</p>
          <button
            onClick={() => setConfirmModel(false)}
            className="mt-2 text-sm text-red-500 underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckOutPage;
