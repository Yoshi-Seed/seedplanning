// Edit here if you add more ecosystems.
// Model: End Client -> Primary -> (Secondary?) -> SEED
window.ECOSYSTEM = {
  nodes: [
    { id: "eli_lilly", label: "Eli Lilly\n(End Client)", type: "end" },
    { id: "seed", label: "シード・プランニング", type: "seed" },

    { id: "tlg", label: "The Link Group\n(一次)", type: "primary", end: "eli_lilly", route: "direct" },
    { id: "escalent", label: "Escalent\n(一次)", type: "primary", end: "eli_lilly", route: "direct" },

    { id: "hall", label: "Hall & Partners\n(一次)", type: "primary", end: "eli_lilly", route: "secondary" },
    { id: "holden", label: "Holden\n(二次)", type: "secondary", primary: "hall" },

    { id: "galilio", label: "Galilio Research\n(一次)", type: "primary", end: "eli_lilly", route: "secondary" },
    { id: "marketxcel", label: "MarketXcel\n(二次)", type: "secondary", primary: "galilio" }
  ],
  edges: [
    { id: "e1", source: "eli_lilly", target: "tlg" },
    { id: "e2", source: "tlg", target: "seed" },

    { id: "e3", source: "eli_lilly", target: "escalent" },
    { id: "e4", source: "escalent", target: "seed" },

    { id: "e5", source: "eli_lilly", target: "hall" },
    { id: "e6", source: "hall", target: "holden" },
    { id: "e7", source: "holden", target: "seed" },

    { id: "e8", source: "eli_lilly", target: "galilio" },
    { id: "e9", source: "galilio", target: "marketxcel" },
    { id: "e10", source: "marketxcel", target: "seed" }
  ]
};
