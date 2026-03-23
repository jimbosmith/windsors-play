'use strict';

const express = require('express');
const http    = require('http');
const { Server } = require('socket.io');
const os      = require('os');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server);

app.use(express.static('public'));

// ── Cast ─────────────────────────────────────────────────────────────────────

const CAST = [
  'CHARLES','CAMILLA','WILLIAM','CATHERINE',
  'HARRY','MEGHAN','ANNE','EDWARD',
  'SOPHIE','ANDREW','PIPPA','BEATRICE',
  'FERGUS','ALL',
];

const CAST_INFO = {
  CHARLES:  { full:'King Charles',        desc:'Bewildered, posh beyond parody, earnest to a fault' },
  CAMILLA:  { full:'Queen Camilla',       desc:'Chain-smoking, gin-swilling, vulgarly perceptive' },
  WILLIAM:  { full:'Prince William',      desc:'Tense, managerial, faintly competitive' },
  CATHERINE:{ full:'Princess Catherine',  desc:'Smooth, composed, lethal under pressure' },
  HARRY:    { full:'Prince Harry',        desc:'On video link from California, permanently wounded' },
  MEGHAN:   { full:'Meghan',              desc:'Warmly relentless, speaking in branded empathy' },
  ANNE:     { full:'Princess Anne',       desc:'The only competent Royal. Furious that this remains true' },
  EDWARD:   { full:'Prince Edward',       desc:'Keen, lost, intermittently hobby-shaped' },
  SOPHIE:   { full:'Sophie',              desc:'Efficient, practical, occasionally letting the despair show' },
  ANDREW:   { full:'Prince Andrew',       desc:'Unwanted, oblivious, always arriving from the wrong corridor' },
  PIPPA:    { full:'Pippa',               desc:"Catherine's sister, forever somehow in the room" },
  BEATRICE: { full:'Princess Beatrice',   desc:'Earnest, pleasant, trying to seem normal against all available evidence' },
  FERGUS:   { full:'Fergus Crabbe',       desc:'Branding consultant hired to modernise the monarchy, now regretting literacy' },
  ALL:      { full:'ALL',                 desc:'Everyone speaks together' },
};

// ── Script text ───────────────────────────────────────────────────────────────

