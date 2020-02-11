const stage1 = {
  0: {
    type: "message",
    text: "Stage 1",
    displayTime: 4000
  },
  2: {
    type: "enemy",
    index: 0,
    number: 1,
    chaser: true
  },
  7: {
    type: "enemy",
    index: 0,
    number: 2,
    chaser: false
  },
  8: {
    type: "box",
    content: "weapon"
  },
  11: {
    type: "enemy",
    index: 1,
    number: 1,
    chaser: true
  },
  12: {
    type: "enemy",
    index: 2,
    number: 1,
    chaser: true
  },
  15: {
    type: "box",
    content: "weapon"
  },
  16: {
    type: "enemy",
    index: 0,
    number: 2,
    chaser: true
  },
  19: {
    type: "enemy",
    index: 0,
    number: 1,
    chaser: false
  },
  25: {
    type: "enemy",
    index: 1,
    number: 2,
    chaser: false
  },
  27: {
    type: "enemy",
    index: 0,
    number: 2,
    chaser: true
  },
  28: {
    type: "box",
    content: "shield"
  },
  31: {
    type: "enemy",
    index: 2,
    number: 1,
    chaser: true
  },
  32: {
    type: "enemy",
    index: 0,
    number: 1,
    chaser: false
  },
  36: {
    type: "enemy",
    index: 0,
    number: 2,
    chaser: true
  },
  41: {
    type: "enemy",
    index: 2,
    number: 2,
    chaser: false
  },
  43: {
    type: "enemy",
    index: 0,
    number: 1,
    chaser: true
  },
  46: {
    type: "enemy",
    index: 0,
    number: 1,
    chaser: false
  },
  50: {
    type: "enemy",
    index: 1,
    number: 2,
    chaser: false
  },
  55: {
    type: "enemy",
    index: 0,
    number: 1,
    chaser: true
  },
  59: {
    type: "enemy",
    index: 0,
    number: 1,
    chaser: true
  },
  60: {
    type: "enemy",
    index: 0,
    number: 1,
    chaser: false
  },
  75: {
    type: "endStage"
  }
};

export default stage1;
