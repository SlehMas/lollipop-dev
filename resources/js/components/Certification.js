import React, { useEffect, useState } from 'react'
import certificationService from '../services/certifications.service'

const Certification = (props) => {

  const [certificat, setCertificat] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    certificationService.getById(props.match.params.id).then (res =>
      setCertificat(res)  
    ).catch(err => setCertificat({}))
    .finally(() => setLoaded(true))
  }, [])


  return loaded ? Object.keys(certificat).length ? <div className="Certification container">
  <div className="header">
    <div className="title">
      <h1>Certificat</h1>
      <h1 className="mb-0">de réussite</h1>
    </div>
    <img src="../../assets/lollipop.svg" width="150"></img>
  </div>
  <div className="body">
    <h1 className="mb-4 name">{certificat.nom}</h1>
    <p>a validé(e) et obtenu le certificat</p>
    <p className="cert-name pb-5">{certificat.certificat}</p>
    <div className="body_footer mt-5">
      <p className="level">{certificat.niveau}</p>
      <p className="date">
        <span className="sep"></span>
        Le {certificat.date_obtention}
      </p>
    </div>
  </div>
  <div className="footer">
    <div>
      <img src="../../assets/signature.jpg" alt="signature" className="img-fluid"/>
      <p>Encadré par:</p>
      <p>Mme. Nouha Jaafar</p>
    </div>
    <div>
      <p style={{fontSize: '2em'}}>Lollipop Training</p>
      <p>Centre de formation agrée par l'état Tunisien</p>
      <p>sous le numéro d'enseignement 19 193 23</p>
    </div>
    <div>
      <img src="../../assets/seal.jpg" alt="tompon" className="img-fluid"/>
      <p>Abdelhafidh Jaafar</p>
      <p>Gérant de Lollipop</p>
    </div>
  </div>
  <div style={{maxWidth: "175px", margin: "auto", marginTop: "30px"}}>
    <a href="/blog/ajouter_certificat_dans_linkedin" className="btn btn-lollipop-prim" target="_blank">
      Ajouter dans LinkedIn
    </a>
  </div>
</div> : <div className="m-5 text-center">
  <h2>
    Certificat introuvable
  </h2>
  <a href="/" className="btn btn-lollipop-prim">
    Comment obtenir un certificat?
  </a>
</div>
:
<div></div>
}

export default Certification