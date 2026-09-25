const STATIC_TEXT = {
  "pageTitle": "LED + Battery Calculator",
  "pageIntro": "Calculate resistance, total current, and runtime for your LEDs and battery setup.",
  "ledTitle": "LED and resistor",
  "batteryTitle": "Battery and runtime",
  "topLabel": "ELECTRONICS DESIGN TOOL",
  "eyebrow": "DESIGN WITH CLARITY",
  "heroStart": "Make every",
  "heroEnd": "count.",
  "heroText": "Calculate resistors, configure batteries, and explore how long your circuit could shine. All in one place.",
  "cta": "Start calculating",
  "heroNote": "NO SIGN-UP · WORKS OFFLINE",
  "artLabel": "ENERGY",
  "artLabelEnd": "IN BALANCE",
  "labIndex": "01 / THE LAB",
  "configure": "Configure your circuit",
  "instant": "Results update instantly ↓",
  "ledIntro": "Choose the color, current, number, and connection.",
  "ledColor": "LED color",
  "white": "White",
  "uv": "Ultraviolet",
  "violet": "Violet",
  "blue": "Blue",
  "green": "Green",
  "yellow": "Yellow",
  "orange": "Orange",
  "red": "Red",
  "infrared": "Infrared",
  "custom": "Custom",
  "vf": "Vf per LED",
  "targetCurrent": "Target current",
  "ledCount": "Number of LEDs",
  "connection": "Connection",
  "parallel": "Parallel",
  "series": "Series",
  "ledHelper": "In parallel, each LED needs its own resistor. In series, one resistor serves the full LED chain.",
  "battery": "Battery",
  "batteryIntro": "The battery pack directly powers the LEDs.",
  "cellType": "Cell type",
  "nominalV": "Nominal voltage",
  "maxV": "Maximum voltage",
  "capacity": "Capacity per cell",
  "cellCount": "Number of cells",
  "cellConnection": "Cell connection",
  "seriesVoltage": "Series · adds voltage",
  "parallelCapacity": "Parallel · adds capacity",
  "plannedUse": "Intended use",
  "useIntro": "Tune the estimate for your application.",
  "hoursDay": "Hours on per day",
  "usableCapacity": "Usable capacity",
  "useHelper": "Set the percentage yourself. Check your battery’s discharge curve to refine it.",
  "liveResult": "LIVE RESULT",
  "yourCircuit": "Your circuit,",
  "inNumbers": "by the numbers",
  "e24": "Recommended E24",
  "parallelResistor": "Per LED in parallel",
  "idealR": "Calculated value",
  "totalCurrent": "Total nominal current",
  "resistorPower": "Maximum resistor power",
  "packV": "Pack voltage nominal / max.",
  "packCapacity": "Pack capacity",
  "ledPower": "Nominal LED power",
  "runtime": "Estimated continuous runtime",
  "validConfig": "Enter a valid configuration.",
  "explainInitial": "The resistor is sized using maximum battery voltage to limit current.",
  "beforeBuild": "02 / BEFORE YOU BUILD",
  "goodEstimate": "A good estimate",
  "starts": "starts with the",
  "bottomOne": "The listed Vf and capacity values are editable examples. Runtime uses current at nominal voltage and your chosen usable capacity; actual discharge varies with chemistry, temperature, age, and load.",
  "bottomTwo": "High current can greatly reduce usable capacity in coin cells. Converters, constant-current drivers, and extra loads require a different power model.",
  "footerTag": "MADE FOR IDEAS THAT SHINE",
  "backTop": "BACK TO TOP ↑",
  "batteryAaaa": "AAAA alkaline · 1.5 V · 500 mAh",
  "batteryAaa": "AAA alkaline · 1.5 V · 1100 mAh",
  "batteryAa": "AA alkaline · 1.5 V · 2500 mAh",
  "batteryLipo": "LiPo · 3.7 V · 850 mAh",
  "battery18650": "18650 Li-ion · 3.7 V · 3000 mAh",
  "batteryCustom": "Custom"
};
/* Valores de ejemplo: reemplázalos por los de los datasheets del proyecto. */
const LEDS = {
  white:{name:'Blanco',vf:3.2,range:'3,0–5,0 V',color:'#f0f2ea'},
  uv:{name:'Ultravioleta',vf:3.4,range:'3,1–4,4 V',color:'#9a4cdb'},
  violet:{name:'Violeta',vf:3.2,range:'2,8–4,0 V',color:'#a653ed'},
  blue:{name:'Azul',vf:3.1,range:'2,5–3,7 V',color:'#3778f4'},
  green:{name:'Verde',vf:2.2,range:'1,9–4,0 V',color:'#48ba53'},
  yellow:{name:'Amarillo',vf:2.15,range:'2,1–2,2 V',color:'#f5c33b'},
  orange:{name:'Naranja',vf:2.05,range:'2,0–2,1 V',color:'#ff8e3d'},
  red:{name:'Rojo',vf:1.8,range:'1,6–2,0 V',color:'#e94747'},
  infrared:{name:'Infrarrojo',vf:1.4,range:'1,1–1,9 V',color:'#cc6390'}
};
const BATTERIES = {
  cr2032:{nominal:3,max:3.2,capacity:220,coin:true},
  cr2450:{nominal:3,max:3.2,capacity:620,coin:true},
  cr2477:{nominal:3,max:3.2,capacity:1000,coin:true},
  aaaa:{nominal:1.5,max:1.6,capacity:500},
  aaa:{nominal:1.5,max:1.6,capacity:1100},
  aa:{nominal:1.5,max:1.6,capacity:2500},
  lipo850:{nominal:3.7,max:4.2,capacity:850},
  li18650:{nominal:3.7,max:4.2,capacity:3000}
};
const E24=[10,11,12,13,15,16,18,20,22,24,27,30,33,36,39,43,47,51,56,62,68,75,82,91];

