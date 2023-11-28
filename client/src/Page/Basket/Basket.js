import React, { useEffect, useState } from 'react'
import basketImage from "./img/baskets.png"
import { IoIosArrowBack } from 'react-icons/io';
import { BsFillCartXFill } from 'react-icons/bs';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BsFillBagCheckFill } from 'react-icons/bs'
import { RiChatHistoryLine } from 'react-icons/ri'

import './basket.css'

export const Basket = () => {

  let { id } = useParams();

  const history = useNavigate();

  const [product, setProduct] = useState([])
  const [count, setCount] = useState(0);

  useEffect(() => {

    axios.get(`http://localhost:5003/product/${id}`,
    ).then((response) => {
      setProduct(
        response.data.map(item => ({
          ...item,
          count: 1
        }))
      )
    })

    axios.get(`http://localhost:5003/countProduct/${id}`,
    ).then((response) => {
      setCount(response.data[0].count);
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const incrementCount = (id) => {
    setProduct(prevData =>
      prevData.map(item => {
        if (item.id === id && item.count < 20) {
          return {
            ...item,
            count: item.count + 1
          };
        }
        return item;
      })
    );
  }

  const decrementCount = (id) => {
    setProduct(prevData =>
      prevData.map(item => {
        if (item.id === id && item.count > 1) {
          return {
            ...item,
            count: item.count - 1
          };
        }
        return item;
      })
    );
  };

  const totalPrice = product.reduce((acc, item) => acc + (item.price * item.count), 0);

  const Delete = (idItem) => {

    const userConfirmation = window.confirm("Da li ste sigurni?");

    if (userConfirmation === true) {

      axios.put(`http://localhost:5003/deleteProduct/${id}`, { idItem: idItem }).then((response) => {
      })
      alert("Obrisali ste proizbod!");
      const newProductList = product.filter(item => item.id !== idItem);
      setProduct(newProductList);
    }

  }

  const onClick = () => {

    const userConfirmation = window.confirm("Da li ste sigurni?");

    if (userConfirmation === true) {

      axios.put(`http://localhost:5003/orderingproducts/${id}`, { product: product }).then((response) => {
      })
      alert("Uspešno poručeno");
      history(`/basketHistory/${id}`)

    }

  }

  return (
    <div className='containerBasket'>
      <div className='basketBox'>
        <img src={basketImage} alt='basketImage' id='image' />
        <div className='basketProduct'>

          <div className='header'>
            <h1>Korpa</h1>
            <p>{count} proizvoda</p>
          </div>
          <div className='body'>
            {product.map((item, index) => {
              return (
                <div key={index}>
                  <hr />
                  <div key={item.id} className='productNumber'>
                    <img src={item.shirt} alt='img' width={'15%'} />
                    <div className='info'>
                      <div className='nameShirt'>
                        <p>Košulja / {item.size}</p>
                        <p className='name'>{item.name}</p>
                      </div>
                      <div className='calculator'>
                        <p onClick={() => decrementCount(item.id)}>-</p>
                        <div className='quantity'>{item.count}</div>
                        <p onClick={() => incrementCount(item.id)}>+</p>
                      </div>
                      <div className='price'>Cena: {item.price * item.count}e</div>
                      <button className='delete' onClick={() => { Delete(item.id) }}><BsFillCartXFill /></button>
                    </div>
                  </div>

                </div>
              )
            })}
          </div>
          <div className='footerBasket'>
            <button className='btnBack' onClick={() => history(`/createshirt/${id}`)}><IoIosArrowBack />Vrati se u prodavnicu</button>
            <button className='btnBack end' onClick={() => history(`/basketHistory/${id}`)}><BsFillBagCheckFill size={20} color='#0E0E0E' /><RiChatHistoryLine size={17} color='#0E0E0E' /></button>
          </div>

        </div>
        <div className='basketCalculator'>

          <div>
            <h1>Ukupno</h1>
            <hr />
          </div>

          {totalPrice !== 0 &&
            <>
              <div className='header'>
                <p>PROIZVODA {count}</p>
              </div>

              <div>
                <p>DOSTAVA</p>
                <select name="dostava">
                  <option value="pouzećem">Standardna dostava 5e</option>
                </select>
              </div>
            </>
          }

          <div>
            <hr />

            <div className='header'>
              <p>UKUPNA CENA:</p>
              <p>{totalPrice !== 0 ? `${totalPrice}e` : '0e'}</p>
            </div>
          </div>

          {totalPrice !== 0 &&
            <button onClick={() => { onClick() }}>POTVRDI</button>
          }

        </div>

      </div>
    </div>
  )
}
