const STATIC_TEXT = {
  "calculationNotes": "Calculation details",
  "estimateNotes": "About this estimate",
  "mixed": "Parallel strings",
  "ledsPerString": "Series LEDs per string",
  "stringHint": "Total LEDs must be a multiple of the number per string. All strings use the same LED type.",
  "advanced": "Advanced options",
  "recommendedPower": "Recommended rating per resistor",
  "resistorCount": "Resistors required",
  "branchCurrent": "Current per LED · nominal / max.",
  "ratingNote": "Power rating uses a 2× margin over calculated dissipation. Check the resistor datasheet for temperature derating.",
  "sourceMode": "Power source",
  "sourceBattery": "Use battery",
  "sourceExternal": "External supply",
  "sourceVoltage": "Supply voltage",
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
  const positive=v=>Number.isFinite(v)&&v>0;
  const external=x.sourceMode==='external';
  const n=x.ledCount,b=x.batteryCount;
  if(!positive(x.vf)||!positive(x.targetCurrent)||!Number.isInteger(n)||n<1||n>1000
    || !['parallel','series','mixed'].includes(x.ledConnection))return {error:'invalid'};
  const validPack=positive(x.batteryNominal)&&positive(x.batteryMax)&&x.batteryMax>=x.batteryNominal
    &&Number.isInteger(b)&&b>=1&&b<=100&&['parallel','series'].includes(x.batteryConnection);
  if(!external&&!validPack)return {error:'invalid'};
  if(external&&!positive(x.sourceVoltage))return {error:'invalid'};
  const packNominal=validPack?x.batteryNominal*(x.batteryConnection==='series'?b:1):null;
  const packMax=validPack?x.batteryMax*(x.batteryConnection==='series'?b:1):null;
  const packCapacity=validPack&&positive(x.capacity)?x.capacity*(x.batteryConnection==='parallel'?b:1):null;
  const seriesCount=x.ledConnection==='mixed'?x.ledsPerString:x.ledConnection==='series'?n:1;
  if(!Number.isInteger(seriesCount)||seriesCount<1||seriesCount>n||n%seriesCount!==0)return {error:'invalidStrings'};
  const ledDrop=x.vf*seriesCount;
  const supplyMax=external?x.sourceVoltage:packMax;
  const supplyNominal=external?x.sourceVoltage:packNominal;
  const common={packNominal,packMax,packCapacity,ledDrop,supplyMax,supplyNominal,external};
  if(supplyMax<=ledDrop)return {...common,error:'insufficient'};
  const idealResistance=(supplyMax-ledDrop)/(x.targetCurrent/1000);
  const resistance=nextE24(idealResistance);
  if(!resistance)return {...common,error:'noE24'};
  const branchCount=n/seriesCount;
  const nominalBranchCurrent=Math.max(0,supplyNominal-ledDrop)/resistance*1000;
  const maxBranchCurrent=(supplyMax-ledDrop)/resistance*1000;
  const totalCurrent=nominalBranchCurrent*branchCount;
  const maxResistorPower=(maxBranchCurrent/1000)**2*resistance;
  // Choose a standard rating with at least 2x dissipation headroom.
  const recommendedPower=[0.125,0.25,0.5,1,2,3,5,10,20,25,50,100].find(w=>w>=2*maxResistorPower)??null;
  const validCapacity=packCapacity!==null&&positive(x.usablePercent)&&x.usablePercent<=100;
  const usableCapacity=validCapacity?packCapacity*x.usablePercent/100:null;
  const warning=!external&&totalCurrent===0?'noMargin':null;
  const runtimeIssue=external?'externalRuntime':warning??(!validCapacity?'invalidCapacity':null);
  const runtimeHours=runtimeIssue?null:usableCapacity/totalCurrent;
  const validHours=positive(x.hoursPerDay)&&x.hoursPerDay<=24;
  const runtimeDays=runtimeHours!==null&&validHours?runtimeHours/x.hoursPerDay:null;
  return {...common,idealResistance,resistance,branchCount,nominalBranchCurrent,maxBranchCurrent,totalCurrent,
    maxResistorPower,recommendedPower,ledPower:x.vf*n*nominalBranchCurrent/1000,usableCapacity,
    runtimeHours,runtimeDays,runtimeIssue,warning,perCellCurrent:external?null:totalCurrent/(x.batteryConnection==='parallel'?b:1)};
}
if(typeof module!=='undefined') module.exports={calculate,nextE24};