function nextE24(value){
  if(!(value>0)) return null;
  let scale=10**(Math.floor(Math.log10(value))-1);
  for(let i=0;i<14;i++,scale*=10){
    for(const item of E24){const candidate=item*scale;if(candidate>=value-1e-10)return candidate;}
  }
  return null;
}
function calculate(x){
  const n=x.ledCount,b=x.batteryCount;
  if(![x.vf,x.targetCurrent,x.batteryNominal,x.batteryMax,x.capacity,x.hoursPerDay,x.usablePercent].every(Number.isFinite)
    || x.vf<=0||x.targetCurrent<=0||x.batteryNominal<=0||x.batteryMax<x.batteryNominal||x.capacity<=0
    || !Number.isInteger(n)||n<1||n>1000||!Number.isInteger(b)||b<1||b>100
    || x.hoursPerDay<=0||x.hoursPerDay>24||x.usablePercent<=0||x.usablePercent>100
    || !['parallel','series'].includes(x.ledConnection)||!['parallel','series'].includes(x.batteryConnection)){
    return {error:'invalid'};
  }
  const packNominal=x.batteryNominal*(x.batteryConnection==='series'?b:1);
  const packMax=x.batteryMax*(x.batteryConnection==='series'?b:1);
  const packCapacity=x.capacity*(x.batteryConnection==='parallel'?b:1);
  const ledDrop=x.vf*(x.ledConnection==='series'?n:1);
  const common={packNominal,packMax,packCapacity,ledDrop};
  if(packMax<=ledDrop) return {...common,error:'insufficient'};
  if(packNominal<=ledDrop) return {...common,error:'noMargin'};
  const idealResistance=(packMax-ledDrop)/(x.targetCurrent/1000);
  const resistance=nextE24(idealResistance);
  if(!resistance)return {...common,error:'noE24'};
  const branchCount=x.ledConnection==='parallel'?n:1;
  const nominalBranchCurrent=(packNominal-ledDrop)/resistance*1000;
  const maxBranchCurrent=(packMax-ledDrop)/resistance*1000;
  const totalCurrent=nominalBranchCurrent*branchCount;
  const maxResistorPower=(maxBranchCurrent/1000)**2*resistance;
  const usableCapacity=packCapacity*x.usablePercent/100;
  const runtimeHours=usableCapacity/totalCurrent;
  return {...common,idealResistance,resistance,nominalBranchCurrent,maxBranchCurrent,totalCurrent,
    maxResistorPower,ledPower:x.vf*n*nominalBranchCurrent/1000,usableCapacity,runtimeHours,
    runtimeDays:runtimeHours/x.hoursPerDay,branchCount,perCellCurrent:totalCurrent/(x.batteryConnection==='parallel'?b:1)};
}
if(typeof module!=='undefined') module.exports={calculate,nextE24};

