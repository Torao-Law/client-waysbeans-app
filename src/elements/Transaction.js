import React from 'react'
// json
import Transactionjson from "../json/transaction.json"
// utils
import formatPrice from '../utils/formatPrice'
// assets
import LogoBrand from '../assets/image/Icon.png'

function Transaction() {
    let handleTotal = (price, qty) => {
        return price  * qty
    }
    

  return (
    <div className='card-wrapper'>
        <h3 className="fw-bold" style={{color: "#613D2B", marginBottom: 26}}>My Transaction</h3>
        {Transactionjson.listOrder.map((item, index) => {
            return (
                <div className='d-flex align-items-center justify-content-between mb-2 p-4' style={{backgroundColor: "#F6E6DA", width: 524, height: 145}}>
                    <div className='d-flex align-items-center '>
                        <div className='img-wrapper' style={{width: 73, weight: 22}}>
                            <img src={item.image} style={{width: "100%"}} alt="logo" />
                        </div>
                        <div className='ms-4'>
                            <p className='m-0 fw-bold' style={{color: "#613D2B"}}>{item.name}</p>
                            <p className='m-0'>{item.date}</p>
                            <p className='m-0'>Price: {formatPrice(item.price)}</p>
                            <p className='m-0'>Qty: {item.qty}</p>
                            <p className='m-0'>Subtotal: {handleTotal(item.price, item.qty)}</p>
                        </div>
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                            <img src={LogoBrand} alt="logo-brand" style={{width: 73, height: 22, margin: "10px 0"}}/>
                            <img src={item.QR} alt="qr" style={{width: 50, height: 50}} />
                            <p className='m-0 px-3 py-1 text-warning' style={{backgroundColor: "linear-gradient(180deg, #FF9900 0%, #FF9900 100%)"}}>{item.status}</p>
                    </div>
                </div>                
            )
        })}
        </div>
    )
}

export default Transaction
