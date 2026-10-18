import Image from "next/image";
/** Study scene in a laptop frame; not a recording of a lesson. */
export function OnlineClassMockup() {
  return <figure className="online-class-mockup">
    <div className="online-class-laptop"><div className="online-class-camera" aria-hidden="true" /><div className="online-class-screen"><Image src="/images/foxstage/pratica-idioma.jpg" alt="Pessoa estudando com anotações diante de um notebook." fill sizes="(max-width: 767px) calc(100vw - 72px), 440px" /><div className="online-class-label">Inglês online ao vivo</div></div></div>
    <div className="online-class-base" aria-hidden="true" />
  </figure>;
}
