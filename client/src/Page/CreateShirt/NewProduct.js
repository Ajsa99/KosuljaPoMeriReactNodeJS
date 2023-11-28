import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';

export const NewProduct = () => {

    let { id } = useParams();

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [isError, setError] = useState(null)

    const [userInfo, setuserInfo] = useState({
        file: [],
        filepreview: null,
    });

    const [userInfo1, setuserInfo1] = useState({
        file: [],
        filepreview: null,
    });

    const handleInputChange = (event) => {
        setuserInfo({
            ...userInfo,
            file: event.target.files[0],
            filepreview: URL.createObjectURL(event.target.files[0]),
        });

    }

    const handleInputChange1 = (event) => {
        setuserInfo1({
            ...userInfo,
            file: event.target.files[0],
            filepreview: URL.createObjectURL(event.target.files[0]),
        });

    }

    const submit = async () => {

        const formdata = new FormData();
        formdata.append('name', name);
        formdata.append('price', price);
        formdata.append('avatar', userInfo.file);
        formdata.append('avatar', userInfo1.file);

        const userConfirmation = window.confirm("Da li ste sigurni?");

        if (userConfirmation === true) {

            axios.post("http://localhost:5002/imageupload",
                formdata, {
                headers: { "Content-Type": "multipart/form-data" }
            })
                .then(res => {
                    console.warn(res);
                    if (res.data.success === 1) {
                        resetForm();
                    }
                    if (res.data.error) {
                        setError(res.data.error)
                    }

                })

        }

    }

    const resetForm = () => {
        setName("");
        setPrice("");
        setuserInfo({ file: [], filepreview: null });
        setuserInfo1({ file: [], filepreview: null });
    };

    return (
        <div className='container'>
            <div className='wrapper'>
                <div className='newProduct'>

                    <h3>Dodaj materijal:</h3>
                    <div>
                        <label>Naziv:</label>
                        <input type="text" name="name" value={name} placeholder='Naziv materijala' onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label>Cena:</label>
                        <input type="number" name="price" value={price} placeholder='Cena materijala u eurima' onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div>
                        <label>Slika materija:</label>
                        <input type="file" accept="image/*" name="upload_file" onChange={handleInputChange} />
                    </div>

                    {userInfo.filepreview !== null ?
                        <div className='newimg'>
                            <img src={userInfo.filepreview} alt="UploadImage" width={100} />
                        </div>
                        : null}

                    <div>
                        <label>Slika košulje:</label>
                        <input type="file" accept="image/*" name="upload_file" onChange={handleInputChange1} />
                    </div>


                    {userInfo1.filepreview !== null ?
                        <div className='newimg'>
                            <img src={userInfo1.filepreview} alt="UploadImage" width={100} />
                        </div>
                        : null}


                    <div className="button">
                        <button type="submit" onClick={() => submit()}>Potvrdi</button>
                    </div>

                    {isError !== null ? <h5 style={{ color: 'red' }}> {isError} </h5> : null}

                    <Link to={`/createshirt/${id}`} className='back link'><IoIosArrowBack />Vrati se u prodavnicu</Link>
                </div>
            </div>
        </div>
    )
}

