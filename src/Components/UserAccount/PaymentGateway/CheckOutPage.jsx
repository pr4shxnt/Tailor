import React, { useState } from 'react'

const CheckOutPage = () => {
    const [formdata, setFormdata] = useState({
        amount: 100,
        tax_amount: 10,
        total_amount: 110,
        transaction_uuid: "241028",
        product_code: "EPAYTEST",
        product_service_charge: 0,
        product_delivery_charge: 0,
        success_url: "https://developer.esewa.com.np/success",
        failure_url: "https://developer.esewa.com.np/failure",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        signature: "",
        secret: ""
    })
    return (

        <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">

            <input 
            type="text"
             id="amount" 
            name="amount" 
            value={formdata.amount}
            required />


            <input 
            type="text"
             id="tax_amount" 
            name="tax_amount" 
            value={formdata.tax_amount}
            required />


            <input 
            type="text"
             id="total_amount" 
            name="total_amount" 
            value={formdata.total_amount}
            required />


            <input 
            type="text"
             id="transaction_uuid" 
            name="transaction_uuid" 
            value={formdata.transaction_uuid} 
            required />


            <input 
            type="text"
             id="product_code" 
            name="product_code" 
            value={formdata.product_code}
            required />


            <input 
            type="text"
             id="product_service_charge" 
            name="product_service_charge" 
            value={formdata.product_service_charge}
            required />


            <input 
            type="text"
             id="product_delivery_charge" 
            name="product_delivery_charge" 
            value={formdata.product_delivery_charge}
            required />


            <input 
            type="text"
             id="success_url" 
            name="success_url" 
            value={formdata.success_url}
            required />


            <input 
            type="text"
             id="failure_url" 
            name="failure_url" 
            value={formdata.failure_url}
            required />


            <input 
            type="text"
             id="signed_field_names" 
            name="signed_field_names" 
            value={formdata.signed_field_names}
            required />


            <input 
            type="text"
             id="signature" 
            name="signature" 
            value={formdata.signature}
            required />


            <input 
            value="Submit" 
            type="submit" />
        </form>


    )
}

export default CheckOutPage