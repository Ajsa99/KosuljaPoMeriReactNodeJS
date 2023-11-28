import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import "./reg.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill, BsMailbox2 } from 'react-icons/bs';
import { GiModernCity } from 'react-icons/gi';
import { FaCity, FaAddressCard, FaUserTie } from 'react-icons/fa';
import { RiLockPasswordFill, RiLockPasswordLine, RiAdminFill } from 'react-icons/ri';
import { ImUserTie } from 'react-icons/im';

function Registration() {

  const history = useNavigate();

  const [type, setType] = useState("");

  const initialValues = {
    Ime: "",
    Prezime: "",
    Email: "",
    Kontakt: "",
    Drzava: "",
    Grad: "",
    PostBroj: "",
    Adresa: "",
    Password: "",
    PPassword: "",
    type: type,
  }

  const validationSchema = Yup.object().shape({
    Ime: Yup.string().matches(/^[A-Z][a-zA-Z]+$/, "Prvo slovo mora da bude veliko").min(3, "Ime mora da sadrzi najmanje 3 karaktera").required("Ime je obavezno polje"),
    Prezime: Yup.string().matches(/^[A-Z][a-zA-Z]+$/, "Prvo slovo mora da bude veliko").min(3, "Prezime mora da sadrzi najmanje 3 karaktera").required("Prezime je obavezno polje"),
    Email: Yup.string().email("Unesite ispravan email").required("Email je obavezan polje"),
    Kontakt: Yup.string().matches(/^\d{10,}$/, "Kontakt mora da sadrzi 10 brojeva").matches(/^[0-9]+$/, "Unesite ispravan broj telefona").required("Kontakt je obavezan polje"),
    Drzava: Yup.string().matches(/^[A-Z][a-zA-Z\s]+$/, "Prvo slovo mora da bude veliko").min(3, "Unesite isprano Drzavu").max(30, "Unesite ispravno Drzavu").required("Drzava je obavezna polje"),
    Grad: Yup.string().matches(/^[A-Z][a-zA-Z\s]+$/, "Prvo slovo mora da bude veliko").min(3, "Unesite ispravno Grad").max(30, "Unesite ispravno Grad").required("Grad je obavezan polje"),
    PostBroj: Yup.string().matches(/^\d{4,7}$/, "Unesite ispravno poštanski broj (4-7)").required("Postanski broj je obavezan polje"),
    Adresa: Yup.string().matches(/^[A-Z][a-zA-Z\s]+\s?[a-zA-Z\s]+\s?[a-zA-Z\d]{0,3}$/, "Unesite isprabno adresu (Adresa bb)").min(5, "Adresa must be at least 5 characters").required("Adresa je obavezna polje"),
    Password: Yup.string().min(4, "Šifra mora da sadrzi najmanje 4 karaktera").required("Sifra je obavezna polje"),
    PPassword: Yup.string().oneOf([Yup.ref('Password')], 'Šifre se ne podudaraju').required("Šifra je obavezna polje"),
  })

  const validationSchemaTwo = Yup.object().shape({
    Ime: Yup.string().matches(/^[A-Z][a-zA-Z]+$/, "Prvo slovo mora da bude veliko").min(3, "Ime mora da sadrzi najmanje 3 karaktera").required("Ime je obavezno polje"),
    Prezime: Yup.string().matches(/^[A-Z][a-zA-Z]+$/, "Prvo slovo mora da bude veliko").min(3, "Prezime mora da sadrzi najmanje 3 karaktera").required("Prezime je obavezno polje"),
    Email: Yup.string().email("Unesite ispravan email").required("Email je obavezan polje"),
    Password: Yup.string().min(4, "Šifra mora da sadrzi najmanje 4 karaktera").required("Sifra je obavezna polje"),
    PPassword: Yup.string().oneOf([Yup.ref('Password')], 'Šifre se ne podudaraju').required("Šifra je obavezna polje"),
  })

  const onSubmit = (data) => {

    axios.post("http://localhost:5000/register", data).then((response) => {
      if (response.data.messageErr) {
        alert(response.data.messageErr)
      } else {
        if (response.data.passwordErr) {
          alert(response.data.passwordErr);
        } else {
          alert(response.data.message);
          history("/login");
        }
      }
    });
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">Registracija</div>
        <div className='btnTip'>
          <button onClick={() => { setType("Korisnik") }}>Korisnik <FaUserTie /></button>
          <button onClick={() => { setType("Zaposleni") }}>Zaposleni <ImUserTie /></button>
          <button onClick={() => { setType("Admin") }}>Admin <RiAdminFill /></button>
        </div>

        {type === "Korisnik" ? (
          <>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              <Form>
                <div className='typeTitle'>{type} forma:</div>
                <div className="row">
                  <i className="fas fa-user"><FaUserTie /></i>
                  <Field autoComplete="off" id="inputCreatePost" name="Ime" placeholder="Ime" />
                  <ErrorMessage name="Ime" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><FaUserTie /></i>
                  <Field autoComplete="off" id="inputCreatePost" name="Prezime" placeholder="Prezime" />
                  <ErrorMessage name="Prezime" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><MdEmail /></i>
                  <Field autoComplete="off" id="inputCreatePost" name="Email" placeholder="Email" />
                  <ErrorMessage name="Email" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><BsFillTelephoneFill /></i>
                  <Field autoComplete="off" id="inputCreatePost" name="Kontakt" placeholder="Kontakt" />
                  <ErrorMessage name="Kontakt" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><GiModernCity /></i>
                  <Field autoComplete="off" id="inputCreatePost" name="Drzava" placeholder="Drzava" />
                  <ErrorMessage name="Drzava" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><FaCity /></i>
                  <Field autoComplete="off" id="inputCreatePost" name="Grad" placeholder="Grad" />
                  <ErrorMessage name="Grad" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><BsMailbox2 /></i>
                  <Field autoComplete="off" id="inputCreatePost" name="PostBroj" placeholder="Postanski broj" />
                  <ErrorMessage name="PostBroj" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><FaAddressCard /></i>
                  <Field autoComplete="off" id="inputCreatePost" name="Adresa" placeholder="Adresa" />
                  <ErrorMessage name="Adresa" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><RiLockPasswordLine /></i>
                  <Field autoComplete="off" type="password" id="inputCreatePost" name="Password" placeholder="Lozinka" />
                  <ErrorMessage name="Password" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><RiLockPasswordFill /></i>
                  <Field autoComplete="off" type="password" id="inputCreatePost" name="PPassword" placeholder="Ponovi lozinku" />
                  <ErrorMessage name="PPassword" component="span" />
                </div>
                <div className="row button">
                  <button type='submit' onClick={() => { setType("Korisnik") }}>Registruj se</button>
                </div>
              </Form>
            </Formik>
          </>
        ) : (type === "Zaposleni") ? (
          <>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchemaTwo}>
              <Form>
                <div className='typeTitle'>{type} forma:</div>
                <div className="row">
                  <i className="fas fa-user"><ImUserTie /></i>
                  <Field autoComplete="off" id="inputCreatePost" name="Ime" placeholder="Ime" />
                  <ErrorMessage name="Ime" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><ImUserTie /></i>
                  <Field autoComplete="off" id="inputCreatePost" name="Prezime" placeholder="Prezime" />
                  <ErrorMessage name="Prezime" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><MdEmail /></i>
                  <Field autoComplete="off" id="inputCreatePost" name="Email" placeholder="Email" />
                  <ErrorMessage name="Email" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><RiLockPasswordLine /></i>
                  <Field autoComplete="off" type="password" id="inputCreatePost" name="Password" placeholder="Lozinka" />
                  <ErrorMessage name="Password" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><RiLockPasswordFill /></i>
                  <Field autoComplete="off" type="password" id="inputCreatePost" name="PPassword" placeholder="Ponovi lozinku" />
                  <ErrorMessage name="PPassword" component="span" />
                </div>
                <div className="row button">
                  <button type='submit' onClick={() => { setType("Zaposleni") }}>Registruj se</button>
                </div>
              </Form>
            </Formik>
          </>
        ) : (type === "Admin") && (
          <>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchemaTwo}>
              <Form>
                <div className='typeTitle'>{type} forma:</div>
                <div className="row">
                  <i className="fas fa-user"><RiAdminFill /></i>
                  <Field autoComplete="off" id="inputCreatePost" name="Ime" placeholder="Ime" />
                  <ErrorMessage name="Ime" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><RiAdminFill /></i>
                  <Field autoComplete="off" id="inputCreatePost" name="Prezime" placeholder="Prezime" />
                  <ErrorMessage name="Prezime" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><MdEmail /></i>
                  <Field autoComplete="off" id="inputCreatePost" name="Email" placeholder="Email" />
                  <ErrorMessage name="Email" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><RiLockPasswordLine /></i>
                  <Field autoComplete="off" type="password" id="inputCreatePost" name="Password" placeholder="Lozinka" />
                  <ErrorMessage name="Password" component="span" />
                </div>
                <div className="row">
                  <i className="fas fa-lock"><RiLockPasswordFill /></i>
                  <Field autoComplete="off" type="password" id="inputCreatePost" name="PPassword" placeholder="Ponovi lozinku" />
                  <ErrorMessage name="PPassword" component="span" />
                </div>
                <div className="row button">
                  <button type='submit' onClick={() => { setType("Admin") }}>Registruj se</button>
                </div>
              </Form>
            </Formik>
          </>
        )}
      </div>
    </div>

  )
}

export default Registration