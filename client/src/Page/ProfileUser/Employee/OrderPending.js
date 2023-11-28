import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BsFillCartCheckFill, BsFillCartDashFill } from 'react-icons/bs'
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

import './employee.css'


export const OrderPending = () => {

    let { id } = useParams()

    const history = useNavigate()

    const [product, setProduct] = useState([])
    const [open, setOpen] = useState(0)

    const [moreDetail, setMoreDetail] = useState([])

    const [openMeter, setOpenMeter] = useState(0);
    const [meter, setMeter] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:5001/orderPending`,
        ).then((response) => {
            setProduct(response.data);
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const ProductDetail = (id) => {

        axios.get(`http://localhost:5001/productInfo/${id}`,
        ).then((response) => {
            setMoreDetail(response.data);
        })
    }

    const MeterDetail = (id) => {

        axios.get(`http://localhost:5001/meterInfo/${id}`,
        ).then((response) => {
            setMeter(response.data);
        })
    }

    const Accept = (id) => {

        const userConfirmation = window.confirm("Da li ste sigurni?");

        if (userConfirmation === true) {

            axios.put(`http://localhost:5001/productProcess/${id}`,
            ).then((response) => { })

            alert("Uspesno ste prihvatili porudzbinu!");
            const newProductList = product.filter(item => item.id !== id);
            setProduct(newProductList);
        }
    }

    const Cancel = (id) => {

        const userConfirmation = window.confirm("Da li ste sigurni?");

        if (userConfirmation === true) {

            axios.put(`http://localhost:5001/produCancel10/${id}`,
            ).then((response) => { })

            alert("Uspesno ste odbili porudzbinu!")
            const newProductList = product.filter(item => item.id !== id);
            setProduct(newProductList);
        }
    }

    return (
        <div className='containerProfile'>
            <div className='infoProduct'>
                <div className='back' onClick={() => { history(`/profileUser/${id}`) }}><BiArrowBack size={15} />Nazad</div>
                <div className='ProductTable'>
                    <h1 className='center'>Porudzbine na čekanju</h1>

                    {open === 0 ? (
                        <div className='table'>
                            <table>
                                <tr>
                                    <th>Id</th>
                                    <th>Korisnik</th>
                                    <th id='none'>Naziv košulje</th>
                                    <th>Proizvod</th>
                                    <th colSpan={2}>Prihvati/Odbi</th>
                                </tr>
                                {product.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><Link to={`/viewUser1/${id}/${user.idUser}`} className='link'>{user.ime} {user.prezime}</Link><br /><p id='none' style={{ color: '#9B9B9B' }}>{user.email}</p></td>
                                            <td id='none'>{user.name}</td>
                                            <td><button className='button center' onClick={() => { setOpen(1); ProductDetail(user.id) }}>detaljnije</button></td>
                                            <td><button onClick={() => Accept(user.id)}><BsFillCartCheckFill size={40} color='green' /></button></td>
                                            <td><button onClick={() => Cancel(user.id)}><BsFillCartDashFill size={40} color='darkred' /></button></td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                    ) : open === 1 && (
                        <>
                            {moreDetail.map((item, index) => {
                                return (
                                    <div className="Details">
                                        <div className="left center">
                                            <img src={item.shirt} alt="shirt" width='60%' />
                                        </div>
                                        <div className="right center">

                                            {openMeter === 0 ? (
                                                <>
                                                    <button onClick={() => { setOpen(0) }}><BiArrowBack size={20} /></button>
                                                    <table>
                                                        <tr>
                                                            <th>Naziv:</th>
                                                            <td>{item.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Kroj:</th>
                                                            <td>{item.measure}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Ledja:</th>
                                                            <td>{item.back}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Kopčanje:</th>
                                                            <td>{item.tied}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Kragna:</th>
                                                            <td>{item.kragen}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Rukavi:</th>
                                                            <td>{item.sleeve1} - {item.sleeve}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Dzep:</th>
                                                            <td>{item.pocket}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Dugmad:</th>
                                                            <td style={{ display: 'flex', justifyContent: 'space-between' }}>{item.color_button}:<div className={item.color_button} style={{ width: '90%' }}></div></td>
                                                        </tr>
                                                        <tr>
                                                            <th>Rupice:</th>
                                                            <td style={{ display: 'flex', justifyContent: 'space-between' }}>{item.color_holes}:<div className={item.color_holes} style={{ width: '90%' }}></div></td>
                                                        </tr>
                                                        <tr>
                                                            <th>Epolete:</th>
                                                            <td>{item.epolete}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Umetak:</th>
                                                            <td>{item.add_insert}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Vličina:</th>
                                                            {item.size === "Meter" ? (<td onClick={() => { setOpenMeter(1); MeterDetail(item.idSize) }} className='meter'>{item.size}</td>) : (
                                                                <td>{item.size}</td>
                                                            )}
                                                        </tr>
                                                        <tr>
                                                            <th>Kolicina:</th>
                                                            <td>{item.quantity}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Ukupna cena:</th>
                                                            <td>{item.price}e</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Datum:</th>
                                                            <td>{item.date}</td>
                                                        </tr>
                                                    </table>
                                                </>
                                            ) : (
                                                <>  {meter.map((item, index) => {
                                                    return (
                                                        <>
                                                            <button onClick={() => { setOpenMeter(0) }}><BiArrowBack size={20} /></button>
                                                            <table key={index}>
                                                                <tr>
                                                                    <th>Vrat</th>
                                                                    <td>{item.neck}cm</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Grudi</th>
                                                                    <td>{item.breasts}cm</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Struk</th>
                                                                    <td>{item.waist}cm</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Kukovi</th>
                                                                    <td>{item.hips}cm</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Duzina napred</th>
                                                                    <td>{item.fontSize}cm</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Duzina nazad</th>
                                                                    <td>{item.backSide}cm</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Ramena</th>
                                                                    <td>{item.shoulders}cm</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Rukavi</th>
                                                                    <td>{item.sleeves}cm</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Nadlaktice</th>
                                                                    <td>{item.upperArm}cm</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Zglobovi</th>
                                                                    <td>{item.rightWrist}cm</td>
                                                                </tr>
                                                            </table>
                                                        </>
                                                    )
                                                })}

                                                </>)}

                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
