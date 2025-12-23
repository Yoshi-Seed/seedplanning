(() => {
  const DATA = window.RELATIONSHIP_DATA;
  const $choices = document.getElementById("choices");
  const $stepTitle = document.getElementById("stepTitle");
  const $stepHint = document.getElementById("stepHint");
  const $note = document.getElementById("note");
  const $path = document.getElementById("path");
  const $preview = document.getElementById("preview");

  const $btnBack = document.getElementById("btnBack");
  const $btnReset = document.getElementById("btnReset");
  const $btnCopy = document.getElementById("btnCopy");
  const $copied = document.getElementById("copied");

  const state = {
    endClient: null,
    primary: null,
    secondary: null
  };

  const steps = ["endClient", "primary", "secondaryOrSeed", "done"];

  function currentStep(){
    if(!state.endClient) return "endClient";
    if(!state.primary) return "primary";
    // primary chosen:
    if(state.primary.routeType === "via_secondary" && !state.secondary) return "secondaryOrSeed";
    return "done";
  }

  function setNote(msg){
    $note.textContent = msg || "";
  }

  function setCopied(msg){
    $copied.textContent = msg || "";
    if(msg){
      setTimeout(() => { if($copied.textContent === msg) $copied.textContent=""; }, 1600);
    }
  }

  function selectedPathText(){
    const parts = [];
    if(state.endClient) parts.push(state.endClient.name);
    if(state.primary) parts.push(state.primary.name);
    if(state.primary){
      if(state.primary.routeType === "via_secondary"){
        if(state.secondary) parts.push(state.secondary.name);
      }
      parts.push(DATA.seed.name);
    }
    return parts.join(" → ");
  }

  function updateControls(){
    const step = currentStep();
    $btnBack.disabled = (step === "endClient");
    $btnCopy.disabled = (step !== "done");
  }

  function renderPath(){
    $path.innerHTML = "";
    const nodes = [];
    if(state.endClient) nodes.push({ label: state.endClient.name, active: true });
    if(state.primary) nodes.push({ label: state.primary.name, active: true });

    if(state.primary){
      if(state.primary.routeType === "via_secondary"){
        if(state.secondary) nodes.push({ label: state.secondary.name, active: true });
        else nodes.push({ label: "（二次を選択）", active: false });
      }
      nodes.push({ label: DATA.seed.name, active: currentStep()==="done" });
    }

    if(nodes.length === 0){
      $path.innerHTML = '<div class="node"><span class="dot"></span><span>（未選択）</span></div>';
      return;
    }

    nodes.forEach((n, i) => {
      const node = document.createElement("div");
      node.className = "node" + (n.active ? " active" : "");
      node.innerHTML = '<span class="dot"></span><span>' + escapeHtml(n.label) + '</span>';
      $path.appendChild(node);

      if(i < nodes.length - 1){
        const arrow = document.createElement("div");
        arrow.className = "arrow";
        arrow.textContent = "→";
        $path.appendChild(arrow);
      }
    });
  }

  function renderPreview(){
    const step = currentStep();
    const endName = state.endClient ? state.endClient.name : "—";
    const primaryName = state.primary ? state.primary.name : "—";
    const secondaryName = (state.primary && state.primary.routeType==="via_secondary")
      ? (state.secondary ? state.secondary.name : "—")
      : "（なし）";
    const seedName = (step==="endClient" || step==="primary") ? "—" : DATA.seed.name;

    $preview.innerHTML = "";
    $preview.appendChild(previewLine("End Client", endName));
    $preview.appendChild(previewLine("一次", primaryName));
    $preview.appendChild(previewLine("二次", secondaryName));
    $preview.appendChild(previewLine("納品先", seedName));

    if(step==="done"){
      const p = document.createElement("div");
      p.className = "previewLine";
      p.innerHTML = '<span class="k">経路</span><span class="v">' + escapeHtml(selectedPathText()) + '</span>';
      $preview.appendChild(p);
    }
  }

  function previewLine(k, v){
    const row = document.createElement("div");
    row.className = "previewLine";
    row.innerHTML = '<span class="k">' + escapeHtml(k) + '</span><span class="v">' + escapeHtml(v) + '</span>';
    return row;
  }

  function renderChoices(){
    const step = currentStep();
    $choices.innerHTML = "";
    setCopied("");

    if(step === "endClient"){
      $stepTitle.textContent = "エンドクライアントを選択";
      $stepHint.textContent = "最上流を選ぶと、一次エージェンシー候補が出ます。";
      setNote("");

      DATA.endClients.forEach(ec => {
        $choices.appendChild(choiceCard(ec.name, "クリックして一次エージェンシーへ", "End", () => {
          state.endClient = ec;
          state.primary = null;
          state.secondary = null;
          rerender("エンドクライアントを選択しました。");
        }));
      });
      return;
    }

    if(step === "primary"){
      $stepTitle.textContent = "一次エージェンシーを選択";
      $stepHint.textContent = "一次を選ぶと、二次がある場合は二次選択へ。ない場合はそのままシードへ。";

      const primaries = state.endClient.primaries;
      primaries.forEach(p => {
        const badge = (p.routeType === "via_secondary") ? "二次あり" : "直";
        const meta = (p.routeType === "via_secondary") ? "一次 → 二次 → SEED" : "一次 → SEED";
        $choices.appendChild(choiceCard(p.name, meta, badge, () => {
          state.primary = p;
          state.secondary = null;
          rerender("一次エージェンシーを選択しました。");
        }));
      });
      setNote("※「二次あり」を選ぶと、次の画面で二次エージェンシーが表示されます。");
      return;
    }

    if(step === "secondaryOrSeed"){
      $stepTitle.textContent = "二次エージェンシーを選択";
      $stepHint.textContent = "二次を選ぶと、経路が完成します。";

      const secs = state.primary.secondaries || [];
      secs.forEach(s => {
        $choices.appendChild(choiceCard(s.name, "二次 → SEED", "二次", () => {
          state.secondary = s;
          rerender("二次エージェンシーを選択しました。経路完成です。");
        }));
      });

      setNote("この一次エージェンシーは二次経由のパターンです。");
      return;
    }

    // done
    $stepTitle.textContent = "完成（経路が確定しました）";
    $stepHint.textContent = "「コピー」または「戻る」で調整できます。";

    const summary = selectedPathText();
    $choices.appendChild(choiceCard("この経路でOK", summary, "Done", () => {
      // noop, but keeps UI consistent
      setNote("経路は確定済みです。必要なら「戻る」か「リセット」してね。");
    }));

    setNote("右側の「経路テキストをコピー」で、資料やメールに貼れます。");
  }

  function choiceCard(title, meta, badge, onClick){
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "choice";
    btn.innerHTML = `
      <div class="badge">${escapeHtml(badge)}</div>
      <div class="title">${escapeHtml(title)}</div>
      <p class="meta">${escapeHtml(meta || "")}</p>
    `;
    btn.addEventListener("click", () => onClick());
    return btn;
  }

  function rerender(note){
    setNote(note || "");
    renderChoices();
    renderPath();
    renderPreview();
    updateControls();
  }

  function goBack(){
    const step = currentStep();
    if(step === "primary"){
      state.endClient = null;
    } else if(step === "secondaryOrSeed"){
      state.primary = null;
      state.secondary = null;
    } else if(step === "done"){
      // If done via direct route, go back to primary; if via secondary, go back to secondary selection.
      if(state.primary && state.primary.routeType === "via_secondary"){
        state.secondary = null;
      } else {
        state.primary = null;
      }
    }
    rerender("");
  }

  function resetAll(){
    state.endClient = null;
    state.primary = null;
    state.secondary = null;
    rerender("リセットしました。");
  }

  async function copyPath(){
    const text = selectedPathText();
    if(!text) return;
    try{
      await navigator.clipboard.writeText(text);
      setCopied("コピーしました ✓");
    }catch(e){
      // fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try{
        document.execCommand("copy");
        setCopied("コピーしました ✓");
      }catch(_){
        setCopied("コピーできませんでした（ブラウザ制限）");
      }
      document.body.removeChild(ta);
    }
  }

  function escapeHtml(str){
    return String(str)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }

  // events
  $btnBack.addEventListener("click", goBack);
  $btnReset.addEventListener("click", resetAll);
  $btnCopy.addEventListener("click", copyPath);

  // init
  rerender("");
})();