const SCRIPT_RAW = `
SCENE ONE — BUCKINGHAM PALACE, THE THRONE ROOM
SFX: Grandfather clock. A corgi yaps. Ice clinks into a glass. A long regal pause.
CHARLES: Right. Good morning, everyone. Thank you all for coming.
CAMILLA: I didn't come, darling. I live here. I was already here. I've been in this room since six because you were murmuring to that fern like it was Chairman of the Board.
CHARLES: I was not murmuring to the fern. I was consulting the fern.
CAMILLA: Charles, it's a plant.
CHARLES: Yes, and unlike most of Westminster, it listens.
CAMILLA: It doesn't listen. It absorbs water and dies in corners. Frankly, it's the ideal civil servant.
CHARLES: You've never understood my connection to the natural world.
CAMILLA: I understand it perfectly. You think shrubs are colleagues.
SFX: Brisk footsteps.
WILLIAM: Father. Camilla. We have a situation.
CHARLES: We always have a situation, William. This morning alone I've had a briefing on the economy, the Commonwealth, and a dead swan in Surrey.
WILLIAM: Public approval has fallen to thirty-one percent.
CAMILLA: Thirty-one? Good Lord. That's lower than air fryers.
CATHERINE: (entering, immaculate) I've seen the polling. We're less popular than Greggs, slightly more popular than delayed trains, and exactly level with the M25.
CAMILLA: Fair enough. We're ancient, expensive, slow-moving, and people only mention us when furious.
CHARLES: Approval is a passing weather system. We are the climate.
WILLIAM: With respect, sir, that sort of thinking is why Catherine and I have brought in outside help.
CHARLES: Outside help?
CATHERINE: A consultant.
CHARLES: A what?
CATHERINE: A branding consultant.
CHARLES: We are not a yoghurt. We do not require rebranding.
CAMILLA: Though if we were, we'd be full-fat, slightly off, and in a pot no one knows how to recycle.
CHARLES: We are the monarchy. We were here before branding.
CAMILLA: We were here before plumbing. That isn't automatically a selling point.
SFX: Large doors open.
FERGUS: Morning, everyone! Fergus Crabbe, Crabbe & Associates, Strategic Narrative and Brand Architecture. Absolute privilege to be here. Massive fan of the whole— (gestures) —heritage proposition.
CHARLES: I dislike him instantly.
FERGUS: Completely understandable, Your Majesty. Resistance is part of transformation.
CAMILLA: So is vomiting. Doesn't mean I book it into the diary.
SCENE TWO — THE AUDIT
SFX: Flip chart being set up. Marker squeaks. Someone pours more gin.
FERGUS: Right. I've completed a full Windsor brand audit. Strengths: heritage, castles, uniforms, corgis, excellent silhouette recognition. Weaknesses—
(flips page)
—everything else.
WILLIAM: That seems a touch sweeping.
FERGUS: Your digital engagement is lower than a regional Screwfix. Your TikTok presence is nonexistent. And the last attempt at relatable content was Prince Edward's YouTube channel about hedgerows.
EDWARD: It has a loyal following.
SOPHIE: It has fourteen subscribers.
FERGUS: Two are bots.
SOPHIE: One is Edward.
EDWARD: "HedgerowFan_1952" is not me.
SOPHIE: Edward, the profile photograph is literally you in a fleece.
EDWARD: It's a common face.
SOPHIE: It really isn't.
FERGUS: The point is: you need a total top-to-bottom rebrand. Individual positioning. Distinct public identities. Narrative clarity.
CHARLES: I reject every word in that sentence.
SFX: Firm footsteps. A chair scrapes back in fear.
ANNE: What the hell is this?
FERGUS: Princess Anne! Fantastic. You're actually testing extremely well—
ANNE: I'm not a ham.
FERGUS: No, of course not. I just mean your profile is strong. Your current brand reads as "competence and menace".
ANNE: My "brand" is doing the work while the rest of this family farts about in drawing rooms and christens begonias.
CHARLES: I have never christened a begonia.
CAMILLA: No, but you have blessed compost.
ANNE: Who is this man?
FERGUS: Fergus Crabbe. Branding consultant.
ANNE: In this palace?
CAMILLA: We've all hit rock bottom in our own ways.
ANNE: You have five minutes. If your ideas are merely stupid, I'm leaving. If they're dangerously stupid, I'm leaving and taking the flip chart to use as evidence.
SCENE THREE — THE VIDEO CALL
SFX: Laptop chime. The suspiciously tranquil hum of Montecito. Distant ocean. Wind chimes. Something that might be a sound bath.
HARRY: Hello? Can everyone hear me?
WILLIAM: Unfortunately.
HARRY: Great. Meghan's just finishing her morning intention practice.
CAMILLA: Is that what we're calling drinking now? Because I've set several intentions already.
MEGHAN: (joining, luminous) Hi everyone. Before we begin, I just want to honour the courage of this moment, and say how grateful I am that we're all choosing to gather in a space of authentic—
ANNE: Meghan. Less healing. More nouns.
MEGHAN: Harry and I have a lot of experience in brand repositioning.
WILLIAM: Have you?
HARRY: Yes, William, we have. We transitioned from senior royals to globally recognised impact-led storytellers.
CAMILLA: You moved to California and started speaking in brochures.
HARRY: We found freedom.
ANNE: And yet you keep logging back in.
MEGHAN: We didn't leave the narrative. We became the narrative.
WILLIAM: You became the spin-off.
MEGHAN: Spin-offs often outperform the original. Frasier. Better Call Saul. Us.
WILLIAM: You did not just compare your marriage to Frasier.
HARRY: It's not about Frasier, William. It's about thriving after transition.
CAMILLA: Darling, so was diarrhoea. Doesn't make it prestige television.
CHARLES: Harry, this meeting concerns the family brand. The Crown. The nation. Not the—
(searching)
—candle wing of California.
MEGHAN: It's actually not candles anymore, Charles. It's an integrated lifestyle ecosystem.
CAMILLA: Of course it is. That's what all the worst things call themselves.
SCENE FOUR — THE CORRIDOR
SFX: Quick footsteps on polished stone.
CATHERINE: Ignore all of that. What's the actual plan?
FERGUS: Operation New Crown. Phase one: identify each Royal's unique selling point. Phase two: content pillars. Phase three: coordinated rollout positioning the monarchy as modern, relevant, and not actively embarrassing.
CATHERINE: I admire the optimism.
FERGUS: The King is surprisingly workable.
CATHERINE: Is he?
FERGUS: Absolutely. "Eccentric environmentalist who talks to plants" plays brilliantly with younger demographics.
CATHERINE: Why?
FERGUS: They think he's either deeply spiritual or on mushrooms.
CATHERINE: He is not on mushrooms.
FERGUS: I know that. But ambiguity is engagement.
CATHERINE: William?
FERGUS: More difficult. His current profile is "capable but tightly upholstered". Premium Volvo energy.
CATHERINE: That's unkind.
FERGUS: It's also data. He needs spontaneity.
CATHERINE: William once ordered a different sandwich at Pret and referred to it as his "reckless phase".
FERGUS: Right. Then we may need a stunt.
CATHERINE: Good luck.
FERGUS: And Andrew—
CATHERINE: No.
FERGUS: But from a reputational—
CATHERINE: No brand. No rollout. No light. No microphone. Andrew is not a strategic challenge, Fergus. Andrew is asbestos.
SFX: Door opens.
ANDREW: Did someone say my name?
CATHERINE: No.
ANDREW: I definitely heard my name.
CATHERINE: That was the wind.
ANDREW: The wind said "Andrew is asbestos".
CATHERINE: The wind is very clear in this corridor. Goodbye, Andrew.
ANDREW: Fine. I'll be in the games room. I've nearly finished my Alpine jigsaw. Only Switzerland left.
SFX: Door closes.
FERGUS: Is he always like that?
CATHERINE: That was him making an effort.
SCENE FIVE — INDIVIDUAL CONSULTATIONS
Part One: Beatrice
FERGUS: Princess Beatrice. Tell me your lane.
BEATRICE: My lane?
FERGUS: Your thing. Your public essence. Your core proposition.
BEATRICE: I attend things. I wear dresses. People say, "Oh, is that one of them?"
FERGUS: Hmm.
BEATRICE: I also wore a hat once that went globally viral.
FERGUS: In a good way?
BEATRICE: No. But it was memorable.
FERGUS: Fine. "Resilient millinery icon." We'll circle back.
Part Two: Pippa
SFX: Chair change.
PIPPA: Before you begin, I understand branding. I built an entire public identity out of one walk, one dress, and one exceptionally televised staircase.
FERGUS: Respect, honestly.
PIPPA: Thank you. I'm not technically a Royal. I'm premium adjacent.
FERGUS: And what would you contribute to the rebrand?
PIPPA: Attainable aspiration. The suggestion that aristocratic proximity can, with enough tailoring, look brisk and outdoorsy.
FERGUS: Ghastly. Valuable. Next.
Part Three: Edward
EDWARD: Am I a brand?
FERGUS: Potentially. What do you do?
EDWARD: Several things.
SOPHIE: Name one.
EDWARD: Gardening.
SOPHIE: No, darling. Tuesdays are spoons.
EDWARD: Ah. Yes. Gardening's alternate Thursdays.
FERGUS: What sort of spoons?
EDWARD: Commemorative.
FERGUS: Why?
EDWARD: History.
SOPHIE: Panic.
FERGUS: Right now I'm classifying you as "miscellaneous".
EDWARD: That feels cruel.
SOPHIE: That's the kindest summary of you anyone's ever produced.
SCENE SIX — THE BIG PITCH
SFX: Everyone reassembled. The corgi chewing paper. Camilla lighting something she shouldn't.
FERGUS: Right. Final strategic recommendations. Your Majesty: The Green King. A digital series. You stroll round Highgrove consulting plants. The public votes on which herb offers the soundest constitutional advice.
CHARLES: That is not absurd. The rosemary is exceptionally wise.
CAMILLA: There he is. King of England, taking policy notes from roast potatoes.
FERGUS: Queen Camilla: The Nation's Stepmother. Dry wit. Hard truths. A drink in hand. Relatable authority.
CAMILLA: Lovely. Finally, a title I earned.
FERGUS: Prince William: The Modern King-in-Waiting. We soften the image. Nando's. Flat-pack furniture. Maybe watching football with normal people.
WILLIAM: I do watch football with normal people.
CATHERINE: Security don't count, William.
FERGUS: Princess Catherine: honestly, no rebrand required. You are already the brand. You're the load-bearing wall in a nice coat.
CATHERINE: Wonderful. So still no sick days.
FERGUS: Princess Anne: untouched. Perfection.
ANNE: Correct.
FERGUS: Prince Edward—
EDWARD: Yes?
FERGUS: We are... still ideating.
EDWARD: What does that mean?
FERGUS: It means you are the drawer in the kitchen containing batteries, string, foreign coins, elastic bands, and a torch that no longer works.
SOPHIE: God, that's him exactly.
EDWARD: Sophie!
SOPHIE: Darling, I married you. I'm allowed to identify the cupboard category.
SCENE SEVEN — HARRY AND MEGHAN RESPOND
SFX: Laptop chime again.
HARRY: We've been listening to all this, and frankly I'm offended. Not one part of your vision includes us.
FERGUS: Well, strictly speaking—
MEGHAN: Let me lovingly interrupt there, Fergus. Harry and I may have stepped away from the institution, but we remain deeply adjacent to its emotional architecture.
ANNE: That sentence should be arrested.
HARRY: We are part of the story. Every interview, every project, every truth-sharing moment—
WILLIAM: Every invoice.
HARRY: My memoir was a global bestseller.
ANNE: So was The Da Vinci Code. People buy all sorts when bored at airports.
HARRY: My truth is my truth.
ANNE: Your truth is a complaint in hardback.
CAMILLA: With a very unexpected medical appendix.
HARRY: I'm not doing this.
MEGHAN: Before we go, we do want to share that next week we're launching a new initiative called Crowning Glory.
CHARLES: Dear God.
MEGHAN: It's a digital wellness platform that helps people process generational trauma through artisanal candle-making.
CHARLES: I'm sorry, through what?
MEGHAN: You pour the wax, you name the wound, and then you light the candle to release it.
CAMILLA: At last, therapy for people who find ordinary narcissism too affordable.
MEGHAN: The signature scent is called Releasing.
ANNE: Releasing what?
MEGHAN: Space.
ANNE: It smells like nonsense.
HARRY: We're leaving now.
CAMILLA: You say that every time, and yet here you are, like emotional pigeons.
SFX: Call disconnects.
SCENE EIGHT — THE PALACE KITCHEN
SFX: Kettle boiling. Teaspoons. Far-off barking. Fergus on phone, unravelled.
FERGUS: No, I'm not quitting. The day rate is insane. I'm simply saying that if the monarchy implodes while I'm here, I'd like it minuted that I arrived with lanyards and optimism.
SOPHIE: Fergus?
FERGUS: Sorry. Very unprofessional. Sophie, can I ask you something honestly? Does any of this matter? The rebrand, the strategy, the platforms, the King's herb content—
SOPHIE: No.
FERGUS: Oh.
SOPHIE: That's the thing no one tells you. It doesn't have to matter. It just has to remain.
FERGUS: That's bleak.
SOPHIE: It's the monarchy. Bleak is one of the assets. People don't want it modern. They want it there. Like weather. Or roadworks. Or that drawer in the kitchen no one can explain but everyone goes to in a crisis.
FERGUS: Not the drawer again.
SOPHIE: We're the national junk drawer, Fergus. Inherited, confusing, oddly reassuring.
FERGUS: That's... actually very good.
SOPHIE: I've had years to think. Edward catalogues spoons in complete silence.
SCENE NINE — FINAL RECOMMENDATION
SFX: Back in the Throne Room. More tired now. More gin. The air of a nation that has survived itself.
FERGUS: Right. Final recommendation. After extensive consultation, audience mapping, stakeholder analysis, and the most upsetting tuna sandwich of my life in your kitchen, my advice is this:
Don't change anything.
WILLIAM: What?
FERGUS: Nothing. No rebrand. No reset. No attempt to become modern. The monarchy works because it is ridiculous. The second you try to make it sleek, it becomes a bank advert with crowns. No one wants that.
ANNE: Go on.
FERGUS: The public does not want relatable royals. They want a King who consults basil, a Queen who sounds like she's survived three wars and a hunt ball before breakfast, a future King who finds Nando's spiritually challenging, a Princess Royal who could kill a man with a glance, and a Prince Edward whom nobody can adequately describe.
EDWARD: Gardening?
FERGUS: Fine. Gardening.
CAMILLA: There we are. The boy's found his lane. It's a hedge.
FERGUS: Your strength is that you are magnificently strange. The public doesn't want you cool. They want you persistent. Decorative. Faintly baffling. Like an expensive clock that's never told the right time but has been in the hall forever.
CHARLES: So your professional advice—
(suspicious)
—for which we are paying what, exactly?
CATHERINE: Don't ask.
CHARLES: Your advice is to continue as we are?
FERGUS: Loudly, yes.
ANNE: And you're charging for that?
FERGUS: Very much so.
ANNE: Fair enough. That's the most aristocratic outcome imaginable.
CHARLES: Well. In that case, meeting adjourned. I'm off to the greenhouse. The basil has seemed low all afternoon.
CAMILLA: It lives with you, darling. Of course it's low.
WILLIAM: Catherine, am I really frightened of Nando's?
CATHERINE: William, you once described lemon and herb as "unexpectedly aggressive".
WILLIAM: It was very vivid.
CAMILLA: One day we must get you a paprika and simply see what happens.
SFX: Door opens. Andrew drifts in.
ANDREW: Has anyone seen my jigsaw?
ANNE: Which tragedy is this?
ANDREW: The Alps. I've lost Switzerland.
CAMILLA: The corgi was chewing something earlier. Might've been Geneva.
ANDREW: Not Switzerland. That had all the lakes.
ANNE: A bit like your reputation.
ANDREW: What?
ANNE: Nothing. Off you trot.
SFX: Andrew exits, baffled.
CHARLES: This is the oldest surviving monarchy in Europe. A thousand years of tradition. And we've lost Switzerland to a corgi.
CAMILLA: That may be the most British sentence ever spoken. Have a drink.
CHARLES: I think I shall.
SFX: Laptop chime one final time.
HARRY: Sorry! Quick update! Crowning Glory has officially launched! We've sold four candles!
MEGHAN: Three were us, Harry.
HARRY: Three were us. But the fourth was a woman in Oregon and I found that profoundly moving.
ANNE: Goodbye, Harry.
HARRY: The candle's called Unheard. It smells of cedar and disappointment.
CAMILLA: So does this room.
ANNE: Goodbye, Harry.
SFX: Call cuts.
FERGUS: (quietly, to Sophie) Is it always like this?
SOPHIE: Fergus, this was quiet.
SFX: A recorder starts mangling "God Save the King".
EDWARD: I've been practising!
ANNE: Edward, stop.
EDWARD: It's my new hobby.
ANNE: You don't need a new hobby. You need to finish one old one. What happened to beekeeping? Pottery? Mandarin?
EDWARD: The bees were hostile, the pot collapsed, and the Mandarin lady turned out to be teaching Cantonese.
CAMILLA: At least one of you learned the wrong language honestly.
SFX: The recorder produces a truly awful high note.
CHARLES: (calling from off) Can someone stop Edward? The basil's distressed!
SFX: Recorder stops. Sacred silence.
CAMILLA: (raising glass) To the monarchy.
ANNE: Long may it stagger.
SOPHIE: Long may it remain upright.
CHARLES: Long may it endure.
CAMILLA: Long may it confuse the French.
WILLIAM: Is that one of the constitutional aims?
CAMILLA: It is now.
ALL: The monarchy.
SFX: Full brass band strikes up "God Save the King", drowning out almost everything.
SFX: Faintly underneath, Edward's recorder starts again, half a beat behind.
FERGUS: God save the King.
SOPHIE: God save the basil.
ANNE: God save us all.
`.trim();

