import { WhatsAppLink } from "./WhatsAppLink";
import { individualObjectives } from "@/content/evolution/courses";

/** Native radio choices and CSS panels work before hydration and without JS. */
export function IndividualGoalChooser() {
  return <div className="individual-goal-chooser">
    <fieldset className="goal-options"><legend>Onde você quer usar o inglês?</legend><div>{individualObjectives.map((goal, i) => <label key={goal.id}><input type="radio" name="objetivo-individual" value={goal.id} defaultChecked={i === 0} aria-controls={`objetivo-${goal.id}`} /><span>{goal.label}</span></label>)}</div></fieldset>
    {individualObjectives.map(goal => <div className="goal-answer" data-goal={goal.id} id={`objetivo-${goal.id}`} key={goal.id}><h3>{goal.title}</h3><p>{goal.description}</p><WhatsAppLink origin={goal.origin}>Conversar sobre meu objetivo</WhatsAppLink></div>)}
    <p className="goal-help">Seu objetivo vai na primeira mensagem. Você pode editá-la no WhatsApp antes de enviar.</p>
  </div>;
}
