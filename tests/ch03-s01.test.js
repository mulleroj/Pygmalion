import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { CH03_SCENE_01 as scene, CH03_TEACHER_SECTIONS, chapterThreeCallback } from '../src/ch03-content.js';
import { createInitialState, setScene, applyDecision, recordLc05Answer, completeScene, getSceneAdvanceBlock, loadState, STORAGE_KEY } from '../src/state.js';
import { ambienceForScene } from '../src/content.js';
const fresh = () => setScene(createInitialState(), scene.id);
const solve = state => scene.challenge.samples.reduce((s, sample) => recordLc05Answer(s, sample.id, sample.answer), state);

test('S01 locked story, callbacks, scene metadata, Teacher sections and exact asset identity', () => {
  assert.equal(scene.id, 'ch03_s01'); assert.equal(scene.title, 'The Mouth Is a Muscle');
  assert.equal(scene.visualStage, 'in_training'); assert.equal(scene.nextScene, 'ch03_s02');
  const script = fs.readFileSync(new URL('../docs/chapters/ch03/SCRIPT.md', import.meta.url), 'utf8');
  for (const beat of [...scene.storyBeats, ...scene.reflection, ...Object.values(scene.consequenceBeats).flat()]) if (beat.text) assert.ok(script.includes(beat.text), beat.text);
  for (const strategy of ['direct', 'polite', 'boundary', null, 'unknown']) assert.ok(script.includes(chapterThreeCallback(strategy)));
  assert.equal(chapterThreeCallback(null), chapterThreeCallback('unknown'));
  assert.equal(CH03_TEACHER_SECTIONS.length, 12);
  assert.equal(scene.eliza.src, './assets/images/characters/eliza/runtime/eliza_training_focused_cutout.png');
  const source = fs.readFileSync('assets/images/characters/eliza/source/eliza_training_focused_cutout.png');
  assert.deepEqual(fs.readFileSync(scene.eliza.src), source);
  assert.equal(crypto.createHash('sha256').update(source).digest('hex'), '3bb0ecc0744f76c765d46289a8eab36c18c4bbd3be0f3f07e4d3f086013dcb76');
  assert.deepEqual(scene.voice, []); assert.equal(ambienceForScene(scene.id), null); assert.equal(ambienceForScene('ch03_s02'), null);
});

test('shared-save defaults merge old progress without persistent visual stage', () => {
  const old = { ...createInitialState(), request_strategy: 'boundary', pronunciation: 4 }; delete old.challenges.lc05; delete old.practice_preference;
  const state = loadState({ getItem: () => JSON.stringify(old) });
  assert.equal(state.practice_preference, null); assert.deepEqual(state.challenges.lc05.answers, {});
  assert.equal(state.request_strategy, 'boundary'); assert.equal(state.pronunciation, 4); assert.equal('eliza_stage' in state, false);
});

test('D06 exact IDs, one atomic signal each, convergence, invalid/outscene and event idempotence', () => {
  for (const [option, value, signal] of [['d06_slow_repeat','slow_repeat','pronunciation'],['d06_visual_model','visual_model','confidence'],['d06_own_words','own_words','independence']]) {
    const before = { ...fresh(), request_strategy: 'polite', origin_motivation: 'learning', ch02_complete: true };
    const state = applyDecision(before, 'D06', option);
    assert.equal(state.practice_preference, value); assert.equal(state[signal], 1);
    assert.equal(state.request_strategy, 'polite'); assert.equal(state.origin_motivation, 'learning'); assert.equal(state.ch02_complete, true);
    assert.deepEqual(state.applied_events, ['ch03_d06_practice_preference']);
    assert.equal(applyDecision(state, 'D06', option), state); assert.equal(applyDecision(state, 'D06', 'd06_own_words'), state);
    const completed = solve(state); assert.equal(completed.pronunciation, signal === 'pronunciation' ? 2 : 1);
    assert.equal(completeScene(completed, scene).scene, scene.id);
  }
  const state = fresh(); assert.equal(applyDecision(state,'D06','bad'),state);
  const elsewhere=setScene(state,'ch02_s05'); assert.equal(applyDecision(elsewhere,'D06','d06_slow_repeat'),elsewhere);
  const applied={...state,applied_events:['ch03_d06_practice_preference']}; assert.equal(applyDecision(applied,'D06','d06_slow_repeat'),applied);
});

