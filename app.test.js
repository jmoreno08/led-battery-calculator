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