// ── Parser ────────────────────────────────────────────────────────────────────

function parseScript(raw) {
  const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
  const beats = [];
  let cur  = null;
  let sfxBuf = [];

  const flushSfx = () => {
    if (sfxBuf.length) {
      beats.push({ type: 'sfx', text: sfxBuf.join(' ') });
      sfxBuf = [];
    }
  };
  const flushCur = () => {
    if (cur) { beats.push(cur); cur = null; }
  };

  for (const line of lines) {
    if (line.startsWith('SFX:')) {
      flushCur();
      sfxBuf.push(line.slice(4).trim());
      continue;
    }
    flushSfx();

    if (/^SCENE\s+/.test(line)) {
      flushCur();
      beats.push({ type: 'scene', text: line });
      continue;
    }

    if (/^Part\s+(One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten)\s*:/i.test(line)) {
      flushCur();
      beats.push({ type: 'section', text: line });
      continue;
    }

    const char = CAST.find(c => line.startsWith(c + ':'));
    if (char) {
      flushCur();
      cur = { type: 'dialogue', character: char, text: line.slice(char.length + 1).trim() };
      continue;
    }

    // continuation line — append to current dialogue beat
    if (cur && cur.type === 'dialogue') {
      cur.text += '\n' + line;
    }
  }
  flushSfx();
  flushCur();

  return beats.map((b, i) => ({ ...b, id: i }));
}

