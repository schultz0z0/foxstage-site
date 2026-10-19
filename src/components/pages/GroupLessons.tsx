import Image from "next/image";
import Link from "next/link";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { Icon } from "@/components/ui/Icon";
import { getVisibleAvailability, pageAvailability } from "@/content/evolution/availability";
import { groupPracticeExamples } from "@/content/evolution/courses";
import type { CoursePageData } from "@/content/evolution/types";

export function GroupLessons({ course }: { course: CoursePageData }) {
  const visible = getVisibleAvailability(pageAvailability, process.env);
  return <>
    <section className="section group-conversation page-first-section">
      <div className="container group-conversation-grid">
        <figure className="conversation-scene">
          <div className="conversation-photo"><Image src="/images/foxstage/comunicacao-oral.jpg" width={1200} height={800} sizes="(max-width: 767px) calc(100vw - 48px), 55vw" alt="Duas pessoas conversando diante de um notebook." /></div>
          <div className="conversation-example"><span>Uma pergunta abre a conversa</span><p lang="en">How was{" "}<br />your day?</p><span>Como foi o seu dia?</span></div>
        </figure>
        <div className="group-conversation-copy"><h2>{course.sections[0].title}</h2>{course.sections[0].paragraphs.map(p => <p className="body-copy" key={p}>{p}</p>)}<p className="group-note">O erro faz parte. A conversa continua.</p></div>
      </div>
    </section>
    <section className="section group-practice warm-surface">
      <div className="container group-practice-grid"><div><h2>O assunto<br />é a vida.</h2><p className="body-copy">Pequenas situações também pedem inglês. Veja exemplos de como começar uma conversa.</p></div>
        <div className="practice-examples">{groupPracticeExamples.map(example => <details key={example.context}><summary>{example.context}<span className="disclosure-chevron" aria-hidden="true" /></summary><div className="practice-example-answer"><p lang="en">{example.english}</p><p>{example.portuguese}</p></div></details>)}</div>
      </div>
    </section>
    <section className="section group-enquiry dark-surface"><div className="container group-enquiry-grid"><div><h2>Encontre sua turma.</h2><p className="body-copy">Consulte horários e valores das aulas em grupo. Conte à Foxstage o que você quer aprender.</p><WhatsAppLink origin="group">Consultar aulas em grupo</WhatsAppLink></div><div className="group-alternative"><p>Prefere estudar individualmente?</p>{visible.individual === "published" ? <Link href="/cursos/ingles-individual" className="text-link">Conhecer o formato individual<Icon name="arrow" /></Link> : <WhatsAppLink origin="individual" className="text-link">Conversar sobre o individual</WhatsAppLink>}</div></div></section>
  </>;
}