if(typeof document!=='undefined'){
  const $=id=>document.getElementById(id);
  const ids=['ledsPerString','vf','targetCurrent','ledCount','ledConnection','batteryNominal','batteryMax','capacity','batteryCount','batteryConnection','hoursPerDay','usablePercent'];
  const staticNodes=[...document.querySelectorAll('[data-i18n]')];
  for(const node of staticNodes)node.dataset.es=node.textContent;
  const MESSAGES={
    es:{title:'Calculadora LED + Batería',description:'Diseña circuitos LED con resistencia, baterías y autonomía aproximada.',
      invalidCapacity:'Revisa la capacidad de la batería y el porcentaje aprovechable. La resistencia sigue siendo válida.',
      invalidHours:'Introduce horas de uso entre 0 y 24, mayores que cero, para estimar días.',
      ratingCustom:'Consultar fabricante',
      sourceBatteryHint:'Se usa la tensión máxima del pack para dimensionar la resistencia. Se actualiza al cambiar la batería.',
      sourceExternalHint:'Introduce el voltaje de la fuente que alimenta los LEDs directamente.',
      externalRuntime:'La autonomía no se estima con una fuente externa. Selecciona «Usar batería» para calcularla.',
      externalExplain:(voltage,current)=>`Resistencia calculada con una fuente de ${voltage} V. Cada rama conduce aproximadamente ${current} mA con el valor E24 recomendado.`,
      invalid:'Revisa los valores: deben ser positivos, las cantidades enteras y el voltaje máximo no menor que el nominal.',
      insufficient:'El voltaje de la fuente no supera la suma de Vf. Necesitas otra configuración o un convertidor.',
      noMargin:'El circuito podría encender recién cargado, pero a tensión nominal no queda margen para la resistencia. No se estima autonomía.',
      noE24:'No se encontró un valor E24 para esta resistencia.',
      mixed:'Una resistencia por cadena',invalidStrings:'La cantidad total de LEDs debe ser múltiplo de los LEDs por cadena.',
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
      invalidCapacity:'Check battery capacity and usable percentage. The resistor calculation remains valid.',
      invalidHours:'Enter daily use greater than 0 and up to 24 hours to estimate days.',
      ratingCustom:'Check manufacturer',
      sourceBatteryHint:'Maximum pack voltage is used to size the resistor. It updates when you change the battery.',
      sourceExternalHint:'Enter the voltage of the supply directly powering the LEDs.',
      externalRuntime:'Battery runtime is not estimated with an external supply. Select “Use battery” to calculate it.',
      externalExplain:(voltage,current)=>`Resistor sized for a ${voltage} V supply. Each branch draws approximately ${current} mA with the recommended E24 value.`,
      invalid:'Check the inputs: values must be positive, counts must be whole numbers, and maximum voltage must not be below nominal voltage.',
      insufficient:'The supply voltage does not exceed the combined LED forward voltage. Choose another setup or use a converter.',
      noMargin:'The LEDs may turn on with a fresh battery, but there is no resistor headroom at nominal voltage. Runtime cannot be estimated.',
      noE24:'No E24 resistor value was found for this configuration.',
      mixed:'One resistor per string',invalidStrings:'Total LED count must be a multiple of LEDs per string.',
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
  function clear(){for(const id of ['resistance','idealResistance','actualCurrent','resistorPower','ledPower','runtime','recommendedPower','resistorCount','branchCurrent'])$(id).textContent='—';}
  function translate(){
    document.documentElement.lang=lang;
    document.title=MESSAGES[lang].title;
    document.querySelector('meta[name="description"]').content=MESSAGES[lang].description;
    for(const node of staticNodes)node.textContent=lang==='en'?STATIC_TEXT[node.dataset.i18n]??node.dataset.es:node.dataset.es;
    const colorMarkers={white:'⚪',uv:'🟣',violet:'🟣',blue:'🔵',green:'🟢',yellow:'🟡',orange:'🟠',red:'🔴',infrared:'◉',custom:'◌'};
    for(const option of $('ledColor').options)option.textContent=`${colorMarkers[option.value]} ${option.textContent}`;
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
    $('stringField').hidden=x.ledConnection!=='mixed';
    x.sourceMode=$('sourceMode').value;
    const external=x.sourceMode==='external';
    $('sourceVoltage').readOnly=!external;
    if(!external)$('sourceVoltage').value=Number((x.batteryMax*(x.batteryConnection==='series'?x.batteryCount:1)).toFixed(6));
    x.sourceVoltage=Number($('sourceVoltage').value);
    $('sourceHint').textContent=MESSAGES[lang][external?'sourceExternalHint':'sourceBatteryHint'];
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
    $('recommendedPower').textContent=r.recommendedPower?`${formatted(r.recommendedPower,3)} W`:MESSAGES[lang].ratingCustom;
    $('resistorCount').textContent=formatted(r.branchCount,0);
    $('branchCurrent').textContent=`${formatted(r.nominalBranchCurrent,2)} / ${formatted(r.maxBranchCurrent,2)} mA`;
    $('runtime').textContent=r.runtimeHours===null?'—':`${formatted(r.runtimeHours,1)} h`;
    $('runtimeDays').textContent=r.runtimeIssue?MESSAGES[lang][r.runtimeIssue]:r.runtimeDays===null?MESSAGES[lang].invalidHours:MESSAGES[lang].days(formatted(r.runtimeDays,1),formatted(x.hoursPerDay,1));
    const coin=BATTERIES[type]?.coin;
    if(r.warning){status.textContent=MESSAGES[lang][r.warning];status.className='status show';
    }else if(!external && coin && r.perCellCurrent>=2){
      status.textContent=MESSAGES[lang].coin(formatted(r.perCellCurrent,1));
      status.className='status show';
    }else if(!external && r.packNominal-r.ledDrop<0.3){
      status.textContent=MESSAGES[lang].margin;
      status.className='status show';
    }else{status.textContent='';status.className='status';}
    $('explanation').textContent=r.runtimeIssue&&!external?MESSAGES[lang][r.runtimeIssue]:external?MESSAGES[lang].externalExplain(formatted(r.supplyMax,2),formatted(r.nominalBranchCurrent,2)):MESSAGES[lang].explain(formatted(r.packMax,2),formatted(r.packNominal,2),formatted(r.nominalBranchCurrent,2),formatted(r.usableCapacity,0));
  }
  ids.forEach(id=>$(id).addEventListener('input',update));
  $('sourceMode').addEventListener('change',update);
  $('sourceVoltage').addEventListener('input',update);
  $('ledColor').addEventListener('change',ledChange);
  $('batteryType').addEventListener('change',batteryChange);
  for(const button of document.querySelectorAll('.language-switch button'))button.addEventListener('click',()=>{
    lang=button.dataset.lang;
    try{localStorage.setItem('lumina-language',lang);}catch{}
    translate();
  });
  ledChange();batteryChange();translate();
}
