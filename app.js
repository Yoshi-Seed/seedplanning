(() => {
  const ECOSYSTEM = window.ECOSYSTEM;

  const $path = document.getElementById("path");
  const $btnReset = document.getElementById("btnReset");
  const $btnShowAll = document.getElementById("btnShowAll");

  // --- Build Cytoscape elements
  const elements = [];
  for (const n of ECOSYSTEM.nodes){
    elements.push({ data: { id: n.id, label: n.label, type: n.type, route: n.route || "" }});
  }
  for (const e of ECOSYSTEM.edges){
    elements.push({ data: { id: e.id, source: e.source, target: e.target }});
  }

  const cy = cytoscape({
    container: document.getElementById("cy"),
    elements,
    layout: {
      name: "dagre",
      rankDir: "LR",
      nodeSep: 55,
      rankSep: 110,
      edgeSep: 18
    },
    wheelSensitivity: 0.22,
    minZoom: 0.22,
    maxZoom: 2.2,
    selectionType: "single",
    style: [
      {
        selector: "node",
        style: {
          "shape": "round-rectangle",
          "label": "data(label)",
          "text-wrap": "wrap",
          "text-max-width": 150,
          "text-valign": "center",
          "text-halign": "center",
          "font-size": 14,
          "font-weight": 600,
          "color": "rgba(0,0,0,0.82)",
          "background-color": "rgba(255,255,255,0.94)",
          "border-width": 2,
          "border-color": "rgba(60,60,60,0.32)",
          "padding": 14,
          "width": "label",
          "height": "label",
          "transition-property": "opacity, border-color, border-width, background-color",
          "transition-duration": "260ms",
          "transition-timing-function": "cubic-bezier(.2,.8,.2,1)"
        }
      },
      {
        selector: "edge",
        style: {
          "curve-style": "bezier",
          "width": 3,
          "line-color": "rgba(110,110,110,0.58)",
          "target-arrow-shape": "triangle",
          "target-arrow-color": "rgba(110,110,110,0.58)",
          "arrow-scale": 1.1,
          "transition-property": "opacity, line-color, target-arrow-color, width",
          "transition-duration": "260ms",
          "transition-timing-function": "cubic-bezier(.2,.8,.2,1)"
        }
      },

      // Types
      { selector: 'node[type="end"]', style: {
          "border-color": "rgba(20,20,20,0.70)",
          "border-width": 4
      }},
      { selector: 'node[type="seed"]', style: {
          "border-color": "rgba(20,20,20,0.70)",
          "border-width": 4
      }},
      { selector: 'node[type="secondary"]', style: {
          "background-color": "rgba(255,245,235,0.98)"
      }},

      // Dim / Hidden / Revealed
      { selector: ".dim", style: { "opacity": 0.16 } },
      { selector: "edge.dim", style: { "opacity": 0.08 } },

      { selector: ".reveal", style: { "opacity": 1 } },
      { selector: "edge.reveal", style: { "opacity": 0.75 } },

      // Active / Focus
      { selector: ".active", style: {
          "border-color": "rgba(125,211,252,0.92)",
          "border-width": 5,
          "background-color": "rgba(220,248,255,0.98)"
      }},
      { selector: "edge.active", style: {
          "line-color": "rgba(125,211,252,0.82)",
          "target-arrow-color": "rgba(125,211,252,0.82)",
          "width": 5,
          "opacity": 0.95
      }},

      { selector: ".glow", style: {
          "border-color": "rgba(167,243,208,0.92)",
          "border-width": 5
      }}
    ]
  });

  // --- State / Helpers
  const state = {
    end: null,
    primary: null,
    secondary: null,
    mode: "start" // start | endSelected | primarySelected | done
  };

  function byId(id){ return cy.getElementById(id); }

  function resetVisual(keepEnd = true){
    cy.elements().removeClass("reveal active glow");
    cy.nodes().addClass("dim");
    cy.edges().addClass("dim");

    // Always keep these visible (but can be dimmed slightly if you want)
    if(keepEnd){
      byId("eli_lilly").removeClass("dim").addClass("reveal");
      // keep SEED faintly visible for ecosystem anchor
      byId("seed").removeClass("dim").addClass("reveal").addClass("dim"); // intentionally re-dim (light anchor)
      byId("seed").style("opacity", 0.24);
    }else{
      byId("seed").style("opacity", 1);
    }
  }

  function clearState(){
    state.end = null;
    state.primary = null;
    state.secondary = null;
    state.mode = "start";
  }

  function renderPath(){
    $path.innerHTML = "";
    const parts = [];
    if(state.end) parts.push({ label: labelOf(state.end), active: true });
    if(state.primary) parts.push({ label: labelOf(state.primary), active: true });
    if(state.secondary) parts.push({ label: labelOf(state.secondary), active: true });
    if(state.mode === "done") parts.push({ label: "シード・プランニング", active: true });
    else if(state.primary) parts.push({ label: "シード・プランニング", active: false });

    if(parts.length === 0){
      $path.innerHTML = pill("(未選択)", false);
      return;
    }

    for(const p of parts){
      $path.insertAdjacentHTML("beforeend", pill(p.label, p.active));
    }
  }

  function pill(label, isActive){
    const cls = isActive ? "pill active" : "pill";
    return `<div class="${cls}"><span class="pillDot"></span><span>${escapeHtml(label)}</span></div>`;
  }

  function escapeHtml(str){
    return String(str)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function labelOf(id){
    const n = ECOSYSTEM.nodes.find(x => x.id === id);
    return n ? n.label.replace(/\n/g, " ") : id;
  }

  function revealNodes(ids){
    for(const id of ids){
      const n = byId(id);
      n.removeClass("dim").addClass("reveal");
      // animate "pop" by briefly scaling through animate
      n.animate({ style: { opacity: 1 } }, { duration: 220, easing: "ease-out" });
    }
  }

  function revealEdges(edgeIds){
    for(const eid of edgeIds){
      const e = byId(eid);
      e.removeClass("dim").addClass("reveal");
      e.animate({ style: { opacity: 0.75 } }, { duration: 220, easing: "ease-out" });
    }
  }

  function setActivePath(pathNodeIds){
    cy.elements().removeClass("active glow");
    // keep revealed as-is; active highlights
    for(const id of pathNodeIds){
      byId(id).addClass("active").removeClass("dim").addClass("reveal");
      byId(id).style("opacity", 1);
    }
    // Always keep End highlighted if selected
    if(state.end) byId(state.end).addClass("active").style("opacity", 1);
    // keep seed glow when done
    if(state.mode === "done"){
      byId("seed").removeClass("dim").addClass("reveal glow").style("opacity", 1);
    }
  }

  // --- Logic (progressive reveal)
  function onSelectEnd(endId){
    clearState();
    state.end = endId;
    state.mode = "endSelected";

    resetVisual(true);
    byId(endId).addClass("active").style("opacity", 1);

    // reveal primaries connected to this end
    const primaries = ECOSYSTEM.nodes.filter(n => n.type === "primary" && n.end === endId).map(n => n.id);
    const edges = ECOSYSTEM.edges.filter(e => e.source === endId && primaries.includes(e.target)).map(e => e.id);

    revealNodes(primaries);
    revealEdges(edges);

    renderPath();
  }

  function onSelectPrimary(primaryId){
    if(!state.end){
      // if user clicked primary first, treat as: select end then primary
      onSelectEnd("eli_lilly");
    }
    state.primary = primaryId;
    state.secondary = null;

    const primary = ECOSYSTEM.nodes.find(n => n.id === primaryId);
    state.mode = "primarySelected";

    // keep current reveals; just highlight and reveal downstream
    revealNodes([primaryId, "seed"]);

    // edge end -> primary
    const edgeEnd = ECOSYSTEM.edges.find(e => e.source === state.end && e.target === primaryId);
    if(edgeEnd) revealEdges([edgeEnd.id]);

    // downstream
    if(primary && primary.route === "secondary"){
      const secs = ECOSYSTEM.nodes.filter(n => n.type === "secondary" && n.primary === primaryId).map(n => n.id);
      const e1 = ECOSYSTEM.edges.filter(e => e.source === primaryId && secs.includes(e.target)).map(e => e.id);

      revealNodes(secs);
      revealEdges(e1);

      // don't auto-complete; wait for secondary click
      setActivePath([state.end, primaryId]);
    }else{
      // direct to seed (complete)
      const edgeToSeed = ECOSYSTEM.edges.find(e => e.source === primaryId && e.target === "seed");
      if(edgeToSeed) revealEdges([edgeToSeed.id]);

      state.mode = "done";
      setActivePath([state.end, primaryId, "seed"]);
    }

    renderPath();
  }

  function onSelectSecondary(secondaryId){
    if(!state.end || !state.primary){
      // defensive: bring to consistent state
      onSelectEnd("eli_lilly");
    }
    state.secondary = secondaryId;
    state.mode = "done";

    // reveal secondary + edges to seed
    revealNodes([secondaryId, "seed"]);

    const ePrimary = ECOSYSTEM.edges.find(e => e.source === state.primary && e.target === secondaryId);
    const eSeed = ECOSYSTEM.edges.find(e => e.source === secondaryId && e.target === "seed");
    const eEnd = ECOSYSTEM.edges.find(e => e.source === state.end && e.target === state.primary);
    revealEdges([eEnd?.id, ePrimary?.id, eSeed?.id].filter(Boolean));

    setActivePath([state.end, state.primary, secondaryId, "seed"]);
    renderPath();
  }

  function showAll(){
    cy.elements().removeClass("dim");
    cy.elements().addClass("reveal");
    byId("seed").style("opacity", 1);
    renderPath();
  }

  // --- Event bindings
  cy.on("tap", "node", (evt) => {
    const n = evt.target;
    const type = n.data("type");
    const id = n.id();

    // "ふわっ"感のため、クリック直後に少しだけ強調
    n.animate({ style: { opacity: 1 } }, { duration: 160, easing: "ease-out" });

    if(type === "end"){
      onSelectEnd(id);
      return;
    }
    if(type === "primary"){
      onSelectPrimary(id);
      return;
    }
    if(type === "secondary"){
      // only allow secondary if current primary matches; otherwise treat as primary selection flow
      const sec = ECOSYSTEM.nodes.find(x => x.id === id);
      if(sec && sec.primary){
        if(!state.primary || state.primary !== sec.primary){
          onSelectPrimary(sec.primary);
        }
        onSelectSecondary(id);
      }
      return;
    }
    if(type === "seed"){
      // if user taps seed, just highlight if done
      if(state.mode === "done") setActivePath([state.end, state.primary, state.secondary, "seed"].filter(Boolean));
      return;
    }
  });

  cy.on("tap", (evt) => {
    if(evt.target === cy){
      // background click: de-select step but keep end visible
      clearState();
      resetVisual(true);
      renderPath();
    }
  });

  $btnReset.addEventListener("click", () => {
    clearState();
    resetVisual(true);
    renderPath();
  });

  $btnShowAll.addEventListener("click", () => {
    showAll();
  });

  // --- Init
  clearState();
  resetVisual(true);
  renderPath();

  // Center view smoothly
  setTimeout(() => {
    cy.fit(cy.elements(), 80);
  }, 50);
})();
