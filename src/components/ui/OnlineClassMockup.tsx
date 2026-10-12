import Image from "next/image";
/** A clearly labeled illustration, never a claimed recording or school platform. */
export function OnlineClassMockup() {
  return <figure className="online-class-mockup">
    <div className="online-class-laptop"><div className="online-class-camera" aria-hidden="true" /><div className="online-class-screen"><Image src="/images/foxstage/pratica-idioma.jpg" alt="Pessoa estudando com anotações, em uma cena ilustrativa exibida no mockup de notebook." fill sizes="(max-width: 767px) calc(100vw - 72px), 440px" /><div className="online-class-label">Inglês online ao vivo</div></div></div>
    <div className="online-class-base" aria-hidden="true" />
    <figcaption>Mockup ilustrativo de estudo online.</figcaption>
  </figure>;
}