const BEATS = parseScript(SCRIPT_RAW);
console.log(`Script parsed: ${BEATS.length} beats`);

// ── State ─────────────────────────────────────────────────────────────────────

const state = {
  idx:   0,
  users: {},   // socketId -> { id, character }
};

function payload() {
  return {
    idx:   state.idx,
    beat:  BEATS[state.idx],
    total: BEATS.length,
    users: Object.values(state.users),
    ended: state.idx >= BEATS.length - 1,
  };
}

// ── Sockets ───────────────────────────────────────────────────────────────────

io.on('connection', socket => {
  socket.emit('init', { beats: BEATS, castInfo: CAST_INFO, cast: CAST });
  socket.emit('state', payload());

  socket.on('join', ({ character }) => {
    state.users[socket.id] = { id: socket.id, character };
    io.emit('state', payload());
  });

  socket.on('advance', () => {
    if (state.idx < BEATS.length - 1) {
      state.idx++;
      io.emit('state', payload());
    }
  });

  socket.on('back', () => {
    if (state.idx > 0) {
      state.idx--;
      io.emit('state', payload());
    }
  });

  socket.on('reset', () => {
    state.idx = 0;
    io.emit('state', payload());
  });

  socket.on('disconnect', () => {
    delete state.users[socket.id];
    io.emit('state', payload());
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  const ips = Object.values(os.networkInterfaces())
    .flat()
    .filter(i => i.family === 'IPv4' && !i.internal)
    .map(i => i.address);

  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║   THE WINDSORS: The Rebrand              ║');
  console.log('║   Radio Play Performance App             ║');
  console.log('╚══════════════════════════════════════════╝\n');
  console.log(`  Local:    http://localhost:${PORT}`);
  ips.forEach(ip => console.log(`  Network:  http://${ip}:${PORT}  ← share this`));
  console.log('\n  Share the Network URL with other performers.\n');
});
