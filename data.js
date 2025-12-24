// Multi-End ecosystem + branching routes.
// You can add more End Clients later by adding nodes (type:end) and edges from them.

window.ECOSYSTEM = {
  descriptions: {
    // Existing example End
    "eli_lilly": {
      name: "Eli Lilly",
      role: "エンドクライアント",
      desc: "代謝・中枢神経。肥満症薬（Mounjaro）急成長に伴う生活実態・心理調査が急増 。"
    },

    // New agencies (your latest message)
    "hrw": {
      name: "HRW",
      role: "一次エージェンシー",
      desc: "行動科学チーム（HRW Shift）を擁し、バイアス分析など科学的なアプローチを提供 。"
    },
    "globaleyes": {
      name: "GlobalEyes",
      role: "二次エージェンシー",
      desc: "グローバルな実査を一元管理。自社オフィスを持たず検証済みパートナーを管理 。"
    },
    "holden": {
      name: "Holden",
      role: "二次エージェンシー",
      desc: "中国発のアジア全域をカバーする新興リサーチエージェンシー。シードとパートナー"
    }
  },

  nodes: [
    // End clients (multiple)
    { id: "eli_lilly", label: "Eli Lilly\n(End)", type: "end" },
    { id: "end_other", label: "Another End\n(End)", type: "end" },

    // Anchors / terminals
    { id: "seed", label: "シード・プランニング", type: "seed" },
    { id: "end_only", label: "終了\n(Seed外)", type: "terminal" },

    // Primaries / secondaries (shared across ends)
    { id: "tlg", label: "The Link Group\n(一次)", type: "primary" },
    { id: "escalent", label: "Escalent\n(一次)", type: "primary" },
    { id: "hall", label: "Hall & Partners\n(一次)", type: "primary" },
    { id: "galilio", label: "Galilio Research\n(一次)", type: "primary" },

    { id: "marketxcel", label: "MarketXcel\n(二次)", type: "secondary" },

    // New ones
    { id: "ipsos", label: "Ipsos\n(一次)", type: "primary" },
    { id: "adelphi", label: "Adelphi\n(一次)", type: "primary" },
    { id: "hrw", label: "HRW\n(一次)", type: "primary" },
    { id: "holden", label: "Holden\n(二次)", type: "secondary" },
    { id: "globaleyes", label: "GlobalEyes\n(二次)", type: "secondary" }
  ],

  // Edges define relationships; branching is just multiple edges from a node.
  edges: [
    // Eli Lilly ecosystem (example)
    { id: "e_lilly_tlg", source: "eli_lilly", target: "tlg" },
    { id: "e_tlg_seed", source: "tlg", target: "seed" },

    { id: "e_lilly_escalent", source: "eli_lilly", target: "escalent" },
    { id: "e_escalent_seed", source: "escalent", target: "seed" },

    { id: "e_lilly_hall", source: "eli_lilly", target: "hall" },
    { id: "e_hall_holden", source: "hall", target: "holden" },
    { id: "e_holden_seed", source: "holden", target: "seed" },

    { id: "e_lilly_galilio", source: "eli_lilly", target: "galilio" },
    { id: "e_galilio_marketxcel", source: "galilio", target: "marketxcel" },
    { id: "e_marketxcel_seed", source: "marketxcel", target: "seed" },

    // Patterns you specified (for end_other as demo End)
    // End → Ipsos → 終了
    { id: "e_other_ipsos", source: "end_other", target: "ipsos" },
    { id: "e_ipsos_endonly", source: "ipsos", target: "end_only" },

    // End → Hall → Holden → SEED
    { id: "e_other_hall", source: "end_other", target: "hall" },

    // End → Adelphi → Holden → SEED
    { id: "e_other_adelphi", source: "end_other", target: "adelphi" },
    { id: "e_adelphi_holden", source: "adelphi", target: "holden" },

    // End → HRW → SEED
    { id: "e_other_hrw", source: "end_other", target: "hrw" },
    { id: "e_hrw_seed", source: "hrw", target: "seed" },

    // End → HRW → Holden → SEED (branch from HRW)
    { id: "e_hrw_holden", source: "hrw", target: "holden" },

    // End → Adelphi → GlobalEyes → SEED (branch from Adelphi)
    { id: "e_adelphi_globaleyes", source: "adelphi", target: "globaleyes" },
    { id: "e_globaleyes_seed", source: "globaleyes", target: "seed" }
  ]
};
