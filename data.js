// Ecosystem graph + descriptions (for popups)
window.ECOSYSTEM = {
  descriptions: {
    "eli_lilly": {
      name: "Eli Lilly",
      role: "エンドクライアント",
      desc: "代謝・中枢神経。肥満症薬（Mounjaro）急成長に伴う生活実態・心理調査が急増 。"
    },
    "hall": {
      name: "Hall & Partners",
      role: "一次エージェンシー",
      desc: "ブランド・コミュニケーション戦略に特化。定量・定性を融合したモデルを展開 。"
    },
    "tlg": {
      name: "The Link Group",
      role: "一次エージェンシー",
      desc: "戦略的ブティック。定性調査とジャーニーマッピングに特化し、深い心理的洞察を提供 。"
    },
    "escalent": {
      name: "Escalent",
      role: "一次エージェンシー",
      desc: "産業特化型の専門知識を持つミドル・ティア企業。大規模パネルと戦略的価値を両立 。"
    },
    "marketxcel": {
      name: "MarketXcel",
      role: "二次エージェンシー",
      desc: "インド拠点のデータスペシャリスト。アジア全域へのアクセスと安価なデータ処理（KPO）を提供 。"
    }
  },
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
