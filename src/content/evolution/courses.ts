import type { CourseId, CoursePageData } from "./types.ts";
export const coursePages: Record<CourseId, CoursePageData> = {
  "group": {
    "id": "group",
    "status": "published",
    "review": {
      "factsConfirmed": true,
      "copyApproved": true,
      "mediaApproved": true
    },
    "seo": {
      "title": "Curso de inglês online em grupo",
      "description": "Aulas de inglês online ao vivo em grupo, com conversação e situações do dia a dia. Conheça a Foxstage, do Rio de Janeiro para todo o Brasil.",
      "pathname": "/cursos/ingles-em-grupo"
    },
    "heading": "Inglês ao vivo. Em grupo.",
    "titleLines": [
      "Inglês ao vivo.",
      "Em grupo."
    ],
    "introduction": "Aprender com outras pessoas e colocar o inglês em uso. Nas aulas online ao vivo da Foxstage, a conversação faz parte do aprendizado.",
    "cta": "Conhecer aulas em grupo",
    "practicalFacts": [
      {
        "label": "Modalidade",
        "value": "Online ao vivo"
      },
      {
        "label": "Formato",
        "value": "Em grupo"
      },
      {
        "label": "Foco",
        "value": "Conversação e inglês do dia a dia"
      },
      {
        "label": "Atendimento",
        "value": "Todo o Brasil"
      }
    ],
    "image": {
      "src": "/images/foxstage/curso-ingles.jpg",
      "alt": "Pessoas conversando com caderno e notebook; fotografia ilustrativa de banco de imagens.",
      "credit": "Fotografia ilustrativa",
      "position": "center"
    },
    "sections": [
      {
        "id": "a-conversa-em-grupo",
        "title": "Uma conversa tem mais de uma voz.",
        "paragraphs": [
          "Estudar em grupo é participar com outras pessoas. A fala e a escuta se encontram: você tenta se expressar e acompanha o que o outro tem a dizer."
        ]
      }
    ],
    "faq": []
  },
  "individual": {
    "id": "individual",
    "status": "published",
    "review": {
      "factsConfirmed": true,
      "copyApproved": true,
      "mediaApproved": true
    },
    "seo": {
      "title": "Aulas individuais de inglês online",
      "description": "Conheça as aulas individuais de inglês da Foxstage, com ensino personalizado, conversação e situações reais. Atendimento online em todo o Brasil.",
      "pathname": "/cursos/ingles-individual"
    },
    "heading": "Seu inglês. Aula individual.",
    "titleLines": [
      "Seu inglês.",
      "Aula individual."
    ],
    "introduction": "Um formato individual, com ensino personalizado para você. Converse com a Foxstage sobre o inglês que quer usar e conheça a proposta das aulas.",
    "cta": "Conhecer aulas individuais",
    "practicalFacts": [
      {
        "label": "Modalidade",
        "value": "Online ao vivo"
      },
      {
        "label": "Formato",
        "value": "Individual"
      },
      {
        "label": "Ensino",
        "value": "Personalizado"
      },
      {
        "label": "Atendimento",
        "value": "Todo o Brasil"
      }
    ],
    "image": {
      "src": "/images/foxstage/hero-ingles.webp",
      "alt": "Duas pessoas fictícias conversando e estudando; imagem ilustrativa gerada por IA.",
      "credit": "Imagem ilustrativa gerada por IA",
      "position": "center"
    },
    "sections": [
      {
        "id": "seu-ponto-de-partida",
        "title": "O ponto de partida é o seu.",
        "paragraphs": [
          "Conte em que situações você gostaria de usar o inglês. Essa conversa é o começo para conhecer a proposta individual da Foxstage."
        ]
      },
      {
        "id": "ensino-individual",
        "title": "Um espaço para a sua voz.",
        "paragraphs": [
          "Nas aulas individuais, a conversa acontece entre você e o professor. O ensino é personalizado, com foco no inglês que você quer colocar em uso."
        ]
      }
    ],
    "faq": []
  }
};

// Editorial language examples, not a promised syllabus or student testimony.
export const groupPracticeExamples = [
  {
    "context": "Contar como foi seu dia",
    "english": "How was your day?",
    "portuguese": "Como foi o seu dia?"
  },
  {
    "context": "Pedir ajuda quando precisar",
    "english": "Could you help me, please?",
    "portuguese": "Você poderia me ajudar, por favor?"
  },
  {
    "context": "Continuar uma conversa",
    "english": "What do you think about it?",
    "portuguese": "O que você acha disso?"
  }
] as const;
export const individualObjectives = [
  {
    "id": "daily",
    "label": "Dia a dia",
    "title": "Participar das conversas.",
    "description": "Conte à escola em quais conversas e situações do cotidiano você gostaria de se expressar melhor.",
    "origin": "individualDaily"
  },
  {
    "id": "travel",
    "label": "Viagens",
    "title": "Levar o inglês com você.",
    "description": "Do primeiro pedido de informação a uma conversa no caminho: conte à Foxstage o que você quer conseguir dizer.",
    "origin": "individualTravel"
  },
  {
    "id": "work",
    "label": "Trabalho",
    "title": "Dizer o que você precisa.",
    "description": "Conte à escola em quais situações do seu trabalho o inglês faz falta. Conheça a proposta das aulas individuais.",
    "origin": "individualWork"
  }
] as const;
