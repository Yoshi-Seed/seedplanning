(() => {
  const ECOSYSTEM = window.ECOSYSTEM;

  const $path = document.getElementById("path");
  const $btnReset = document.getElementById("btnReset");
  const $btnShowAll = document.getElementById("btnShowAll");

  const $popup = document.getElementById("popup");
  const $popupBackdrop = document.getElementById("popupBackdrop");
  const $popupClose = document.getElementById("popupClose");
  const $popupKicker = document.getElementById("popupKicker");
  const $popupTitle = document.getElementById("popupTitle");
  const $popupBody = document.getElementById("popupBody");

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

      // Dim / Revealed
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

      { selector: ".glow", style: { "border-color": "rgba(167,243,208,0.92)", "border-width": 5 } }
    ]
  });

  // --- Popup
  function showPopup(nodeId){
    const d = ECOSYSTEM.descriptions[nodeId];
    if(!d){
      hidePopup();
      return;
    }
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
    }, 220);
  }

  function escapeHtml(str){
    return String(str)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  $popupClose.addEventListener("click", hidePopup);
  $popupBackdrop.addEventListener("click", hidePopup);
  document.addEventListener("keydown", (e) => { if(e.key === "Escape") hidePopup(); });

  // --- State / Helpers
  const state = { end: null, primary: null, secondary: null, mode: "start" };
  function byId(id){ return cy.getElementById(id); }

  function resetVisual(keepEnd = true){
    cy.elements().removeClass("reveal active glow");
    cy.nodes().addClass("dim");
    cy.edges().addClass("dim");

    if(keepEnd){
      byId("eli_lilly").removeClass("dim").addClass("reveal");
      byId("seed").removeClass("dim").addClass("reveal").addClass("dim");
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
    for(const p of parts){ $path.insertAdjacentHTML("beforeend", pill(p.label, p.active)); }
  }

  function pill(label, isActive){
    const cls = isActive ? "pill active" : "pill";
    return `<div class="${cls}"><span class="pillDot"></span><span>${escapeHtml(label)}</span></div>`;
  }

  function labelOf(id){
    const n = ECOSYSTEM.nodes.find(x => x.id === id);
    return n ? n.label.replace(/\n/g, " ") : id;
  }

  function revealNodes(ids){
    for(const id of ids){
      const n = byId(id);
      n.removeClass("dim").addClass("reveal");
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
    for(const id of pathNodeIds){
      byId(id).addClass("active").removeClass("dim").addClass("reveal");
      byId(id).style("opacity", 1);
    }
    if(state.end) byId(state.end).addClass("active").style("opacity", 1);
    if(state.mode === "done"){
      byId("seed").removeClass("dim").addClass("reveal glow").style("opacity", 1);
    }
  }

  function onSelectEnd(endId){
    clearState();
    state.end = endId;
    state.mode = "endSelected";

    resetVisual(true);
    byId(endId).addClass("active").style("opacity", 1);

    const primaries = ECOSYSTEM.nodes.filter(n => n.type === "primary" && n.end === endId).map(n => n.id);
    const edges = ECOSYSTEM.edges.filter(e => e.source === endId && primaries.includes(e.target)).map(e => e.id);

    revealNodes(primaries);
    revealEdges(edges);

    renderPath();
  }

  function onSelectPrimary(primaryId){
    if(!state.end){ onSelectEnd("eli_lilly"); }
    state.primary = primaryId;
    state.secondary = null;
    state.mode = "primarySelected";

    const primary = ECOSYSTEM.nodes.find(n => n.id === primaryId);

    revealNodes([primaryId, "seed"]);
    const edgeEnd = ECOSYSTEM.edges.find(e => e.source === state.end && e.target === primaryId);
    if(edgeEnd) revealEdges([edgeEnd.id]);

    if(primary && primary.route === "secondary"){
      const secs = ECOSYSTEM.nodes.filter(n => n.type === "secondary" && n.primary === primaryId).map(n => n.id);
      const e1 = ECOSYSTEM.edges.filter(e => e.source === primaryId && secs.includes(e.target)).map(e => e.id);

      revealNodes(secs);
      revealEdges(e1);
      setActivePath([state.end, primaryId]);
    }else{
      const edgeToSeed = ECOSYSTEM.edges.find(e => e.source === primaryId && e.target === "seed");
      if(edgeToSeed) revealEdges([edgeToSeed.id]);

      state.mode = "done";
      setActivePath([state.end, primaryId, "seed"]);
    }

    renderPath();
  }

  function onSelectSecondary(secondaryId){
    if(!state.end || !state.primary){ onSelectEnd("eli_lilly"); }
    state.secondary = secondaryId;
    state.mode = "done";

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

  // --- Events
  cy.on("tap", "node", (evt) => {
    const n = evt.target;
    const type = n.data("type");
    const id = n.id();

    // Popup (only for nodes with descriptions)
    showPopup(id);

    n.animate({ style: { opacity: 1 } }, { duration: 160, easing: "ease-out" });

    if(type === "end"){ onSelectEnd(id); return; }
    if(type === "primary"){ onSelectPrimary(id); return; }
    if(type === "secondary"){
      const sec = ECOSYSTEM.nodes.find(x => x.id === id);
      if(sec && sec.primary){
        if(!state.primary || state.primary !== sec.primary){
          onSelectPrimary(sec.primary);
        }
        onSelectSecondary(id);
      }
      return;
    }
  });

  cy.on("tap", (evt) => {
    if(evt.target === cy){
      clearState();
      resetVisual(true);
      renderPath();
      hidePopup();
    }
  });

  $btnReset.addEventListener("click", () => {
    clearState();
    resetVisual(true);
    renderPath();
    hidePopup();
  });

  $btnShowAll.addEventListener("click", () => { showAll(); });

  // --- Init
  clearState();
  resetVisual(true);
  renderPath();
  setTimeout(() => { cy.fit(cy.elements(), 80); }, 50);
})();
