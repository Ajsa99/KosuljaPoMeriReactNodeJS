import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RiShirtFill } from 'react-icons/ri'
import { TbUserCircle } from 'react-icons/tb'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import { BiArrowBack } from 'react-icons/bi';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const OrderCompleted = () => {

    let { id } = useParams()

    const history = useNavigate()

    const [product, setProduct] = useState([])

    const [open, setOpen] = useState(0)
    const [moreDetail, setMoreDetail] = useState([])

    const [openMeter, setOpenMeter] = useState(0);
    const [meter, setMeter] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:5001/orderHistory`,
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


    return (
        <div className='containerProfile'>
            <div className='infoProduct'>
                <div className='back' onClick={() => { history(`/profileUser/${id}`) }}><BiArrowBack size={15} />Nazad</div>
                <div className='CompletedTable'>
                    <h1 className='center'>Završene porudzbine</h1>

                    {open === 0 ? (
                        <>
                            <div className='table border'>
                                <table>
                                    <tr>
                                        <th style={{ textAlign: 'start' }}>Status</th>
                                        <th>Kupac</th>
                                        <th>Proizvod</th>
                                        <th>Progres</th>
                                    </tr>
                                    {product.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                {user.status === "Plaćeno" ? (<td style={{ color: '#05FF00', textAlign: 'start' }}>{user.status}<AiOutlineCheckCircle /></td>)
                                                    : (user.status === "Otkazano5" || user.status === "Otkazano10" || user.status === "Otkazano50") && (<td style={{ color: 'red', textAlign: 'start' }}>Otkazano<AiOutlineCloseCircle /></td>)}
                                                <td><TbUserCircle size={30} color='#61B9BE' /><br /><Link to={`/viewUser1/${id}/${user.idUser}`} className='link'>{user.ime} {user.prezime}</Link><br /><p id='none' style={{ color: '#9B9B9B' }}>{user.email}</p></td>
                                                <td><button className='button center' onClick={() => { setOpen(1); ProductDetail(user.id) }}><RiShirtFill size={30} color='black' /></button></td>
                                                {user.status === "Plaćeno" ? (<td className='linetd'><div className='line1'></div>100%</td>)
                                                    : user.status === "Otkazano10" ? (<td className='linetd'><div className='line4'><div></div></div><p>10%</p></td>)
                                                        : user.status === "Otkazano50" ? (<td className='linetd'><div className='line2'><div></div></div><p>50%</p></td>)
                                                            : user.status === "Otkazano5" && (<td className='linetd'><div className='line4'><div></div></div><p>5%</p></td>)}
                                            </tr>
                                        )
                                    })}
                                </table>
                            </div>
                        </>) : open === 1 && (
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
                                                    <>
                                                        {meter.map((item, index) => {
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

                            </>)}
                </div>
            </div>
        </div>
    )
}
