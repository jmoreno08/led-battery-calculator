const test = require('node:test');
const assert = require('node:assert/strict');
const {calculate} = require('./app.js');
const base = {vf:1.8,targetCurrent:11,ledCount:2,ledConnection:'parallel',
  batteryNominal:3.7,batteryMax:4.2,capacity:850,batteryCount:1,
  batteryConnection:'series',hoursPerDay:8,usablePercent:80};

test('battery mode retains maximum-voltage sizing and runtime', () => {
  const r=calculate(base);
  assert.equal(r.resistance,220);
  assert.ok(Math.abs(r.runtimeHours-39.368421)<0.00001);
});
test('external supply sizes resistance independently of pack voltage', () => {
  const r=calculate({...base,sourceMode:'external',sourceVoltage:5});
  assert.equal(r.resistance,300);
  assert.ok(Math.abs(r.totalCurrent-21.333333)<0.00001);
  assert.equal(r.runtimeHours,null);
  assert.equal(r.runtimeDays,null);
  assert.equal(calculate({...base,sourceMode:'external',sourceVoltage:12,ledConnection:'series'}).resistance,820);
});
test('external supply rejects invalid voltage and insufficient headroom', () => {
  for(const sourceVoltage of [0,-1,NaN,Infinity])
    assert.equal(calculate({...base,sourceMode:'external',sourceVoltage}).error,'invalid');
  for(const sourceVoltage of [1,1.8])
    assert.equal(calculate({...base,sourceMode:'external',sourceVoltage}).error,'insufficient');
});

test('external resistor ignores all battery and usage fields',()=>{
 const r=calculate({vf:1.8,targetCurrent:11,ledCount:2,ledConnection:'parallel',sourceMode:'external',sourceVoltage:5});
 assert.equal(r.resistance,300);
});
test('missing capacity does not erase resistance',()=>{
 const r=calculate({...base,capacity:0});assert.equal(r.resistance,220);assert.equal(r.runtimeHours,null);
});
test('no nominal headroom preserves resistor and suppresses runtime',()=>{
 const r=calculate({...base,vf:3.8,ledCount:1});assert.equal(r.resistance,39);assert.equal(r.runtimeHours,null);assert.equal(r.warning,'noMargin');
});
test('resistor count and power rating cover the circuit',()=>{
 const r=calculate(base);assert.equal(r.branchCount,2);assert.ok(r.recommendedPower>=2*r.maxResistorPower);
});
test('mixed strings use one resistor per string and sum branch currents',()=>{
 const r=calculate({...base,sourceMode:'external',sourceVoltage:12,ledCount:6,ledConnection:'mixed',ledsPerString:3});
 assert.equal(r.branchCount,2);assert.equal(r.resistance,620);
 assert.ok(Math.abs(r.totalCurrent-2*r.nominalBranchCurrent)<1e-10);
 assert.equal(calculate({...base,ledCount:5,ledConnection:'mixed',ledsPerString:2}).error,'invalidStrings');
});
test('invalid daily usage only suppresses days, not continuous runtime',()=>{
 const r=calculate({...base,hoursPerDay:0});assert.equal(r.resistance,220);assert.ok(r.runtimeHours>0);assert.equal(r.runtimeDays,null);
});
