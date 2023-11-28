import React, { useContext, useState } from 'react'
import mereImg from "./imgMere/mere.png"
import meter from "./imgMere/meter.png"
import vrat from "./imgMere/neck.png"
import grudi from "./imgMere/breasts.png"
import struk from "./imgMere/waist.png"
import kukovi from "./imgMere/hips.png"
import napred from "./imgMere/frontSide.png"
import nazad from "./imgMere/backSide.jpg"
import ramena from "./imgMere/shoulders.png"
import rukavi from "./imgMere/sleeves.png"
import nadlaktice from "./imgMere/upperArm.png"
import zglobovi from "./imgMere/rightWrist.png"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import { createShirtContext } from '../../helpers/AuthContext';

export const Meter = () => {

    let { id } = useParams();

    const history = useNavigate();

    const { material, shirt, nameMaterial, measureText, backText, tiedText, kragenText, sleeveText, sleeve10Text,
        pocketText, colorButton, colorHoles, epoleteText, umetakText, priceMaterial } = useContext(createShirtContext);

    const AllShirtDetails = {
        Material: material,
        Shirt: shirt,
        MaterialName: nameMaterial,
        Measure: measureText,
        Back: backText,
        Tied: tiedText,
        Kragen: kragenText,
        Sleeve: sleeveText,
        Sleeve1: sleeve10Text,
        Pocket: pocketText,
        ColorButton: colorButton,
        ColorHoles: colorHoles,
        Epolete: epoleteText,
        AddInsert: umetakText,
        Size: "Meter",
        Price: priceMaterial,
    }

    const [img, setImg] = useState(vrat);

    const [value, setValue] = useState("");

    const [vratCM, setVratCM] = useState("");
    const [grudiCM, setGrudiCM] = useState("");
    const [strukCM, setStrukCM] = useState("");
    const [kukoviCM, setKukoviCM] = useState("");
    const [napredCM, setNapredCM] = useState("");
    const [nazadCM, setNazadCM] = useState("");
    const [ramenaCM, setRamenaCM] = useState("");
    const [rukaviCM, setRukaviCM] = useState("");
    const [nadlakticeCM, setNadlakticeCM] = useState("");
    const [zgloboviCM, setZgloboviCM] = useState("");

    const [errorVratCM, setErrorVratCM] = useState("");
    const [errorGrudiCM, setErrorGrudiCM] = useState("");
    const [errorStrukCM, setErrorStrukCM] = useState("");
    const [errorKukoviCM, setErrorKukoviCM] = useState("");
    const [errorNapredCM, setErrorNapredCM] = useState("");
    const [errorNazadCM, setErrorNazadCM] = useState("");
    const [errorRamenaCM, setErrorRamenaCM] = useState("");
    const [errorRukaviCM, setErrorRukaviCM] = useState("");
    const [errorNadlakticeCM, setErrorNadlakticeCM] = useState("");
    const [errorZgloboviCM, setErrorZgloboviCM] = useState("");


    const InsertSize = () => {

        const userConfirmation = window.confirm("Da li ste sigurni?");

        if (userConfirmation === true) {

            axios.post(`http://localhost:5002/createshirt/${id}`, AllShirtDetails).then((response) => {

                console.log(response.data.insertId);

                axios.post(`http://localhost:5002/meter/${id}`, {
                    idShirt: response.data.insertId, neck: vratCM, breasts: grudiCM, waist: strukCM, hips: kukoviCM,
                    fontSize: napredCM, backSide: nazadCM, shoulders: ramenaCM,
                    sleeves: rukaviCM, upperArm: nadlakticeCM, rightWrist: zgloboviCM
                }
                ).then((response) => {
                    alert("Uspešno ste kreirali svoju košulju!");
                    history(`/basket/${id}`);
                })
            })
        }

    }

    return (
        <div className='mereTelaContainer'>
            <div className='MereTelaInfo'>
                <div className='left'>
                    <img src={mereImg} alt="mere" />
                    <ol>
                        <li onClick={() => { setImg(vrat); setValue("") }}>Vrat: <p>{vratCM} {vratCM !== "" && (<>cm</>)}</p></li>
                        <li onClick={() => { setImg(grudi); setValue("") }}>Grudi: <p>{grudiCM} {grudiCM !== "" && (<>cm</>)}</p></li>
                        <li onClick={() => { setImg(struk); setValue("") }}>Struk: <p>{strukCM} {strukCM !== "" && (<>cm</>)}</p></li>
                        <li onClick={() => { setImg(kukovi); setValue("") }}>Kukovi: <p>{kukoviCM} {kukoviCM !== "" && (<>cm</>)}</p></li>
                        <li onClick={() => { setImg(napred); setValue("") }}>Duzina napred: <p>{napredCM} {napredCM !== "" && (<>cm</>)}</p></li>
                        <li onClick={() => { setImg(nazad); setValue("") }}>Duzina nazad: <p>{nazadCM} {nazadCM !== "" && (<>cm</>)}</p></li>
                        <li onClick={() => { setImg(ramena); setValue("") }}>Ramena: <p>{ramenaCM} {ramenaCM !== "" && (<>cm</>)}</p></li>
                        <li onClick={() => { setImg(rukavi); setValue("") }}>Rukavi: <p>{rukaviCM} {rukaviCM !== "" && (<>cm</>)}</p></li>
                        <li onClick={() => { setImg(nadlaktice); setValue("") }}>Nadlaktica: <p>{nadlakticeCM} {nadlakticeCM !== "" && (<>cm</>)}</p></li>
                        <li onClick={() => { setImg(zglobovi); setValue("") }}>Zglobovi: <p>{zgloboviCM} {zgloboviCM !== "" && (<>cm</>)}</p></li>
                    </ol>
                    {(vratCM !== "" && grudiCM !== "" && strukCM !== "" && kukoviCM !== "" && napredCM !== "" && nazadCM !== "" && ramenaCM !== "" && rukaviCM !== "" && nadlakticeCM !== "" && zgloboviCM !== "") && (
                        <button className='button' onClick={() => { InsertSize() }}>Potvrdi</button>
                    )}

                </div>
                <div className='right'>
                    <h3>MERE TELA</h3>
                    <img src={img} alt='vrat' />
                    <div className='bottom'>

                        {img === vrat ? (
                            <>

                                <h3>Vrat:</h3>
                                <p className='errorMere'>{errorVratCM}</p>
                                <div className='inputCM'><input type="number" value={value}
                                    onChange={(event) => {
                                        if (event.target.value.length <= 4) { setValue(event.target.value) }
                                        if (event.target.value < 37 || event.target.value > 49) { setErrorVratCM("Odredjena granica za Vrat bila bi 37cm-49cm") }
                                        else { setErrorVratCM("") }
                                    }} /><p>cm</p></div>
                                <button onClick={() => { setVratCM(value); setImg(grudi); setValue("") }}>Potvrdi</button>
                                <p>Obavijte metar oko vrata, izmerite najširi obim ispod Adamove jabučice.</p>
                            </>
                        ) : img === grudi ? (
                            <>
                                <h3>Grudi:</h3>
                                <p className='errorMere'>{errorGrudiCM}</p>
                                <div className='inputCM'><input type="number" value={value}
                                    onChange={(event) => {
                                        if (event.target.value.length <= 4) { setValue(event.target.value) }
                                        if (event.target.value < 92 || event.target.value > 148) { setErrorGrudiCM("Odredjena granica za Grudi bila bi 92cm-148cm") }
                                        else { setErrorGrudiCM("") }
                                    }} /><p>cm</p></div>
                                <button onClick={() => { setGrudiCM(value); setImg(struk); setValue("") }}>Potvrdi</button>
                                <p>Izmerite obim na najširem delu grudi, prilikom merenja blago udahnite vazduh.</p>
                            </>
                        ) : img === struk ? (
                            <>
                                <h3>Struk:</h3>
                                <p className='errorMere'>{errorStrukCM}</p>
                                <div className='inputCM'><input type="number" value={value}
                                    onChange={(event) => {
                                        if (event.target.value.length <= 4) { setValue(event.target.value) }
                                        if (event.target.value < 76 || event.target.value > 137) { setErrorStrukCM("Odredjena granica za Struka bila bi 76cm-137cm") }
                                        else { setErrorStrukCM("") }
                                    }} /><p>cm</p></div>
                                <button onClick={() => { setStrukCM(value); setImg(kukovi); setValue("") }}>Potvrdi</button>
                                <p>Stanite opušteno, bez uvlačenja stomaka izmerite obim struka u visini pupka na najširem delu</p>
                            </>
                        ) : img === kukovi ? (
                            <>
                                <h3>Kukovi:</h3>
                                <p className='errorMere'>{errorKukoviCM}</p>
                                <div className='inputCM'><input type="number" value={value}
                                    onChange={(event) => {
                                        if (event.target.value.length <= 4) { setValue(event.target.value) }
                                        if (event.target.value < 95 || event.target.value > 125) { setErrorKukoviCM("Odredjena granica za Kukovi bila bi 95cm-125cm") }
                                        else { setErrorKukoviCM("") }
                                    }} /><p>cm</p></div>
                                <button onClick={() => { setKukoviCM(value); setImg(napred); setValue("") }}>Potvrdi</button>
                                <p>Stanite uspravno, izmerite obim kukova ispod pojasa do najšireg dela. Zabeležite obim kukova na najširem mestu.</p>
                            </>
                        ) : img === napred ? (
                            <>
                                <h3>Napred:</h3>
                                <p className='errorMere'>{errorNapredCM}</p>
                                <div className='inputCM'><input type="number" value={value}
                                    onChange={(event) => {
                                        if (event.target.value.length <= 4) { setValue(event.target.value) }
                                        if (event.target.value < 75 || event.target.value > 89) { setErrorNapredCM("Odredjena granica za duzinu Napred bila bi 75cm-89cm") }
                                        else { setErrorNapredCM("") }
                                    }} /><p>cm</p></div>
                                <button onClick={() => { setNapredCM(value); setImg(nazad); setValue("") }}>Potvrdi</button>
                                <p>Prislonite jedan kraj metra na šav na ramenu pored kragne i pustite da slobodno pada preko grudi. Upišite željenu dužinu košulje.</p>
                            </>
                        ) : img === nazad ? (
                            <>
                                <h3>Nazad:</h3>
                                <p className='errorMere'>{errorNazadCM}</p>
                                <div className='inputCM'><input type="number" value={value}
                                    onChange={(event) => {
                                        if (event.target.value.length <= 4) { setValue(event.target.value) }
                                        if (event.target.value < 82 || event.target.value > 96) { setErrorNazadCM("Odredjena granica za duzinu Nazad bila bi 82cm-96cm") }
                                        else { setErrorNazadCM("") }
                                    }} /><p>cm</p></div>
                                <button onClick={() => { setNazadCM(value); setImg(ramena); setValue("") }}>Potvrdi</button>
                                <p>Dužina leđne strane košulje se uzima postavljanjem vrha santimetra na donju ivicu okovratnika na sredini ledja, tako da njegov kraj slobodno pada niz kičmeni stub. Upišite željenu dužinu košulje.</p>
                            </>
                        ) : img === ramena ? (
                            <>
                                <h3>Ramena:</h3>
                                <p className='errorMere'>{errorRamenaCM}</p>
                                <div className='inputCM'><input type="number" value={value}
                                    onChange={(event) => {
                                        if (event.target.value.length <= 4) { setValue(event.target.value) }
                                        if (event.target.value < 45 || event.target.value > 58) { setErrorRamenaCM("Odredjena granica za Ramena bila bi 45cm-58cm") }
                                        else { setErrorRamenaCM("") }
                                    }} /><p>cm</p></div>
                                <button onClick={() => { setRamenaCM(value); setImg(rukavi); setValue("") }}>Potvrdi</button>
                                <p>Stanite uspravno sa rukama spuštenim uz telo, izmerite širinu ramena od ramene kosti levog ramena do ramene kosti desnog ramena, koja se nalazi otprilike 1cm iznad vrha ramena, prateći najširu liniju ramenog pojasa preko vrata.</p>
                            </>
                        ) : img === rukavi ? (
                            <>
                                <h3>Rukavi:</h3>
                                <p className='errorMere'>{errorRukaviCM}</p>
                                <div className='inputCM'><input type="number" value={value}
                                    onChange={(event) => {
                                        if (event.target.value.length <= 4) { setValue(event.target.value) }
                                        if (event.target.value < 63 || event.target.value > 76) { setErrorRukaviCM("Odredjena granica za Rukave bila bi 63cm-76cm") }
                                        else { setErrorRukaviCM("") }
                                    }} /><p>cm</p></div>
                                <button onClick={() => { setRukaviCM(value); setImg(nadlaktice); setValue("") }}>Potvrdi</button>
                                <p>Dužinu rukava izmerite od vrha ramena, tj. od tačke na kojoj ste merili širinu ramena, preko savijenog lakta, do zgloba na šaci.</p>
                            </>
                        ) : img === nadlaktice ? (
                            <>
                                <h3>Nadlaktica:</h3>
                                <p className='errorMere'>{errorNadlakticeCM}</p>
                                <div className='inputCM'><input type="number" value={value}
                                    onChange={(event) => {
                                        if (event.target.value.length <= 4) { setValue(event.target.value) }
                                        if (event.target.value < 28 || event.target.value > 35) { setErrorNadlakticeCM("Odredjena granica za Nadlaktice bila bi 28cm-35cm") }
                                        else { setErrorNadlakticeCM("") }
                                    }} /><p>cm</p></div>
                                <button onClick={() => { setNadlakticeCM(value); setImg(zglobovi); setValue("") }}>Potvrdi</button>
                                <p>Na ispruženoj i opuštenoj ruci izmerite obim najšireg dela nadlaktice.</p>
                            </>
                        ) : img === zglobovi && (
                            <>
                                <h3>Zglobovi:</h3>
                                <p className='errorMere'>{errorZgloboviCM}</p>
                                <div className='inputCM'><input type="number" value={value}
                                    onChange={(event) => {
                                        if (event.target.value.length <= 4) { setValue(event.target.value) }
                                        if (event.target.value < 20 || event.target.value > 27) { setErrorZgloboviCM("Odredjena granica za Zglobove bila bi 20cm-27cm") }
                                        else { setErrorZgloboviCM("") }
                                    }} /><p>cm</p></div>
                                <button onClick={() => { setZgloboviCM(value); setValue("") }}>Potvrdi</button>
                                <p>*Mera se uzima obavijanjem metra oko ručnog zgloba.</p>
                                <p>*U slučaju da nosite masivan ručni sat i želite da manžetna na toj ruci bude šira u odnosu na drugu ruku, obimu zgloba dodajte 1-1.5cm.</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <img src={meter} alt='metar' className='meterIMg' />
        </div>
    )
}
