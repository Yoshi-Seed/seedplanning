// Relationship data (edit here if you ever add more clients / agencies)
window.RELATIONSHIP_DATA = {
  endClients: [
    {
      id: "eli_lilly",
      name: "Eli Lilly",
      primaries: [
        { id: "tlg", name: "The Link Group", routeType: "direct_to_seed" },
        { id: "escalent", name: "Escalent", routeType: "direct_to_seed" },
        { id: "hall_partners", name: "Hall & Partners", routeType: "via_secondary", secondaries: [
          { id: "holden", name: "Holden" }
        ]},
        { id: "galilio", name: "Galilio Research", routeType: "via_secondary", secondaries: [
          { id: "marketxcel", name: "MarketXcel" }
        ]}
      ]
    }
  ],
  seed: { id: "seed_planning", name: "シード・プランニング" }
};
