(function(){
'use strict';

var ADMIN_ROUTES={
  dashboard:'index.html',
  'survey-ops':'survey-operations.html',
  announcements:'announcements.html',
  'quick-survey':'quick-survey.html',
  redemption:'redemption.html',
  members:'members.html',
  'member-review':'member-review.html',
  settings:'settings.html'
};

window.nav=function(p){
  var url=ADMIN_ROUTES[p];
  if(url)window.location.href=url;
};

function goStep(n){
  var ss1=document.getElementById('ss1');
  var ss3=document.getElementById('ss3');
  if(n===1){
    if(ss1)ss1.style.display='';
    if(ss3)ss3.style.display='none';
    soBatchPreviewReset();
    ['s1','s2','s3'].forEach(function(id,i){
      var el=document.getElementById(id);if(!el)return;
      el.className='stp'+(i===0?' on':'');
    });
    var l1=document.getElementById('l1'),l2=document.getElementById('l2');
    if(l1)l1.className='stp-line';
    if(l2)l2.className='stp-line';
  }else if(n===3){
    if(ss1)ss1.style.display='none';
    if(ss3)ss3.style.display='';
    ['s1','s2','s3'].forEach(function(id,i){
      var el=document.getElementById(id);if(!el)return;
      el.className='stp'+(i+1===n?' on':(i+1<n?' done':''));
    });
    var l1=document.getElementById('l1'),l2=document.getElementById('l2');
    if(l1)l1.className='stp-line done';
    if(l2)l2.className='stp-line done';
    soBatchChecklistInit();
  }
  if(typeof lucide!=='undefined')lucide.createIcons();
}
window.goStep=goStep;

function soBatchChecklistUpdate(){
  var cks=document.querySelectorAll('#ss3 .so-batch-ck');
  var btn=document.getElementById('so-batch-send-btn');
  if(!btn||!cks.length)return;
  var all=true;
  for(var i=0;i<cks.length;i++){if(!cks[i].checked){all=false;break;}}
  btn.disabled=!all;
}
function soBatchChecklistInit(){
  document.querySelectorAll('#ss3 .so-batch-ck').forEach(function(c){c.checked=false});
  soBatchChecklistUpdate();
}
function soBatchPreviewReset(){
  var ph=document.getElementById('ss1-placeholder');
  var pv=document.getElementById('ss1-preview');
  if(ph)ph.style.display='';
  if(pv)pv.style.display='none';
}
function soBatchRunExtract(){
  var ph=document.getElementById('ss1-placeholder');
  var pv=document.getElementById('ss1-preview');
  if(ph)ph.style.display='none';
  if(pv)pv.style.display='block';
  var s1=document.getElementById('s1'),s2=document.getElementById('s2'),s3=document.getElementById('s3');
  if(s1)s1.className='stp done';
  if(s2)s2.className='stp on';
  if(s3)s3.className='stp';
  var l1=document.getElementById('l1'),l2=document.getElementById('l2');
  if(l1)l1.className='stp-line done';
  if(l2)l2.className='stp-line';
  if(typeof lucide!=='undefined')lucide.createIcons();
}
window.soBatchRunExtract=soBatchRunExtract;

function soBatchBackToConditions(){
  soBatchPreviewReset();
  var s1=document.getElementById('s1'),s2=document.getElementById('s2'),s3=document.getElementById('s3');
  if(s1)s1.className='stp on';
  if(s2)s2.className='stp';
  if(s3)s3.className='stp';
  var l1=document.getElementById('l1'),l2=document.getElementById('l2');
  if(l1)l1.className='stp-line';
  if(l2)l2.className='stp-line';
  if(typeof lucide!=='undefined')lucide.createIcons();
}
window.soBatchBackToConditions=soBatchBackToConditions;

function qTab(t){
  var qex=document.getElementById('q-ex'),qsn=document.getElementById('q-sn'),qte=document.getElementById('qt-ex'),qts=document.getElementById('qt-sn');
  if(qex)qex.style.display=t==='ex'?'':'none';
  if(qsn)qsn.style.display=t==='sn'?'':'none';
  if(qte)qte.className='tab'+(t==='ex'?' on':'');
  if(qts)qts.className='tab'+(t==='sn'?' on':'');
}
window.qTab=qTab;

function initTabWidgets(){
  document.querySelectorAll('.tabs').forEach(function(tabs){
    tabs.querySelectorAll('.tab').forEach(function(tab){
      if(!tab.id)tab.addEventListener('click',function(){
        tabs.querySelectorAll('.tab').forEach(function(t){t.classList.remove('on')});tab.classList.add('on');
        if(tabs.id==='so-tabs'){
          var key=tab.dataset.so;
          var sl=document.getElementById('so-list');
          if(sl)sl.style.display=(key==='list')?'':'none';
          var sd=document.getElementById('so-detail');if(sd)sd.style.display='none';
          var np=document.getElementById('so-new-project');if(np)np.style.display='none';
          var sb=document.getElementById('so-new-batch');if(sb)sb.style.display='none';
          if(typeof lucide!=='undefined')lucide.createIcons();
        }
      });
    });
  });
}

var SO_DETAIL_BATCH={
  '':{c:4,so:2,qf:1,inc:5,goal:12,loi:'12分45秒',loiSub:'回答完了者の所要時間（中央値・モック）'},
  '1':{c:3,so:0,qf:0,inc:3,goal:6,loi:'11分20秒',loiSub:'バッチ1の完了者（中央値・モック）'},
  '2':{c:1,so:2,qf:1,inc:2,goal:6,loi:'14分02秒',loiSub:'バッチ2の完了者（中央値・モック）'}
};
var SO_DETAIL_BATCH_EXTRACT_DISPLAY={
  '1':{mainSpec:'07 糖尿病内科（代謝内科）',subSpec:'01 内科 / 03 循環器内科 / 29 整形外科',facility:'病院・クリニック（バランス配分）',bed:'20 〜 500床',pref:'東京・大阪・愛知・福岡',exp:'5年 〜 40+年',bl:'配信禁止者を自動除外 — 適用',recent:'過去12時間以内配信済パネラーを除外 — 適用'},
  '2':{mainSpec:'03 循環器内科',subSpec:'01 内科',facility:'病院優先',bed:'制限なし',pref:'関東・関西・北海道',exp:'3年 〜 40+年',bl:'配信禁止者を自動除外 — 適用',recent:'過去12時間以内配信済パネラーを除外 — 適用'}
};
function soDetailUpdateExtractPanel(key){
  key=key===undefined||key===null?'':String(key);
  var hint=document.getElementById('so-d-extract-hint');
  var fields=document.getElementById('so-d-extract-fields');
  var ex=SO_DETAIL_BATCH_EXTRACT_DISPLAY[key];
  if(!hint||!fields)return;
  if(!key||!ex){
    hint.style.display='';
    fields.style.display='none';
    return;
  }
  hint.style.display='none';
  fields.style.display='';
  var set=function(id,v){var el=document.getElementById(id);if(el)el.textContent=v||'—';};
  set('so-d-ex-main-spec',ex.mainSpec);
  set('so-d-ex-sub-spec',ex.subSpec);
  set('so-d-ex-fac',ex.facility);
  set('so-d-ex-bed',ex.bed);
  set('so-d-ex-pref',ex.pref);
  set('so-d-ex-exp',ex.exp);
  set('so-d-ex-bl',ex.bl);
  set('so-d-ex-recent',ex.recent);
}
function soDetailApplyBatchView(key){
  key=key===undefined||key===null?'':String(key);
  var S=SO_DETAIL_BATCH[key];
  if(!S)return;
  var c=S.c,so=S.so,qf=S.qf,inc=S.inc,g=S.goal;
  var set=function(id,v){var el=document.getElementById(id);if(el)el.textContent=v;};
  set('so-d-v-c',String(c));
  set('so-d-v-so',String(so));
  set('so-d-v-qf',String(qf));
  set('so-d-v-inc',String(inc));
  set('so-d-v-goal',String(g));
  var cpct=g>0?((c/g)*100).toFixed(1):'0';
  set('so-d-v-cpct',cpct);
  var pfill=document.getElementById('so-d-pfill-c');
  if(pfill)pfill.style.width=Math.min(100,parseFloat(cpct)||0)+'%';
  var soRate=(c+so)>0?((so/(c+so))*100).toFixed(1):'0';
  set('so-d-sub-so','SO率: '+soRate+'%');
  var qfRate=g>0?((qf/g)*100).toFixed(1):'0';
  set('so-d-sub-qf','QF率: '+qfRate+'%');
  var incRate=g>0?((inc/g)*100).toFixed(1):'0';
  set('so-d-sub-inc','内訳比: '+incRate+'%');
  var kpiRate=(c+so)>0?((c/(c+so))*100).toFixed(1):'0';
  set('so-d-kpi-rate',kpiRate+'%');
  set('so-d-kpi-rate-sub',c+' / ('+c+' + '+so+') = Complete / (Complete + Screenout)');
  set('so-d-kpi-loi',S.loi);
  set('so-d-kpi-loi-sub',S.loiSub);
  set('so-d-delivered',String(g));
  var est=Math.max(0,Math.round(g*0.17));
  set('so-d-est-comp',String(est));
  set('so-d-delivered-sub','配信対象に送信済み（モック・目標'+g+'名）');
  set('so-d-est-comp-sub','IR17%により自動推定（モック）');
  document.querySelectorAll('#so-batch-tbody tr.so-batch-row').forEach(function(tr){
    tr.classList.toggle('so-batch-row-on',!!key&&tr.getAttribute('data-batch-id')===key);
  });
  var ctrlWrap=document.getElementById('so-detail-ctrl-wrap');
  if(ctrlWrap){
    ctrlWrap.classList.toggle('so-ctrl-disabled',!key);
    ctrlWrap.title=key?'':'先に配信中バッチ一覧でバッチを選択してください';
  }
  soDetailUpdateExtractPanel(key);
}
window.soDetailApplyBatchView=soDetailApplyBatchView;

function soDetailSelectBatch(id){
  var sel=document.getElementById('so-m-batch');
  if(sel)sel.value=id;
  soDetailApplyBatchView(id);
  soDetailMemberFilter();
}
window.soDetailSelectBatch=soDetailSelectBatch;

function soDetailBatchSelectionClear(){
  var sel=document.getElementById('so-m-batch');
  if(sel)sel.value='';
  soDetailApplyBatchView('');
  soDetailMemberFilter();
}
window.soDetailBatchSelectionClear=soDetailBatchSelectionClear;

function soDetail(){
  var sl=document.getElementById('so-list');if(sl)sl.style.display='none';
  var np=document.getElementById('so-new-project');if(np)np.style.display='none';
  var sb=document.getElementById('so-new-batch');if(sb)sb.style.display='none';
  var sd=document.getElementById('so-detail');if(sd)sd.style.display='';
  soDetailMemberReset();
  if(typeof lucide!=='undefined')lucide.createIcons();
}
window.soDetail=soDetail;

function soBack(){
  var sd=document.getElementById('so-detail');if(sd)sd.style.display='none';
  var sl=document.getElementById('so-list');if(sl)sl.style.display='';
  if(typeof lucide!=='undefined')lucide.createIcons();
}
window.soBack=soBack;

function soNewProject(){
  var sl=document.getElementById('so-list');if(sl)sl.style.display='none';
  var sd=document.getElementById('so-detail');if(sd)sd.style.display='none';
  var sb=document.getElementById('so-new-batch');if(sb)sb.style.display='none';
  var np=document.getElementById('so-new-project');if(np)np.style.display='';
  soNewProjectStatusVerifyReset();
  if(typeof lucide!=='undefined')lucide.createIcons();
}
window.soNewProject=soNewProject;

function soNewProjectStatusVerifyReset(){
  ['so-new-verify-complete','so-new-verify-screenout','so-new-verify-quota'].forEach(function(id){
    var el=document.getElementById(id);
    if(el)el.classList.remove('ok');
  });
}
function soNewProjectStatusVerifyBind(){
  [['so-new-url-complete','so-new-verify-complete'],['so-new-url-screenout','so-new-verify-screenout'],['so-new-url-quota','so-new-verify-quota']].forEach(function(p){
    var inp=document.getElementById(p[0]);
    if(!inp)return;
    inp.addEventListener('input',function(){
      var v=document.getElementById(p[1]);
      if(v)v.classList.remove('ok');
    });
  });
}

function soNewProjectBack(){
  var np=document.getElementById('so-new-project');if(np)np.style.display='none';
  var sl=document.getElementById('so-list');if(sl)sl.style.display='';
  if(typeof lucide!=='undefined')lucide.createIcons();
}
window.soNewProjectBack=soNewProjectBack;

function soNewProjectUrlTest(kind){
  var map={survey:'so-new-survey-link',complete:'so-new-url-complete',screenout:'so-new-url-screenout',quota:'so-new-url-quota'};
  var verifyMap={complete:'so-new-verify-complete',screenout:'so-new-verify-screenout',quota:'so-new-verify-quota'};
  var id=map[kind];
  if(!id)return;
  var el=document.getElementById(id);
  if(!el)return;
  var u=(el.value||'').trim();
  if(!u){alert('URLを入力してください。');return;}
  u=u.replace(/\{UID\}/g,'TEST_UID').replace(/\{案件ID\}/g,'CASE001');
  window.open(u,'_blank','noopener,noreferrer');
  if(kind!=='survey'){
    var vid=verifyMap[kind];
    var v=document.getElementById(vid);
    if(v){
      v.classList.add('ok');
      if(typeof lucide!=='undefined')lucide.createIcons();
    }
  }
}
window.soNewProjectUrlTest=soNewProjectUrlTest;

var soNewBatchReturnTo='list';
var SO_BATCH_QUICK_PRESET={
  '1':{
    name:'2026/Q1 初回配信（クイックコピー）',
    mainSpec:'07',
    subSpec:['01','03','29'],
    facility:'b1-fac',
    bedMin:20,
    bedMax:500,
    pref:'b1-pref',
    expMin:5,
    expMax:40,
    bl:true,
    recent:true
  },
  '2':{
    name:'フォローアップ配信（クイックコピー）',
    mainSpec:'03',
    subSpec:['01'],
    facility:'b2-fac',
    bedMin:'',
    bedMax:'',
    pref:'b2-pref',
    expMin:3,
    expMax:40,
    bl:true,
    recent:true
  }
};
function soNewBatchResetFormDefaults(){
  var name=document.getElementById('so-batch-name-input');
  if(name)name.value='';
  // 主専門領域リセット
  var mainInp=document.getElementById('so-batch-main-spec-input');
  if(mainInp)mainInp.value='';
  document.querySelectorAll('#so-batch-main-spec input[type=radio]').forEach(function(r){r.checked=false;});
  // 副専門領域リセット
  document.querySelectorAll('#so-batch-sub-spec input[type=checkbox]').forEach(function(c){c.checked=false;});
  if(typeof soUpdateSubSpec==='function')soUpdateSubSpec();
  // 施設タイプ・都道府県
  var fac=document.getElementById('so-batch-ex-facility');
  if(fac)fac.value='';
  var pref=document.getElementById('so-batch-ex-pref');
  if(pref)pref.value='';
  // 病床数
  var bMin=document.getElementById('so-batch-bed-min');
  if(bMin)bMin.value='';
  var bMax=document.getElementById('so-batch-bed-max');
  if(bMax)bMax.value='';
  // 経験年数スライダー
  var eMin=document.getElementById('so-exp-min');
  var eMax=document.getElementById('so-exp-max');
  if(eMin)eMin.value=0;
  if(eMax)eMax.value=40;
  if(typeof soExpSliderSync==='function')soExpSliderSync();
  // 除外条件
  var bl=document.getElementById('so-batch-ex-bl');
  if(bl)bl.checked=true;
  var rc=document.getElementById('so-batch-ex-recent');
  if(rc)rc.checked=true;
}
function soNewBatchApplyQuickPreset(batchId){
  var P=SO_BATCH_QUICK_PRESET[String(batchId)];
  if(!P)return;
  // バッチ名称
  var name=document.getElementById('so-batch-name-input');
  if(name)name.value=P.name;
  // 主専門領域
  if(P.mainSpec){
    var mainRadio=document.querySelector('#so-batch-main-spec input[type=radio][value="'+P.mainSpec+'"]');
    if(mainRadio){
      mainRadio.checked=true;
      if(typeof soSelectMainSpec==='function')soSelectMainSpec(mainRadio);
      var dd=mainRadio.closest('.so-spec-dropdown');
      if(dd)dd.style.display='none';
    }
  }
  // 副専門領域
  if(P.subSpec&&P.subSpec.length){
    P.subSpec.forEach(function(v){
      var cb=document.querySelector('#so-batch-sub-spec input[type=checkbox][value="'+v+'"]');
      if(cb)cb.checked=true;
    });
    if(typeof soUpdateSubSpec==='function')soUpdateSubSpec();
  }
  // 施設タイプ
  var fac=document.getElementById('so-batch-ex-facility');
  if(fac)fac.value=P.facility||'';
  // 病床数
  var bMin=document.getElementById('so-batch-bed-min');
  if(bMin)bMin.value=(P.bedMin===''||P.bedMin==null)?'':P.bedMin;
  var bMax=document.getElementById('so-batch-bed-max');
  if(bMax)bMax.value=(P.bedMax===''||P.bedMax==null)?'':P.bedMax;
  // 都道府県
  var pref=document.getElementById('so-batch-ex-pref');
  if(pref)pref.value=P.pref||'';
  // 経験年数
  var eMin=document.getElementById('so-exp-min');
  var eMax=document.getElementById('so-exp-max');
  if(eMin&&P.expMin!=null)eMin.value=P.expMin;
  if(eMax&&P.expMax!=null)eMax.value=P.expMax;
  if(typeof soExpSliderSync==='function')soExpSliderSync();
  // 除外条件
  var bl=document.getElementById('so-batch-ex-bl');
  if(bl)bl.checked=!!P.bl;
  var rc=document.getElementById('so-batch-ex-recent');
  if(rc)rc.checked=!!P.recent;
}
function soQuickBatchFromDetail(batchId){
  soNewBatchReturnTo='detail';
  soNewBatchOpen();
  soNewBatchApplyQuickPreset(batchId);
}
window.soQuickBatchFromDetail=soQuickBatchFromDetail;

function soNewBatchOpen(){
  var sl=document.getElementById('so-list');if(sl)sl.style.display='none';
  var sd=document.getElementById('so-detail');if(sd)sd.style.display='none';
  var np=document.getElementById('so-new-project');if(np)np.style.display='none';
  var nb=document.getElementById('so-new-batch');if(nb)nb.style.display='';
  goStep(1);
  soNewBatchResetFormDefaults();
  if(typeof lucide!=='undefined')lucide.createIcons();
}
window.soNewBatchOpen=soNewBatchOpen;

function soNewBatchFromDetail(){
  soNewBatchReturnTo='detail';
  soNewBatchOpen();
}
window.soNewBatchFromDetail=soNewBatchFromDetail;

function soNewBatchFromDashboard(){
  soNewBatchReturnTo='list';
  window.location.href='survey-operations.html?newBatch=1';
}
window.soNewBatchFromDashboard=soNewBatchFromDashboard;

function soNewBatchBack(){
  var nb=document.getElementById('so-new-batch');if(nb)nb.style.display='none';
  goStep(1);
  if(soNewBatchReturnTo==='detail'){
    var sl=document.getElementById('so-list');if(sl)sl.style.display='none';
    var sd=document.getElementById('so-detail');if(sd)sd.style.display='';
  }else{
    var sl2=document.getElementById('so-list');if(sl2)sl2.style.display='';
    var sd2=document.getElementById('so-detail');if(sd2)sd2.style.display='none';
  }
  var np=document.getElementById('so-new-project');if(np)np.style.display='none';
  if(typeof lucide!=='undefined')lucide.createIcons();
}
window.soNewBatchBack=soNewBatchBack;

function soListFilterRows(){
  var qEl=document.getElementById('so-q');
  if(!qEl)return;
  var q=(qEl.value||'').trim().toLowerCase().replace(/\s+/g,' ');
  var ds=document.getElementById('so-d-start');
  var de=document.getElementById('so-d-end');
  var dsVal=ds?ds.value:'';
  var deVal=de?de.value:'';
  var rows=document.querySelectorAll('#so-list-tbody tr');
  var n=0;
  rows.forEach(function(tr){
    var show=true;
    if(q){
      var t=(tr.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();
      if(t.indexOf(q)===-1)show=false;
    }
    if(show&&(dsVal||deVal)){
      var rs=tr.getAttribute('data-start');
      var re=tr.getAttribute('data-end');
      if(!rs||!re)show=false;
      else{
        if(dsVal&&re<dsVal)show=false;
        if(show&&deVal&&rs>deVal)show=false;
      }
    }
    tr.style.display=show?'':'none';
    if(show)n++;
  });
  var el=document.getElementById('so-list-hit');
  var total=rows.length;
  if(el){
    if(n===total)el.innerHTML='全 <strong id="so-list-n">'+total+'</strong> 件';
    else el.innerHTML='該当 <strong id="so-list-n">'+n+'</strong> / '+total+' 件';
  }
}

function soMemberStatusResetMock(){
  alert('モック: ステータスをリセットしました');
}
window.soMemberStatusResetMock=soMemberStatusResetMock;

function soDetailMemberFilter(){
  var mq=document.getElementById('so-m-q');
  if(!mq)return;
  var q=(mq.value||'').trim().toLowerCase().replace(/\s+/g,' ');
  var batch=document.getElementById('so-m-batch').value;
  var fac=document.getElementById('so-m-facility').value;
  var st=document.getElementById('so-m-st').value;
  var rows=document.querySelectorAll('#so-m-tbody tr');
  var n=0;
  rows.forEach(function(tr){
    var idCell=tr.cells[0];
    var id=(idCell&&idCell.textContent||'').toLowerCase().replace(/\s+/g,' ');
    var s=tr.getAttribute('data-st')||'';
    var b=tr.getAttribute('data-batch')||'';
    var f=tr.getAttribute('data-facility')||'';
    var show=true;
    if(q&&id.indexOf(q)===-1)show=false;
    if(show&&batch&&b!==batch)show=false;
    if(show&&fac&&f!==fac)show=false;
    if(show&&st&&s!==st)show=false;
    tr.style.display=show?'':'none';
    if(show)n++;
  });
  var total=rows.length;
  var el=document.getElementById('so-m-hit');
  if(el)el.innerHTML=n===total?'全 <strong id="so-m-n">'+total+'</strong> 件':'該当 <strong id="so-m-n">'+n+'</strong> / '+total+' 件';
}

function soDetailMemberReset(){
  var mq=document.getElementById('so-m-q');
  if(!mq)return;
  mq.value='';
  document.getElementById('so-m-batch').value='';
  document.getElementById('so-m-facility').value='';
  document.getElementById('so-m-st').value='';
  soDetailApplyBatchView('');
  soDetailMemberFilter();
}

function initSurveyOperationsListeners(){
  var soq=document.getElementById('so-q');
  if(soq)soq.addEventListener('input',soListFilterRows);
  var dstart=document.getElementById('so-d-start');
  if(dstart)dstart.addEventListener('change',soListFilterRows);
  var dend=document.getElementById('so-d-end');
  if(dend)dend.addEventListener('change',soListFilterRows);
  var fc=document.getElementById('so-filter-clear');
  if(fc)fc.addEventListener('click',function(){
    if(soq)soq.value='';
    if(dstart)dstart.value='';
    if(dend)dend.value='';
    soListFilterRows();
  });

  var smq=document.getElementById('so-m-q');
  if(smq)smq.addEventListener('input',soDetailMemberFilter);
  var smb=document.getElementById('so-m-batch');
  if(smb)smb.addEventListener('change',function(){
    soDetailApplyBatchView(document.getElementById('so-m-batch').value||'');
    soDetailMemberFilter();
  });
  var smf=document.getElementById('so-m-facility');
  if(smf)smf.addEventListener('change',soDetailMemberFilter);
  var sms=document.getElementById('so-m-st');
  if(sms)sms.addEventListener('change',soDetailMemberFilter);
  var smc=document.getElementById('so-m-clear');
  if(smc)smc.addEventListener('click',soDetailMemberReset);

  document.querySelectorAll('#ss3 .so-batch-ck').forEach(function(c){
    c.addEventListener('change',soBatchChecklistUpdate);
  });
  soBatchChecklistInit();
  soNewProjectStatusVerifyBind();
}

/* --- Specialty picker helpers --- */
function soToggleSpecPicker(wrap){
  var dd=wrap.querySelector('.so-spec-dropdown');
  if(!dd)return;
  var open=dd.style.display==='flex';
  document.querySelectorAll('.so-spec-dropdown').forEach(function(d){d.style.display='none';});
  if(!open){dd.style.display='flex';var si=dd.querySelector('input[type="search"]');if(si){si.value='';si.focus();soFilterSpecList(si);}}
}
window.soToggleSpecPicker=soToggleSpecPicker;

function soFilterSpecList(input){
  var q=input.value.trim().toLowerCase();
  var items=input.closest('.so-spec-dropdown').querySelectorAll('.so-spec-item');
  items.forEach(function(it){it.style.display=it.textContent.toLowerCase().indexOf(q)>=0?'':'none';});
}
window.soFilterSpecList=soFilterSpecList;

function soSelectMainSpec(radio){
  var label=radio.parentElement.textContent.trim();
  var inp=document.getElementById('so-batch-main-spec-input');
  if(inp)inp.value=label;
  var dd=radio.closest('.so-spec-dropdown');
  if(dd)dd.style.display='none';
}
window.soSelectMainSpec=soSelectMainSpec;

function soUpdateSubSpec(){
  var display=document.getElementById('so-batch-sub-spec-display');
  if(!display)return;
  var checked=document.querySelectorAll('#so-batch-sub-spec .so-spec-list input:checked');
  if(!checked.length){display.innerHTML='<span class="tm">クリックして診療科を選択（複数可）</span>';return;}
  var html='';
  checked.forEach(function(cb){
    var t=cb.parentElement.textContent.trim();
    html+='<span style="background:var(--ice);color:var(--navy);font-size:11px;padding:2px 8px;border-radius:4px;white-space:nowrap">'+t+'</span>';
  });
  display.innerHTML=html;
}
window.soUpdateSubSpec=soUpdateSubSpec;

/* --- Detail tab switch --- */
function soDetailTabSwitch(tab){
  var tabs=document.querySelectorAll('#so-detail-tabs .tab');
  tabs.forEach(function(t){t.classList.toggle('on',t.getAttribute('data-dtab')===tab);});
  var info=document.getElementById('so-detail-tab-info');
  var log=document.getElementById('so-detail-tab-log');
  if(info)info.style.display=tab==='detail-info'?'':'none';
  if(log)log.style.display=tab==='detail-log'?'':'none';
}
window.soDetailTabSwitch=soDetailTabSwitch;

/* --- Log filter --- */
function soLogFilter(){
  var sel=document.getElementById('so-log-type');
  var v=sel?sel.value:'';
  var rows=document.querySelectorAll('#so-log-tbody tr');
  var cnt=0;
  rows.forEach(function(r){
    var show=!v||r.getAttribute('data-log-type')===v;
    r.style.display=show?'':'none';
    if(show)cnt++;
  });
  var n=document.getElementById('so-log-n');if(n)n.textContent=cnt;
}
window.soLogFilter=soLogFilter;

/* --- Member status change (mock) --- */
function soMemberStatusChange(sel){
  var tr=sel.closest('tr');
  if(tr)tr.setAttribute('data-st',sel.value);
}
window.soMemberStatusChange=soMemberStatusChange;

/* --- Preview search & checkbox --- */
function soPreviewFilter(){
  var q=(document.getElementById('so-pv-q').value||'').toLowerCase();
  var ckf=(document.getElementById('so-pv-ck-filter').value||'');
  var rows=document.querySelectorAll('.so-pv-row');
  rows.forEach(function(r){
    var matchQ=!q||(r.getAttribute('data-search')||'').indexOf(q)>=0;
    var cb=r.querySelector('.so-pv-ck');
    var matchCk=!ckf||(ckf==='checked'&&cb&&cb.checked)||(ckf==='unchecked'&&cb&&!cb.checked);
    r.style.display=(matchQ&&matchCk)?'':'none';
  });
}
window.soPreviewFilter=soPreviewFilter;
window.soPreviewSearch=soPreviewFilter;

function soPreviewToggleAll(master){
  var cks=document.querySelectorAll('.so-pv-ck');
  cks.forEach(function(c){c.checked=master.checked;});
  soPreviewCountSel();
}
window.soPreviewToggleAll=soPreviewToggleAll;

function soPreviewCountSel(){
  var cks=document.querySelectorAll('.so-pv-ck');
  var cnt=0;cks.forEach(function(c){if(c.checked)cnt++;});
  var el=document.getElementById('so-pv-sel-n');if(el)el.textContent=cnt;
  var all=document.getElementById('so-pv-all');if(all)all.checked=(cnt===cks.length);
  soPreviewFilter();
}
window.soPreviewCountSel=soPreviewCountSel;

/* --- Experience year range slider --- */
function soExpSliderSync(){
  var mn=document.getElementById('so-exp-min');
  var mx=document.getElementById('so-exp-max');
  if(!mn||!mx)return;
  var v1=parseInt(mn.value,10),v2=parseInt(mx.value,10);
  if(v1>v2){var tmp=v2;mn.value=tmp;v1=tmp;}
  if(v2<v1){mx.value=v1;v2=v1;}
  document.getElementById('so-exp-min-val').textContent=v1+'年';
  document.getElementById('so-exp-max-val').textContent=(v2>=40?'40+':v2)+'年';
  var lbl=document.getElementById('so-exp-label');
  if(v1===0&&v2>=40){lbl.textContent='全範囲（0〜40+年）';}
  else{lbl.textContent=v1+'年 〜 '+(v2>=40?'40+年':v2+'年');}
}
window.soExpSliderSync=soExpSliderSync;

document.addEventListener('click',function(e){
  document.querySelectorAll('.so-spec-picker').forEach(function(p){
    if(!p.contains(e.target)){var dd=p.querySelector('.so-spec-dropdown');if(dd)dd.style.display='none';}
  });
});

document.addEventListener('DOMContentLoaded',function(){
  initTabWidgets();
  var page=document.body.getAttribute('data-admin-page');
  if(page==='survey-ops'){
    initSurveyOperationsListeners();
    var params=new URLSearchParams(window.location.search);
    if(params.get('newBatch')==='1'){
      var file=window.location.pathname.split('/').pop()||'survey-operations.html';
      try{history.replaceState({},'',file);}catch(e){}
      soNewBatchOpen();
    }
  }
  if(typeof lucide!=='undefined')lucide.createIcons();
});

/* ===== 会員管理 ===== */
var MEM_DATA=[
  {id:'HCP-10392',email:'tanaka.ichiro@example.com',last:'田中',first:'一郎',lastK:'たなか',firstK:'いちろう',birth:'1975',sex:'男性',hosp:'東京中央病院',hospK:'とうきょうちゅうおうびょういん',position:'部長',job:'医師',hospType:'大学病院',beds:'820',pref:'東京都',addr:'東京都文京区本郷7-3-1',bldg:'医学部附属病院棟',tel:'03-3815-XXXX',telMatch:'一致',mainSpec:'01 内科',subSpec:'03 循環器内科 / 07 糖尿病内科'},
  {id:'HCP-20511',email:'sato.hanako@example.com',last:'佐藤',first:'花子',lastK:'さとう',firstK:'はなこ',birth:'1982',sex:'女性',hosp:'大阪ハートクリニック',hospK:'おおさかはーとくりにっく',position:'院長',job:'医師',hospType:'クリニック',beds:'0',pref:'大阪府',addr:'大阪府大阪市中央区心斎橋2-1-5',bldg:'心斎橋メディカルビル3F',tel:'06-6211-XXXX',telMatch:'一致',mainSpec:'03 循環器内科',subSpec:'01 内科'},
  {id:'HCP-54012',email:'suzuki.kenta@example.com',last:'鈴木',first:'健太',lastK:'すずき',firstK:'けんた',birth:'1978',sex:'男性',hosp:'名古屋第一病院',hospK:'なごやだいいちびょういん',position:'医長',job:'医師',hospType:'総合病院',beds:'450',pref:'愛知県',addr:'愛知県名古屋市中区栄3-15-8',bldg:'',tel:'052-241-XXXX',telMatch:'一致',mainSpec:'07 糖尿病内科（代謝内科）',subSpec:'01 内科 / 05 腎臓内科'},
  {id:'HCP-39017',email:'takahashi.misaki@example.com',last:'高橋',first:'美咲',lastK:'たかはし',firstK:'みさき',birth:'1988',sex:'女性',hosp:'福岡スキンケアクリニック',hospK:'ふくおかすきんけあくりにっく',position:'院長',job:'医師',hospType:'クリニック',beds:'0',pref:'福岡県',addr:'福岡県福岡市博多区博多駅前2-8-12',bldg:'博多メディカルタワー5F',tel:'092-451-XXXX',telMatch:'一致',mainSpec:'09 皮膚科',subSpec:'10 アレルギー科'},
  {id:'HCP-77109',email:'watanabe.daisuke@example.com',last:'渡辺',first:'大輔',lastK:'わたなべ',firstK:'だいすけ',birth:'1970',sex:'男性',hosp:'北海道大学病院',hospK:'ほっかいどうだいがくびょういん',position:'准教授',job:'医師',hospType:'大学病院',beds:'920',pref:'北海道',addr:'北海道札幌市北区北14条西5丁目',bldg:'',tel:'011-706-XXXX',telMatch:'一致',mainSpec:'29 整形外科',subSpec:'50 リハビリテーション科'},
  {id:'HCP-88102',email:'ito.mari@example.com',last:'伊藤',first:'真理',lastK:'いとう',firstK:'まり',birth:'1990',sex:'女性',hosp:'横浜こども医療センター',hospK:'よこはまこどもいりょうせんたー',position:'医員',job:'医師',hospType:'総合病院',beds:'380',pref:'神奈川県',addr:'神奈川県横浜市南区六ツ川2-138-4',bldg:'',tel:'045-711-XXXX',telMatch:'一致',mainSpec:'13 小児科',subSpec:'10 アレルギー科 / 12 感染症内科'},
  {id:'HCP-11223',email:'yamamoto.yusuke@example.com',last:'山本',first:'雄介',lastK:'やまもと',firstK:'ゆうすけ',birth:'1980',sex:'男性',hosp:'東京メンタルヘルスクリニック',hospK:'とうきょうめんたるへるすくりにっく',position:'院長',job:'医師',hospType:'クリニック',beds:'0',pref:'東京都',addr:'東京都新宿区西新宿1-25-1',bldg:'新宿センタービル8F',tel:'03-3344-XXXX',telMatch:'一致',mainSpec:'14 精神科',subSpec:'15 心療内科'},
  {id:'HCP-33445',email:'nakamura.sakura@example.com',last:'中村',first:'さくら',lastK:'なかむら',firstK:'さくら',birth:'1985',sex:'女性',hosp:'大阪総合医療センター',hospK:'おおさかそうごういりょうせんたー',position:'副部長',job:'医師',hospType:'総合病院',beds:'600',pref:'大阪府',addr:'大阪府大阪市都島区都島本通2-13-22',bldg:'',tel:'06-6929-XXXX',telMatch:'一致',mainSpec:'01 内科',subSpec:'08 血液内科 / 12 感染症内科'},
  {id:'HCP-55667',email:'kobayashi.takuya@example.com',last:'小林',first:'拓也',lastK:'こばやし',firstK:'たくや',birth:'1973',sex:'男性',hosp:'愛知がんセンター',hospK:'あいちがんせんたー',position:'部長',job:'医師',hospType:'総合病院',beds:'500',pref:'愛知県',addr:'愛知県名古屋市千種区鹿子殿1-1',bldg:'',tel:'052-762-XXXX',telMatch:'一致',mainSpec:'20 外科',subSpec:'25 消化器外科（胃腸外科）'},
  {id:'HCP-99001',email:'kato.yuko@example.com',last:'加藤',first:'優子',lastK:'かとう',firstK:'ゆうこ',birth:'1983',sex:'女性',hosp:'福岡大学病院',hospK:'ふくおかだいがくびょういん',position:'講師',job:'医師',hospType:'大学病院',beds:'900',pref:'福岡県',addr:'福岡県福岡市城南区七隈7-45-1',bldg:'',tel:'092-801-XXXX',telMatch:'一致',mainSpec:'07 糖尿病内科（代謝内科）',subSpec:'01 内科 / 03 循環器内科'}
];

function memFilter(){
  var q=(document.getElementById('mem-q').value||'').toLowerCase();
  var spec=document.getElementById('mem-f-spec').value;
  var type=document.getElementById('mem-f-type').value;
  var pref=document.getElementById('mem-f-pref').value;
  var stEl=document.getElementById('mem-f-status');
  var status=stEl?stEl.value:'';
  var rows=document.querySelectorAll('.mem-row');
  var cnt=0;
  rows.forEach(function(r){
    var mq=!q||(r.getAttribute('data-search')||'').toLowerCase().indexOf(q)>=0;
    var ms=!spec||r.getAttribute('data-spec')===spec;
    var mt=!type||r.getAttribute('data-type')===type;
    var mp=!pref||r.getAttribute('data-pref')===pref;
    var mst=!status||r.getAttribute('data-status')===status;
    var show=mq&&ms&&mt&&mp&&mst;
    r.style.display=show?'':'none';
    if(show)cnt++;
  });
  var n=document.getElementById('mem-n');if(n)n.textContent=cnt;
}
window.memFilter=memFilter;

function memResetFilter(){
  document.getElementById('mem-q').value='';
  document.getElementById('mem-f-spec').value='';
  document.getElementById('mem-f-type').value='';
  document.getElementById('mem-f-pref').value='';
  var stEl=document.getElementById('mem-f-status');
  if(stEl)stEl.value='';
  memFilter();
}
window.memResetFilter=memResetFilter;

function memDetailTabSwitch(t){
  var tabs=document.querySelectorAll('#mem-d-tabs .tab');
  tabs.forEach(function(el){el.classList.toggle('on',el.getAttribute('data-mtab')===t);});
  var info=document.getElementById('mem-d-tab-info');
  var pts=document.getElementById('mem-d-tab-points');
  if(info)info.style.display=(t==='info')?'':'none';
  if(pts)pts.style.display=(t==='points')?'':'none';
  if(typeof lucide!=='undefined')lucide.createIcons();
}
window.memDetailTabSwitch=memDetailTabSwitch;

var MEM_POINTS={
  0:[
    {kind:'獲得',date:'2026/03/28',desc:'糖尿病治療意識調査 2026/Q1 回答完了',amt:200,bal:12400},
    {kind:'交換',date:'2026/03/15',desc:'Amazonギフト券 5,000円分',amt:-5000,bal:12200},
    {kind:'獲得',date:'2025/12/15',desc:'生活習慣病実態調査 2025/Q4 回答完了',amt:150,bal:17200},
    {kind:'獲得',date:'2025/09/22',desc:'循環器治療ガイドライン認知調査 ScreenOut',amt:50,bal:17050},
    {kind:'交換',date:'2025/08/10',desc:'PayPayポイント 3,000pt',amt:-3000,bal:17000},
    {kind:'獲得',date:'2025/07/05',desc:'高血圧薬剤選択調査 回答完了',amt:200,bal:20000}
  ],
  1:[
    {kind:'獲得',date:'2026/03/27',desc:'糖尿病治療意識調査 2026/Q1 回答完了',amt:200,bal:8200},
    {kind:'交換',date:'2026/02/20',desc:'Amazonギフト券 2,000円分',amt:-2000,bal:8000},
    {kind:'獲得',date:'2025/11/08',desc:'心不全治療選択調査 回答完了',amt:300,bal:10000},
    {kind:'獲得',date:'2025/09/12',desc:'循環器ガイドライン調査 回答完了',amt:200,bal:9700}
  ],
  2:[
    {kind:'獲得',date:'2026/03/26',desc:'糖尿病治療意識調査 2026/Q1 Incomplete',amt:0,bal:3100},
    {kind:'獲得',date:'2026/01/18',desc:'インスリン処方実態調査 回答完了',amt:250,bal:3100},
    {kind:'交換',date:'2025/11/03',desc:'Amazonギフト券 1,000円分',amt:-1000,bal:2850},
    {kind:'獲得',date:'2025/10/15',desc:'糖尿病新薬認知度調査 回答完了',amt:200,bal:3850}
  ],
  3:[
    {kind:'獲得',date:'2026/02/10',desc:'皮膚科処方実態調査 回答完了',amt:200,bal:6500},
    {kind:'交換',date:'2025/12/22',desc:'Amazonギフト券 3,000円分',amt:-3000,bal:6300}
  ],
  4:[
    {kind:'獲得',date:'2026/03/22',desc:'整形外科リハビリ実態調査 回答完了',amt:250,bal:9450},
    {kind:'交換',date:'2026/01/30',desc:'現金振込 5,000円',amt:-5000,bal:9200},
    {kind:'獲得',date:'2025/12/05',desc:'高齢者運動器疾患調査 回答完了',amt:300,bal:14200}
  ],
  5:[
    {kind:'獲得',date:'2026/03/15',desc:'小児予防接種意識調査 回答完了',amt:150,bal:4200},
    {kind:'獲得',date:'2025/11/20',desc:'小児喘息治療調査 回答完了',amt:200,bal:4050}
  ],
  6:[
    {kind:'獲得',date:'2026/02/28',desc:'うつ病薬物療法調査 回答完了',amt:300,bal:7800},
    {kind:'交換',date:'2025/10/10',desc:'Amazonギフト券 5,000円分',amt:-5000,bal:7500}
  ],
  7:[
    {kind:'獲得',date:'2026/03/10',desc:'内科外来診療実態調査 回答完了',amt:200,bal:5600}
  ],
  8:[
    {kind:'獲得',date:'2026/03/05',desc:'がん化学療法調査 回答完了',amt:350,bal:11500},
    {kind:'交換',date:'2025/12/15',desc:'現金振込 8,000円',amt:-8000,bal:11150}
  ],
  9:[
    {kind:'獲得',date:'2026/03/20',desc:'糖尿病治療満足度調査 回答完了',amt:200,bal:5400},
    {kind:'獲得',date:'2025/11/28',desc:'GLP-1薬剤認知度調査 回答完了',amt:250,bal:5200}
  ]
};

function memDetail(idx){
  var d=MEM_DATA[idx];if(!d)return;
  memCurrentIdx=idx;
  memEditToggle(false);
  memDetailTabSwitch('info');
  document.getElementById('mem-list').style.display='none';
  document.getElementById('mem-detail').style.display='';
  var set=function(id,v){var el=document.getElementById(id);if(el)el.textContent=v||'—';};
  set('mem-d-id',d.id);
  set('mem-d-email',d.email);
  set('mem-d-last',d.last);
  set('mem-d-first',d.first);
  set('mem-d-last-k',d.lastK);
  set('mem-d-first-k',d.firstK);
  set('mem-d-birth',d.birth+'年');
  set('mem-d-sex',d.sex);
  set('mem-d-job',d.job);
  set('mem-d-position',d.position);
  set('mem-d-main-spec',d.mainSpec);
  set('mem-d-sub-spec',d.subSpec);
  set('mem-d-hosp',d.hosp);
  set('mem-d-hosp-k',d.hospK);
  set('mem-d-hosp-type',d.hospType);
  set('mem-d-beds',d.beds==='0'?'なし（無床）':d.beds+'床');
  set('mem-d-pref',d.pref);
  set('mem-d-addr',d.addr);
  set('mem-d-bldg',d.bldg);
  set('mem-d-tel',d.tel);
  set('mem-d-tel-match',d.telMatch);
  var surveys=MEM_SURVEYS[idx]||[];
  var tbody=document.getElementById('mem-d-survey-tbody');
  var empty=document.getElementById('mem-d-survey-empty');
  var cntEl=document.getElementById('mem-d-survey-n');
  if(cntEl)cntEl.textContent=surveys.length;
  if(empty)empty.style.display=surveys.length?'none':'';
  if(tbody){
    var stMap={Complete:'t-gn',Screenout:'t-am',QuotaFull:'t-rd',Incomplete:'t-nv'};
    var html='';
    surveys.forEach(function(s){
      var cls=stMap[s.status]||'';
      html+='<tr><td class="fm">'+s.sid+'</td><td>'+s.name+'</td><td class="ts">'+s.date+'</td><td><span class="'+cls+'">'+s.status+'</span></td><td class="tr">'+s.pt+'pt</td><td class="tr">'+s.loi+'</td></tr>';
    });
    tbody.innerHTML=html;
  }
  // ポイント履歴
  var pts=MEM_POINTS[idx]||[];
  var ptBody=document.getElementById('mem-d-pt-tbody');
  var ptEmpty=document.getElementById('mem-d-pt-empty');
  var ptN=document.getElementById('mem-d-pt-n');
  if(ptN)ptN.textContent=pts.length;
  if(ptEmpty)ptEmpty.style.display=pts.length?'none':'';
  if(ptBody){
    var fmt=function(n){return n.toLocaleString('ja-JP');};
    var html2='';
    pts.forEach(function(p){
      var kindCls=p.kind==='交換'?'sb pend':'sb live';
      var amtCls=p.amt<0?'t-rd':(p.amt>0?'t-gn':'tm');
      var amtStr=p.amt>0?'+'+fmt(p.amt)+'pt':(p.amt<0?fmt(p.amt)+'pt':'±0pt');
      html2+='<tr><td><span class="'+kindCls+'">'+p.kind+'</span></td><td class="ts">'+p.date+'</td><td>'+p.desc+'</td><td class="tr fb '+amtCls+'">'+amtStr+'</td><td class="tr fb">'+fmt(p.bal)+'pt</td></tr>';
    });
    ptBody.innerHTML=html2;
  }
  // ポイントサマリ
  var balance=pts.length?pts[0].bal:0;
  var totalEarned=0,totalRedeemed=0;
  pts.forEach(function(p){if(p.amt>0)totalEarned+=p.amt;else if(p.amt<0)totalRedeemed+=Math.abs(p.amt);});
  var fmt2=function(n){return n.toLocaleString('ja-JP')+'pt';};
  var bEl=document.getElementById('mem-d-pt-balance');if(bEl)bEl.textContent=fmt2(balance);
  var eEl=document.getElementById('mem-d-pt-earned');if(eEl)eEl.textContent=fmt2(totalEarned);
  var rEl=document.getElementById('mem-d-pt-redeemed');if(rEl)rEl.textContent=fmt2(totalRedeemed);
  if(typeof lucide!=='undefined')lucide.createIcons();
}
window.memDetail=memDetail;

function memPtAdjustOpen(){
  var m=document.getElementById('mem-pt-modal');if(!m)return;
  var k=document.getElementById('mem-pt-adj-kind');if(k)k.value='獲得';
  var d=document.getElementById('mem-pt-adj-desc');if(d)d.value='';
  var a=document.getElementById('mem-pt-adj-amt');if(a)a.value='';
  m.style.display='flex';
  if(typeof lucide!=='undefined')lucide.createIcons();
  if(d)setTimeout(function(){d.focus();},50);
}
window.memPtAdjustOpen=memPtAdjustOpen;

function memPtAdjustClose(){
  var m=document.getElementById('mem-pt-modal');if(m)m.style.display='none';
}
window.memPtAdjustClose=memPtAdjustClose;

function memPtAdjustSave(){
  var kind=(document.getElementById('mem-pt-adj-kind')||{}).value||'';
  var desc=((document.getElementById('mem-pt-adj-desc')||{}).value||'').trim();
  var amtRaw=(document.getElementById('mem-pt-adj-amt')||{}).value;
  var amt=parseInt(amtRaw,10);
  if(!kind){alert('区分を選択してください');return;}
  if(!desc){alert('内容を入力してください');return;}
  if(isNaN(amt)||amt===0){alert('ポイント数を入力してください（0以外）');return;}
  if(kind==='交換'||kind==='失効')amt=-Math.abs(amt);
  var tbody=document.getElementById('mem-d-pt-tbody');
  var prevBal=0;
  if(tbody&&tbody.firstElementChild){
    var cells=tbody.firstElementChild.querySelectorAll('td');
    if(cells.length>=5){
      prevBal=parseInt((cells[4].textContent||'0').replace(/[^0-9-]/g,''),10)||0;
    }
  }
  var newBal=prevBal+amt;
  var today=new Date();
  var y=today.getFullYear();var mo=('0'+(today.getMonth()+1)).slice(-2);var da=('0'+today.getDate()).slice(-2);
  var dateStr=y+'/'+mo+'/'+da;
  var fmt=function(n){return n.toLocaleString('ja-JP');};
  var kindCls=(amt<0)?'sb pend':'sb live';
  var amtCls=amt<0?'t-rd':'t-gn';
  var amtStr=amt>0?'+'+fmt(amt)+'pt':fmt(amt)+'pt';
  var tr=document.createElement('tr');
  tr.innerHTML='<td><span class="'+kindCls+'">'+kind+'</span></td><td class="ts">'+dateStr+'</td><td>'+desc+'（管理者調整）</td><td class="tr fb '+amtCls+'">'+amtStr+'</td><td class="tr fb">'+fmt(newBal)+'pt</td>';
  if(tbody)tbody.insertBefore(tr,tbody.firstChild);
  var ptEmpty=document.getElementById('mem-d-pt-empty');if(ptEmpty)ptEmpty.style.display='none';
  var ptN=document.getElementById('mem-d-pt-n');if(ptN)ptN.textContent=(parseInt(ptN.textContent,10)||0)+1;
  var bEl=document.getElementById('mem-d-pt-balance');if(bEl)bEl.textContent=fmt(newBal)+'pt';
  if(amt>0){
    var eEl=document.getElementById('mem-d-pt-earned');
    if(eEl){var cur=parseInt((eEl.textContent||'0').replace(/[^0-9]/g,''),10)||0;eEl.textContent=fmt(cur+amt)+'pt';}
  }else{
    var rEl=document.getElementById('mem-d-pt-redeemed');
    if(rEl){var cur2=parseInt((rEl.textContent||'0').replace(/[^0-9]/g,''),10)||0;rEl.textContent=fmt(cur2+Math.abs(amt))+'pt';}
  }
  memPtAdjustClose();
  alert('モック: ポイントを調整しました');
}
window.memPtAdjustSave=memPtAdjustSave;

var MEM_SURVEYS={
  0:[
    {sid:'SV-1001',name:'糖尿病治療意識調査 2026/Q1',date:'2026/03/28 14:22',status:'Complete',pt:200,loi:'11分20秒'},
    {sid:'SV-0998',name:'生活習慣病実態調査 2025/Q4',date:'2025/12/15 10:30',status:'Complete',pt:150,loi:'8分45秒'},
    {sid:'SV-0985',name:'循環器治療ガイドライン認知調査',date:'2025/09/22 16:05',status:'Screenout',pt:100,loi:'3分10秒'}
  ],
  1:[
    {sid:'SV-1001',name:'糖尿病治療意識調査 2026/Q1',date:'2026/03/27 09:15',status:'Complete',pt:200,loi:'9分50秒'},
    {sid:'SV-0990',name:'心不全治療選択調査',date:'2025/11/08 11:40',status:'Complete',pt:300,loi:'14分20秒'}
  ],
  2:[
    {sid:'SV-1001',name:'糖尿病治療意識調査 2026/Q1',date:'2026/03/26 18:40',status:'Incomplete',pt:0,loi:'—'},
    {sid:'SV-0995',name:'糖尿病薬剤使用実態調査',date:'2025/10/30 09:20',status:'Complete',pt:250,loi:'12分05秒'},
    {sid:'SV-0980',name:'インスリン治療意識調査',date:'2025/08/14 15:30',status:'Complete',pt:200,loi:'10分30秒'},
    {sid:'SV-0970',name:'血糖管理アプリ利用実態調査',date:'2025/06/20 10:15',status:'QuotaFull',pt:100,loi:'2分50秒'}
  ],
  3:[
    {sid:'SV-1003',name:'皮膚科処方実態調査',date:'2026/03/25 11:03',status:'Complete',pt:200,loi:'9分15秒'}
  ],
  4:[
    {sid:'SV-1001',name:'糖尿病治療意識調査 2026/Q1',date:'2026/03/25 11:03',status:'Screenout',pt:100,loi:'4分20秒'},
    {sid:'SV-0992',name:'関節リウマチ治療調査',date:'2025/11/20 14:10',status:'Complete',pt:300,loi:'15分40秒'},
    {sid:'SV-0975',name:'骨粗鬆症治療意識調査',date:'2025/07/10 09:50',status:'Complete',pt:200,loi:'11分55秒'}
  ],
  5:[
    {sid:'SV-0988',name:'小児ワクチン接種実態調査',date:'2025/12/01 13:25',status:'Complete',pt:200,loi:'10分10秒'},
    {sid:'SV-0972',name:'小児アレルギー治療調査',date:'2025/07/05 10:40',status:'Complete',pt:150,loi:'8分30秒'}
  ],
  6:[],
  7:[
    {sid:'SV-1001',name:'糖尿病治療意識調査 2026/Q1',date:'2026/03/22 21:30',status:'Screenout',pt:100,loi:'3分45秒'},
    {sid:'SV-0996',name:'高血圧治療選択調査',date:'2025/11/12 16:20',status:'Complete',pt:250,loi:'13分00秒'}
  ],
  8:[
    {sid:'SV-1001',name:'糖尿病治療意識調査 2026/Q1',date:'2026/03/21 13:07',status:'Complete',pt:200,loi:'12分45秒'},
    {sid:'SV-0991',name:'大腸がん術後経過観察調査',date:'2025/11/05 10:00',status:'Complete',pt:300,loi:'16分20秒'},
    {sid:'SV-0978',name:'内視鏡検査頻度調査',date:'2025/08/02 14:50',status:'Complete',pt:150,loi:'7分55秒'}
  ],
  9:[
    {sid:'SV-1001',name:'糖尿病治療意識調査 2026/Q1',date:'2026/03/19 19:18',status:'Complete',pt:200,loi:'10分30秒'},
    {sid:'SV-0993',name:'糖尿病合併症管理調査',date:'2025/11/25 11:35',status:'Complete',pt:250,loi:'14分10秒'}
  ]
};

var memCurrentIdx=null;

function memBack(){
  memEditToggle(false);
  document.getElementById('mem-detail').style.display='none';
  document.getElementById('mem-list').style.display='';
}
window.memBack=memBack;

function memEditToggle(editing){
  var btnEdit=document.getElementById('mem-btn-edit');
  var btnSave=document.getElementById('mem-btn-save');
  var btnCancel=document.getElementById('mem-btn-cancel');
  if(btnEdit)btnEdit.style.display=editing?'none':'inline-flex';
  if(btnSave)btnSave.style.display=editing?'inline-flex':'none';
  if(btnCancel)btnCancel.style.display=editing?'inline-block':'none';

  var rows=document.querySelectorAll('.mem-editable');
  rows.forEach(function(row){
    var valEl=row.querySelector('.dr-v');
    if(!valEl)return;
    var field=row.getAttribute('data-field');
    var dtype=row.getAttribute('data-type')||'text';
    var suffix=row.getAttribute('data-suffix')||'';

    if(editing){
      var raw=valEl.textContent.trim();
      if(suffix&&raw.endsWith(suffix))raw=raw.slice(0,-suffix.length);
      if(field==='beds'){raw=raw.replace(/[^0-9]/g,'');}
      valEl.setAttribute('data-original',valEl.textContent.trim());

      if(dtype==='select'){
        var opts=(row.getAttribute('data-options')||'').split(',');
        var html='<select class="fs mem-edit-input" data-field="'+field+'" style="font-size:13px;padding:4px 8px">';
        opts.forEach(function(o){html+='<option'+(o===raw?' selected':'')+'>'+o+'</option>';});
        html+='</select>';
        valEl.innerHTML=html;
      }else{
        valEl.innerHTML='<input type="text" class="fs mem-edit-input" data-field="'+field+'" value="'+raw.replace(/"/g,'&quot;')+'" style="font-size:13px;padding:4px 8px">';
      }
    }else{
      var original=valEl.getAttribute('data-original');
      if(original!==null){
        valEl.textContent=original;
        valEl.removeAttribute('data-original');
      }
    }
  });
  if(typeof lucide!=='undefined')lucide.createIcons();
}
window.memEditToggle=memEditToggle;

function memEditSave(){
  if(memCurrentIdx===null)return;
  var d=MEM_DATA[memCurrentIdx];
  var inputs=document.querySelectorAll('.mem-edit-input');
  inputs.forEach(function(inp){
    var field=inp.getAttribute('data-field');
    if(field&&d.hasOwnProperty(field)){
      d[field]=inp.value;
    }
  });
  memEditToggle(false);
  memDetail(memCurrentIdx);
  var saveBtn=document.getElementById('mem-btn-save');
  if(saveBtn){
    var orig=saveBtn.innerHTML;
    saveBtn.innerHTML='<i data-lucide="check" style="width:14px;height:14px"></i>保存しました';
    saveBtn.style.display='inline-flex';
    saveBtn.disabled=true;
    setTimeout(function(){
      saveBtn.innerHTML=orig;
      saveBtn.style.display='none';
      saveBtn.disabled=false;
      if(typeof lucide!=='undefined')lucide.createIcons();
    },1500);
  }
}
window.memEditSave=memEditSave;

})();
