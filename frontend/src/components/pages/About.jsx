import { Container, Col, Row, Image } from "react-bootstrap";
import ProgramerImg from "../../image/AboutImg/programerImg.jpg";
import ManagementImg from "../../image/AboutImg/ManagementLeadership.jpg";
import CustomerSupportImg from "../../image/AboutImg/CustomerSupport.jpg";

function About() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center text-center bgImage py-5">
        <div>
          <h1 className="fw-bold">Rreth Nesh</h1>
          <p className="mx-auto text-light w-75">
            EatNow është një platformë moderne për porositje ushqimi online,
            krijuar për të sjellë shijen e restorantit direkt tek ju. Ne besojmë
            se ushqimi i mirë duhet të jetë i thjeshtë për t'u porositur dhe i
            shpejtë për t'u shijuar.
          </p>
        </div>
      </div>

      <Container className=" text-center  bg-light p-4" fluid>
        <h2 className="mb-3 p-4">Historia</h2>
        <p className="text-muted mx-auto w-75">
          EatNow u krijua me një vizion të qartë: të thjeshtojë mënyrën se si
          njerëzit porosisin ushqim, duke ofruar një eksperiencë digjitale të
          këndshme dhe të besueshme. Ekipi ynë është i përkushtuar të sjellë
          teknologji moderne dhe komoditet në çdo porosi.
        </p>

        <p className="text-muted mx-auto w-75 pb-5">
          Platforma jonë është projektuar për të qenë miqësore, elegante dhe e
          lehtë për t'u përdorur. Me vetëm disa klikime, ju mund të shfletoni
          menunë, të zgjidhni ushqimet e preferuara dhe t'i merrni shpejt në
          derën tuaj.
        </p>
      </Container>

      <Container className="my-5">
        <h2 className="text-center my-5 p-3">Pse të Zgjidhni Ne</h2>

        <Row className="text-center g-4">
          <Col xs={12} md={6}>
            <h5 className="text-danger">Përbërës të Freskët</h5>
            <p className="mx-auto w-75">
              Ne bashkëpunojmë me restorante që përdorin vetëm përbërës cilësorë
              dhe të freskët, për t'ju sjellë shijen më të mirë.
            </p>
          </Col>

          <Col xs={12} md={6}>
            <h5 className="text-danger">Eksperiencë Profesionale</h5>
            <p className="mx-auto w-75">
              Platforma jonë është ndërtuar me kujdes për t'ju ofruar një
              eksperiencë moderne dhe të thjeshtë në çdo porosi.
            </p>
          </Col>

          <Col xs={12} md={6}>
            <h5 className="text-danger">Dërgesë e Shpejtë</h5>
            <p className="mx-auto w-75">
              Porosit online me vetëm disa klikime dhe gëzo ushqimin tënd të
              preferuar në pak kohë.
            </p>
          </Col>

          <Col xs={12} md={6}>
            <h5 className="text-danger">Shërbim Miqësor</h5>
            <p className="mx-auto w-75">
              Ekipi ynë është gjithmonë i gatshëm të ofrojë mbështetje dhe të
              sigurojë një eksperiencë të këndshme për çdo klient.
            </p>
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <h2 className="text-center mb-4">Stafi Ynë</h2>
        <Row className="g-4">
          <Col xs={12} md={4}>
            <div className="p-4 h-100 text-center">
              <Image
                src={ProgramerImg}
                className="rounded-circle shadow-sm mb-3 aboutImg"
                width={150}
              />

              <h5 className="fw-bold text-danger my-3">Ekipi i Zhvillimit</h5>
              <p className="mx-auto w-75">
                Programuesit dhe dizajnerët tanë punojnë çdo ditë për ta bërë
                EatNow një platformë moderne, të thjeshtë dhe të besueshme për
                porositje ushqimi online.
              </p>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <div className="p-4 h-100  text-center">
              <Image
                src={ManagementImg}
                className="rounded-circle shadow-sm mb-3 aboutImg"
                width={150}
              />

              <h5 className="fw-bold text-danger my-3">Menaxhimi & Organizimi</h5>
              <p className="mx-auto w-75">
                Ekipi i menaxhimit kujdeset që çdo proces — nga porosia deri te
                dërgesa — të jetë i qartë dhe i organizuar.
              </p>
            </div>
          </Col>

          <Col xs={12} md={4}>
            <div className="p-4 h-100  text-center">
              <Image
                src={CustomerSupportImg}
                className="rounded-circle shadow-sm mb-3 aboutImg"
                width={150}
              />

              <h5 className="fw-bold text-danger my-3">Mbështetja e Klientit</h5>
              <p className="mx-auto w-75">
                Stafi ynë i mbështetjes është gjithmonë i gatshëm të ndihmojë
                përdoruesit, duke ofruar përgjigje miqësore dhe profesionale për
                çdo pyetje.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default About;
