(() => {
  const ECOSYSTEM = window.ECOSYSTEM;

  const $path = document.getElementById("path");
  const $btnReset = document.getElementById("btnReset");
  const $btnShowAll = document.getElementById("btnShowAll");
  const $btnZoomOut = document.getElementById("btnZoomOut");
  const $routeHint = document.getElementById("routeHint");

  const $popup = document.getElementById("popup");
  const $popupBackdrop = document.getElementById("popupBackdrop");
  const $popupClose = document.getElementById("popupClose");
  const $popupKicker = document.getElementById("popupKicker");
  const $popupTitle = document.getElementById("popupTitle");
  const $popupBody = document.getElementById("popupBody");

  // --- Elements
  const elements = [];
  for (const n of ECOSYSTEM.nodes){
    elements.push({ data: { id: n.id, label: n.label, type: n.type }});
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
    minZoom: 0.18,
    maxZoom: 2.2,
    selectionType: "single",
    style: [
      {
        selector: "node",
        style: {
          "shape": "round-rectangle",
          "label": "data(label)",
          "text-wrap": "wrap",
          "text-max-width": 170,
          "text-valign": "center",
          "text-halign": "center",
          "font-size": 14,
          "font-weight": 650,
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

      { selector: 'node[type="end"]', style: { "border-color": "rgba(20,20,20,0.70)", "border-width": 4 } },
      { selector: 'node[type="seed"]', style: { "border-color": "rgba(20,20,20,0.70)", "border-width": 4 } },
      { selector: 'node[type="secondary"]', style: { "background-color": "rgba(255,245,235,0.98)" } },
      { selector: 'node[type="terminal"]', style: {
          "background-color": "rgba(245,245,245,0.92)",
          "border-color": "rgba(40,40,40,0.35)"
      }},

      { selector: ".dim", style: { "opacity": 0.16 } },
      { selector: "edge.dim", style: { "opacity": 0.08 } },

      { selector: ".reveal", style: { "opacity": 1 } },
      { selector: "edge.reveal", style: { "opacity": 0.75 } },

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
      { selector: ".glow", style: { "border-color": "rgba(167,243,208,0.92)", "border-width": 5 } }
    ]
  });

  // --- Popup
  function escapeHtml(str){
    return String(str)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  function showPopup(nodeId){
    const d = ECOSYSTEM.descriptions[nodeId];
    if(!d){ hidePopup(); return; }

    $popupKicker.textContent = d.role || "";
    $popupTitle.textContent = d.name || "";
    $popupBody.innerHTML = `
      <div class="label">概要</div>
      <div class="desc">${escapeHtml(d.desc || "（情報なし）")}</div>
    `;

    $popup.hidden = false;
    $popupBackdrop.hidden = false;
    requestAnimationFrame(() => {
      $popup.classList.add("show");
      $popupBackdrop.classList.add("show");
    });
  }

  function hidePopup(){
    $popup.classList.remove("show");
    $popupBackdrop.classList.remove("show");
    setTimeout(() => {
      $popup.hidden = true;
      $popupBackdrop.hidden = true;
    }, 240);
  }

  $popupClose.addEventListener("click", hidePopup);
  $popupBackdrop.addEventListener("click", hidePopup);
  document.addEventListener("keydown", (e) => { if(e.key === "Escape") hidePopup(); });

  // --- State
  const state = {
    end: null,
    primary: null,
    secondary: null,
    mode: "start", // start | endSelected | primarySelected | chooseRoute | done
    routeOptions: null // { directToSeed:boolean, secondaries:[ids], terminal:boolean }
  };

  function byId(id){ return cy.getElementById(id); }
  function nodeType(id){ return byId(id).data("type"); }

  function resetVisual(){
    cy.elements().removeClass("reveal active glow");
    cy.nodes().addClass("dim");
    cy.edges().addClass("dim");

    // keep all End nodes lightly visible as entry points
    cy.nodes('[type="end"]').removeClass("dim").addClass("reveal").style("opacity", 0.55);

    // keep SEED as a faint anchor
    byId("seed").removeClass("dim").addClass("reveal").style("opacity", 0.20);

    // terminal stays very faint
    byId("end_only").removeClass("dim").addClass("reveal").style("opacity", 0.14);
  }

  function clearState(){
    state.end = null;
    state.primary = null;
    state.secondary = null;
    state.mode = "start";
    state.routeOptions = null;
    setRouteHint(null);
  }

  function setRouteHint(text){
    if(!text){
      $routeHint.hidden = True;
    }
  }

  function setRouteHint(text){
    if(!text){
      $routeHint.hidden = true;
      $routeHint.textContent = "";
      return;
    }
    $routeHint.hidden = false;
    $routeHint.textContent = text;
  }

  function labelOf(id){
    const n = ECOSYSTEM.nodes.find(x => x.id === id);
    return n ? n.label.replace(/\n/g, " ") : id;
  }

  function pill(label, isActive){
    const cls = isActive ? "pill active" : "pill";
    return `<div class="${cls}"><span class="pillDot"></span><span>${escapeHtml(label)}</span></div>`;
  }

  function renderPath(){
    $path.innerHTML = "";
    const parts = [];
    if(state.end) parts.push({ label: labelOf(state.end), active: true });
    if(state.primary) parts.push({ label: labelOf(state.primary), active: true });
    if(state.secondary) parts.push({ label: labelOf(state.secondary), active: true });

    if(state.mode === "done"){
      if(state.secondary){
        parts.push({ label: "シード・プランニング", active: true });
      }else if(state.primary){
        // could end at SEED or terminal depending on route
        const p = state.primary;
        const endsAtTerminal = state.routeOptions?.terminal === true;
        const endsAtSeed = state.routeOptions?.directToSeed === true && state.routeOptions?.secondaries?.length === 0;
        if(endsAtTerminal){
          parts.push({ label: "終了（Seed外）", active: true });
        }else if(endsAtSeed){
          parts.push({ label: "シード・プランニング", active: true });
        }
      }
    }else if(state.primary){
      parts.push({ label: "（経路選択）", active: false });
    }

    if(parts.length === 0){
      $path.innerHTML = pill("(Endを選択)", false);
      return;
    }
    for(const p of parts){ $path.insertAdjacentHTML("beforeend", pill(p.label, p.active)); }
  }

  function revealNodes(ids){
    for(const id of ids){
      const n = byId(id);
      n.removeClass("dim").addClass("reveal");
      n.animate({ style: { opacity: 1 } }, { duration: 220, easing: "ease-out" });
    }
  }

  function revealEdges(ids){
    for(const id of ids){
      const e = byId(id);
      e.removeClass("dim").addClass("reveal");
      e.animate({ style: { opacity: 0.75 } }, { duration: 220, easing: "ease-out" });
    }
  }

  function setActivePath(nodeIds, edgeIds){
    cy.elements().removeClass("active glow");
    for(const id of nodeIds){
      byId(id).addClass("active").removeClass("dim").addClass("reveal").style("opacity", 1);
    }
    for(const id of edgeIds){
      byId(id).addClass("active").removeClass("dim").addClass("reveal").style("opacity", 0.95);
    }
  }

  function outgoingEdges(fromId){
    return ECOSYSTEM.edges.filter(e => e.source === fromId);
  }

  function edgeId(from, to){
    const e = ECOSYSTEM.edges.find(x => x.source === from && x.target === to);
    return e ? e.id : null;
  }

  // --- Interaction
  function onSelectEnd(endId){
    clearState();
    state.end = endId;
    state.mode = "endSelected";

    resetVisual();

    // highlight selected end, keep other ends visible but dimmer
    cy.nodes('[type="end"]').style("opacity", 0.28).addClass("reveal");
    byId(endId).style("opacity", 1).addClass("active");

    // reveal primaries connected to this end
    const outs = outgoingEdges(endId);
    const primaries = outs.map(e => e.target).filter(t => nodeType(t) === "primary");
    const edgeIds = outs.filter(e => nodeType(e.target) === "primary").map(e => e.id);

    revealNodes(primaries);
    revealEdges(edgeIds);

    renderPath();
    setRouteHint("一次をクリックすると次の階層（直→SEED / 二次 / 終了）が展開します。");
  }

  function computePrimaryOptions(primaryId){
    const outs = outgoingEdges(primaryId);
    const secondaries = outs.map(e => e.target).filter(t => nodeType(t) === "secondary");
    const directToSeed = outs.some(e => e.target === "seed");
    const terminal = outs.some(e => e.target === "end_only");
    return { directToSeed, secondaries, terminal, outEdgeIds: outs.map(e => e.id) };
  }

  function onSelectPrimary(primaryId){
    if(!state.end){
      // if clicked without end, zoom out and ask to select end; but still allow setting end as closest via incoming end?
      resetVisual();
      setRouteHint("まず End をクリックしてください。");
      return;
    }

    state.primary = primaryId;
    state.secondary = null;
    state.mode = "primarySelected";
    state.routeOptions = computePrimaryOptions(primaryId);

    // ensure selected end + connected edge visible
    const eEnd = edgeId(state.end, primaryId);
    resetVisual();
    // keep selected end and its primaries visible
    onSelectEnd(state.end);
    // Now highlight primary
    revealNodes([primaryId, "seed", "end_only"]);
    if(eEnd) revealEdges([eEnd]);

    // reveal downstream options
    revealEdges(state.routeOptions.outEdgeIds);
    revealNodes(state.routeOptions.secondaries);

    // Decide if auto-finish:
    if(state.routeOptions.terminal && !state.routeOptions.directToSeed && state.routeOptions.secondaries.length === 0){
      state.mode = "done";
      const eTerm = edgeId(primaryId, "end_only");
      setActivePath([state.end, primaryId, "end_only"], [eEnd, eTerm].filter(Boolean));
      setRouteHint("このルートは Seed 外で終了です。");
    } else if(state.routeOptions.directToSeed && state.routeOptions.secondaries.length === 0){
      state.mode = "done";
      const eSeed = edgeId(primaryId, "seed");
      setActivePath([state.end, primaryId, "seed"], [eEnd, eSeed].filter(Boolean));
      byId("seed").addClass("glow");
      setRouteHint(null);
    } else if(state.routeOptions.directToSeed && state.routeOptions.secondaries.length > 0){
      state.mode = "chooseRoute";
      // highlight end->primary only; user chooses next
      setActivePath([state.end, primaryId], [eEnd].filter(Boolean));
      setRouteHint("分岐あり：『SEED（直）』をクリックで直行、または二次をクリックで経由ルートを確定。");
    } else {
      // secondaries only
      state.mode = "primarySelected";
      setActivePath([state.end, primaryId], [eEnd].filter(Boolean));
      setRouteHint("二次をクリックして経由ルートを確定してください。");
    }

    renderPath();
  }

  function onSelectSecondary(secondaryId){
    if(!state.end || !state.primary) return;

    state.secondary = secondaryId;
    state.mode = "done";

    const eEnd = edgeId(state.end, state.primary);
    const eP = edgeId(state.primary, secondaryId);
    const eS = edgeId(secondaryId, "seed");

    // Reveal final edge to seed
    revealNodes([secondaryId, "seed"]);
    if(eS) revealEdges([eS]);

    setActivePath([state.end, state.primary, secondaryId, "seed"], [eEnd, eP, eS].filter(Boolean));
    byId("seed").addClass("glow");
    setRouteHint(null);
    renderPath();
  }

  function onSelectSeedAsDirect(){
    if(!state.end || !state.primary) return;
    if(!state.routeOptions?.directToSeed) return;

    state.secondary = null;
    state.mode = "done";
    const eEnd = edgeId(state.end, state.primary);
    const eSeed = edgeId(state.primary, "seed");
    revealNodes(["seed"]);
    if(eSeed) revealEdges([eSeed]);
    setActivePath([state.end, state.primary, "seed"], [eEnd, eSeed].filter(Boolean));
    byId("seed").addClass("glow");
    setRouteHint(null);
    renderPath();
  }

  function showAll(){
    cy.elements().removeClass("dim").addClass("reveal");
    cy.nodes().style("opacity", 1);
    renderPath();
    setRouteHint("全体表示中です。Endをクリックすると段階表示に戻れます。");
  }

  // --- Events
  cy.on("tap", "node", (evt) => {
    const n = evt.target;
    const id = n.id();
    const type = n.data("type");

    // popup if available
    showPopup(id);

    // animate tiny emphasis
    n.animate({ style: { opacity: 1 } }, { duration: 160, easing: "ease-out" });

    if(type === "end"){ onSelectEnd(id); return; }
    if(type === "primary"){ onSelectPrimary(id); return; }
    if(type === "secondary"){ onSelectSecondary(id); return; }
    if(type === "seed"){
      // only meaningful when choosing route
      if(state.mode === "chooseRoute" || state.mode === "primarySelected"){
        onSelectSeedAsDirect();
      }
      return;
    }
  });

  cy.on("tap", (evt) => {
    if(evt.target === cy){
      clearState();
      resetVisual();
      renderPath();
      hidePopup();
    }
  });

  $btnReset.addEventListener("click", () => {
    clearState();
    resetVisual();
    renderPath();
    hidePopup();
  });

  $btnShowAll.addEventListener("click", () => { showAll(); });

  $btnZoomOut.addEventListener("click", () => {
    cy.fit(cy.elements(), 120);
  });

  // --- Init
  clearState();
  resetVisual();
  renderPath();

  setTimeout(() => {
    cy.fit(cy.elements(), 120);
  }, 60);
})();