if(typeof document!=='undefined'){
  const $=id=>document.getElementById(id);
  const ids=['vf','targetCurrent','ledCount','ledConnection','batteryNominal','batteryMax','capacity','batteryCount','batteryConnection','hoursPerDay','usablePercent'];
  const staticNodes=[...document.querySelectorAll('[data-i18n]')];
  for(const node of staticNodes)node.dataset.es=node.textContent;
  const MESSAGES={
    es:{title:'Calculadora LED + Batería',description:'Diseña circuitos LED con resistencia, baterías y autonomía aproximada.',
      invalid:'Revisa los valores: deben ser positivos, las cantidades enteras y el voltaje máximo no menor que el nominal.',
      insufficient:'La tensión máxima del pack no supera la suma de Vf. Necesitas otra configuración o un convertidor.',
      noMargin:'El circuito podría encender recién cargado, pero a tensión nominal no queda margen para la resistencia. No se estima autonomía.',
      noE24:'No se encontró un valor E24 para esta resistencia.',
      parallel:'Una resistencia por LED',series:'Una resistencia para toda la cadena',
      noRuntime:'No hay estimación válida para esta conexión.',
      check:'Comprueba los datos y asegúrate de que la batería entregue más tensión que los LEDs.',
      hint:(name,range)=>`${name} · Vf orientativo ${range}. Ajusta el valor según el datasheet.`,
      customHint:'Introduce el Vf de tu LED según su datasheet.',
      days:(days,hours)=>`≈ ${days} días a ${hours} h diarias · cálculo orientativo`,
      coin:(current)=>`Pila botón: ${current} mA por celda es una carga exigente. La duración indicada puede sobrestimar mucho la real: consulta la curva de descarga del modelo específico.`,
      margin:'El margen de tensión nominal es inferior a 0,3 V. La corriente y el brillo caerán pronto al descargarse la batería; esta autonomía puede sobrestimar mucho la duración útil.',
      explain:(max,nom,current,capacity)=>`Se dimensiona con ${max} V (pack al máximo). A ${nom} V, cada rama conduce ≈ ${current} mA; la autonomía divide ${capacity} mAh aprovechables entre la corriente total. Al caer la tensión, también cae la luz.`},
    en:{title:'LED + Battery Calculator',description:'Design LED circuits with resistors, batteries, and approximate runtime.',
      invalid:'Check the inputs: values must be positive, counts must be whole numbers, and maximum voltage must not be below nominal voltage.',
      insufficient:'The maximum pack voltage does not exceed the combined LED forward voltage. Choose another setup or use a converter.',
      noMargin:'The LEDs may turn on with a fresh battery, but there is no resistor headroom at nominal voltage. Runtime cannot be estimated.',
      noE24:'No E24 resistor value was found for this configuration.',
      parallel:'One resistor per LED',series:'One resistor for the whole string',
      noRuntime:'No valid runtime estimate for this configuration.',
      check:'Check the inputs and make sure battery voltage exceeds the combined LED forward voltage.',
      hint:(name,range)=>`${name} · indicative Vf ${range}. Adjust it using the datasheet.`,
      customHint:'Enter your LED forward voltage from its datasheet.',
      days:(days,hours)=>`≈ ${days} days at ${hours} h per day · approximate calculation`,
      coin:(current)=>`Coin cell: ${current} mA per cell is a demanding load. Actual runtime could be much shorter: consult the specific cell’s discharge curve.`,
      margin:'Nominal voltage headroom is below 0.3 V. Current and brightness will drop quickly as the battery discharges, so this runtime may be much too high.',
      explain:(max,nom,current,capacity)=>`The resistor is sized at ${max} V (maximum pack voltage). At ${nom} V, each branch draws ≈ ${current} mA; runtime divides ${capacity} mAh of usable capacity by total current. Brightness falls as voltage drops.`}
  };
  let lang='en';
  try{if(localStorage.getItem('lumina-language')==='es')lang='es';}catch{}
  const formatted=(value,max=1)=>new Intl.NumberFormat(lang==='en'?'en-US':'es-CO',{maximumFractionDigits:max}).format(value);
  function ohms(value){return value>=1e6?`${formatted(value/1e6,2)} MΩ`:value>=1000?`${formatted(value/1000,2)} kΩ`:`${formatted(value,value<10?2:1)} Ω`;}
  function clear(){for(const id of ['resistance','idealResistance','actualCurrent','resistorPower','ledPower','runtime'])$(id).textContent='—';}
  function translate(){
    document.documentElement.lang=lang;
    document.title=MESSAGES[lang].title;
    document.querySelector('meta[name="description"]').content=MESSAGES[lang].description;
    for(const node of staticNodes)node.textContent=lang==='en'?STATIC_TEXT[node.dataset.i18n]??node.dataset.es:node.dataset.es;
    for(const button of document.querySelectorAll('.language-switch button'))button.setAttribute('aria-pressed',String(button.dataset.lang===lang));
    renderLedHint();update();
  }
  function batteryChange(){
    const battery=BATTERIES[$('batteryType').value];
    if(battery){$('batteryNominal').value=battery.nominal;$('batteryMax').value=battery.max;$('capacity').value=battery.capacity;}
    update();
  }
  function renderLedHint(){
    const led=LEDS[$('ledColor').value];
    if(led){const name=lang==='en'?STATIC_TEXT[$('ledColor').value]:led.name;
      $('ledHint').textContent=MESSAGES[lang].hint(name,lang==='en'?led.range.replaceAll(',','.'):led.range);
      $('colorDot').style.background=led.color;
    }else{$('ledHint').textContent=MESSAGES[lang].customHint;$('colorDot').style.background='#b0bdac';}
  }
  function ledChange(){
    const led=LEDS[$('ledColor').value];
    if(led)$('vf').value=led.vf;
    renderLedHint();
    update();
  }
  function update(){
    const x=Object.fromEntries(ids.map(id=>[id,['ledConnection','batteryConnection'].includes(id)?$(id).value:Number($(id).value)]));
    const r=calculate(x),status=$('status');
    const type=$('batteryType').value;
    $('resistanceCaption').textContent=MESSAGES[lang][x.ledConnection];
    $('packVoltage').textContent=r.packNominal?`${formatted(r.packNominal,2)} / ${formatted(r.packMax,2)} V`:'—';
    $('packCapacity').textContent=r.packCapacity?`${formatted(r.packCapacity,0)} mAh`:'—';
    if(r.error){clear();status.textContent=MESSAGES[lang][r.error];status.className='status show error';$('runtimeDays').textContent=MESSAGES[lang].noRuntime;$('explanation').textContent=MESSAGES[lang].check;return;}
    $('resistance').textContent=ohms(r.resistance);
    $('idealResistance').textContent=ohms(r.idealResistance);
    $('actualCurrent').textContent=`${formatted(r.totalCurrent,2)} mA`;
    $('resistorPower').textContent=r.maxResistorPower<1?`${formatted(r.maxResistorPower*1000,2)} mW`:`${formatted(r.maxResistorPower,2)} W`;
    $('ledPower').textContent=`${formatted(r.ledPower*1000,2)} mW`;
    $('runtime').textContent=`${formatted(r.runtimeHours,1)} h`;
    $('runtimeDays').textContent=MESSAGES[lang].days(formatted(r.runtimeDays,1),formatted(x.hoursPerDay,1));
    const coin=BATTERIES[type]?.coin;
    if(coin && r.perCellCurrent>=2){
      status.textContent=MESSAGES[lang].coin(formatted(r.perCellCurrent,1));
      status.className='status show';
    }else if(r.packNominal-r.ledDrop<0.3){
      status.textContent=MESSAGES[lang].margin;
      status.className='status show';
    }else{status.textContent='';status.className='status';}
    $('explanation').textContent=MESSAGES[lang].explain(formatted(r.packMax,2),formatted(r.packNominal,2),formatted(r.nominalBranchCurrent,2),formatted(r.usableCapacity,0));
  }
  ids.forEach(id=>$(id).addEventListener('input',update));
  $('ledColor').addEventListener('change',ledChange);
  $('batteryType').addEventListener('change',batteryChange);
  for(const button of document.querySelectorAll('.language-switch button'))button.addEventListener('click',()=>{
    lang=button.dataset.lang;
    try{localStorage.setItem('lumina-language',lang);}catch{}
    translate();
  });
  ledChange();batteryChange();translate();
}