test('LC05 stable key, valid attempts, retry, frozen correct items, single success signal and completion boundary', () => {
  assert.deepEqual(scene.challenge.samples.map(s=>[s.id,s.answer]), [['lc05_sample_theta','lc05_tongue_teeth'],['lc05_sample_f','lc05_lip_teeth'],['lc05_step_theta','lc05_step_tongue_air']]);
  let state=fresh(); assert.equal(recordLc05Answer(state,'lc05_sample_theta','lc05_tongue_teeth'),state);
  assert.equal(completeScene(state,scene),state);
  state=applyDecision(state,'D06','d06_slow_repeat');
  assert.ok(getSceneAdvanceBlock(state,scene));
  assert.equal(recordLc05Answer(state,'bad','lc05_tongue_teeth'),state);
  assert.equal(recordLc05Answer(state,'lc05_sample_theta','lc05_step_tongue_air'),state);
  state=recordLc05Answer(state,'lc05_sample_theta','lc05_lip_teeth'); assert.equal(state.ch03_lc05_attempts,1); assert.equal(state.pronunciation,1);
  state=recordLc05Answer(state,'lc05_sample_theta','lc05_tongue_teeth'); assert.equal(recordLc05Answer(state,'lc05_sample_theta','lc05_lip_teeth'),state);
  state=solve(state); assert.equal(state.ch03_lc05_attempts,4); assert.equal(state.pronunciation,2); assert.equal(state.challenges.lc05.completed,true);
  assert.equal(solve(state),state); assert.equal(state.ch03_s01_complete,false); assert.equal(getSceneAdvanceBlock(state,scene),'');
  const done=completeScene(state,scene); assert.equal(done.ch03_s01_complete,true); assert.equal(done.pronunciation,2);
  assert.equal(completeScene(done,scene),done); assert.deepEqual(done.applied_events,['ch03_d06_practice_preference','ch03_lc05_completed','ch03_s01_complete']);
});

test('shared runtime: render/refresh, Teacher preview and review do not save; clicks own state and never fallback', async t => {
  const originals=Object.fromEntries(['document','window','localStorage'].map(k=>[k,Object.getOwnPropertyDescriptor(globalThis,k)]));
  t.after(()=>{for(const [k,d] of Object.entries(originals)) if(d)Object.defineProperty(globalThis,k,d);else delete globalThis[k];});
  let saved=JSON.stringify(fresh()),writes=0; const nodes=new Map(),events={};
  const node=k=>{if(!nodes.has(k))nodes.set(k,{innerHTML:'',textContent:'',open:false,focus(){},scrollIntoView(){},setAttribute(){},removeAttribute(){},addEventListener(){},querySelector(){return node('close');},showModal(){this.open=true;},close(){this.open=false;}});return nodes.get(k);};
  globalThis.document={querySelector:node,addEventListener(n,fn){events[n]=fn;}};
  globalThis.window={location:{hash:'#ch03_s01',pathname:'/'},history:{state:{scene:scene.id}},setTimeout(fn){fn();},addEventListener(){}};
  globalThis.localStorage={getItem(){return saved;},setItem(k,v){assert.equal(k,STORAGE_KEY);saved=v;writes++;}};
  const {render,moveNext}=await import('../src/app.js?ch03-test');
  const click=(action,data={})=>events.click({isTrusted:false,target:{closest(){return{dataset:{action,...data},focus(){}};}}});
  render(); assert.equal(writes,0); assert.match(node('#app').innerHTML,/Chapter III · The Lessons/); assert.doesNotMatch(node('#app').innerHTML,/data-action="play-/);
  await click('open-teacher'); assert.equal((node('#teacher-content').innerHTML.match(/class="teacher-section"/g)||[]).length,12); assert.match(node('#teacher-context').textContent,/previewMode=false/);
  await click('choose-decision',{decision:'D06',option:'d06_slow_repeat'}); assert.equal(writes,0);
  await click('teacher-preview'); await click('toggle-sound'); await click('choose-tone',{tone:'bright'}); await click('answer-lc01',{sample:'forged',answer:'forged'}); await click('choose-decision',{decision:'D06',option:'d06_slow_repeat'}); await click('answer-lc05',{sample:'lc05_sample_theta',answer:'lc05_tongue_teeth'});moveNext();render();assert.equal(writes,0);
  await click('return-student'); await click('choose-decision',{decision:'D06',option:'d06_slow_repeat'}); const choice=saved;
  render();assert.equal(saved,choice);assert.match(node('#app').innerHTML,/Open transcript/);
  for(const sample of scene.challenge.samples)await click('answer-lc05',{sample:sample.id,answer:sample.answer});
  assert.equal(JSON.parse(saved).ch03_s01_complete,false);
  const before=saved,count=writes;await click('open-teacher');await click('teacher-preview');moveNext();render();assert.equal(saved,before);assert.equal(writes,count);
  await click('return-student');await click('next-scene');assert.equal(JSON.parse(saved).ch03_s01_complete,true);assert.equal(JSON.parse(saved).scene,scene.id);
  const done=saved,doneWrites=writes;await click('next-scene');await click('review-scene');render();assert.equal(saved,done);assert.equal(writes,doneWrites);
  assert.match(node('#app').innerHTML,/next scene is not yet available/);
});
