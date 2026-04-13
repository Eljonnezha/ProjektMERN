import { Container, Col, Row, Image } from "react-bootstrap";
import ChefImg from "../image/AboutImg/Chef.jpg";
import ManagerImg from "../image/AboutImg/Manager.jpg";
import WaitersImg from "../image/AboutImg/Waiters.jpg";

function About() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center text-center bgImage py-5">
        <div>
          <h1 className="fw-bold">Rreth Nesh</h1>
          <p className="mx-auto text-light w-75">
            Njihuni me restorantin tonë dhe pasionin për ushqim të shkëlqyer.
            Restoranti ynë ofron ushqime të freskëta dhe të shijshme të
            përgatitura me përbërës cilësorë. Ne jemi të përkushtuar të ofrojmë
            një eksperiencë të këndshme për çdo klient që na viziton.
          </p>
        </div>
      </div>

      <Container className="my-5 text-center">
        <h2 className="mb-3 p-4">Historia</h2>
        <p className="text-muted mx-auto w-75">
          Restoranti ynë u krijua me një vizion të qartë: të sjellim një përvojë
          kulinare moderne ku çdo detaj është menduar për të kënaqur klientët
          tanë. Ekipi ynë përbëhet nga kuzhinierë të talentuar që përdorin
          përbërës të freskët dhe receta inovative.
        </p>

        <p className="text-muted mx-auto w-75">
          Ambienti i restorantit është projektuar për të krijuar ngrohtësi dhe
          elegancë, duke ofruar një atmosferë perfekte për të shijuar ushqimin
          me familjen dhe miqtë.
        </p>
      </Container>

      <Container className="my-5">
        <h2 className="text-center my-5 p-3">Pse të Zgjidhni Ne</h2>

        <Row className="text-center g-4">
          <Col xs={12} md={6}>
            <h5 className="text-danger">Përbërës të Freskët</h5>
            <p>Ne përdorim vetëm përbërës cilësorë dhe të freskët.</p>
          </Col>

          <Col xs={12} md={6}>
            <h5 className="text-danger">Kuzhinierë Profesionistë</h5>
            <p>Ekip kuzhinierësh me eksperiencë në gatim.</p>
          </Col>

          <Col xs={12} md={6}>
            <h5 className="text-danger">Dërgesë e Shpejtë</h5>
            <p>Porosit online dhe merr ushqimin shpejt.</p>
          </Col>

          <Col xs={12} md={6}>
            <h5 className="text-danger">Staf Miqësor</h5>
            <p>Stafi ynë është gjithmonë i gatshëm për t'ju shërbyer.</p>
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <h2 className="text-center mb-4">Our Staff</h2>
        <Row className="g-4">
          <Col xs={12} md={4}>
            <div className="p-4 bg-light rounded shadow h-100 text-center">
              <Image
                src={ChefImg}
                className="rounded-circle shadow-sm mb-3 aboutImg"
                width={300}
              />

              <h5 className="fw-bold text-danger">Chef Marko</h5>
              <p>Shef Kuzhine</p>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <div className="p-4 bg-light rounded shadow h-100 text-center">
              <Image
                src={ManagerImg}
                className="rounded-circle shadow-sm mb-3 aboutImg"
                width={300}
              />

              <h5 className="fw-bold text-danger">Anna Smith</h5>
              <p>Menaxhere</p>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <div className="p-4 bg-light rounded shadow h-100 text-center">
              <Image
                src={WaitersImg}
                className="rounded-circle shadow-sm mb-3 aboutImg"
                width={300}
              />

              <h5 className="fw-bold text-danger">Waiters</h5>
              <p>Stafi i shërbimit</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default About;
