const sections = [
  {
    id: 1,
    category: "burialtype",
    instruction: "Wähle eine Art der Beisetzung\n\n",
    multiplechoice: 0,
    setofchoices: [
      {
        id: 0,
        img: "",
        body: "",
        title: "Friedhof mit Urne",
        process: "",
      },
      {
        id: 1,
        img: "",
        body: "",
        title: "Friedhof mit Sarg",
        process: "",
      },
      {
        id: 2,
        img: "",
        body: "",
        title:
          "Friedhof mit Reerdigung (neues beschleunigtes Kompostierverfahren)",
        process: "",
      },
      {
        id: 3,
        img: "",
        body: "",
        title: "Nicht auf einem Friedhof (z.B. See, Wald, Feld)",
        process: "",
      },
    ],
  },
  {
    id: 2,
    category: "sizeofevent",
    instruction: "Mit wie vielen Teilnehmenden planst du?",
    multiplechoice: 1,
    setofchoices: [
      {
        id: 0,
        img: "",
        body: "",
        title: "Kleiner Kreis (max. 10 Teilnehmende)",
        process: "",
      },
      {
        id: 1,
        img: "",
        body: "",
        title: "Mittlere Größe (10 - 30 Teilnehmende)",
        process: "",
      },
      {
        id: 2,
        img: "",
        body: "",
        title: "Große Veranstaltung (30+ Teilnehmende)",
        process: "",
      },
    ],
  },
];
export default sections;
