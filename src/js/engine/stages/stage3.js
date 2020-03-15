const stage3 = {
    0: {
      type: "message",
      text: "Stage 3",
      displayTime: 4000
    },
    4: {
      type: "enemy",
      index: 2,
      number: 2,
      chaser: true
    },
    12: {
      type: "enemy",
      index: 2,
      number: 1,
      chaser: true
    },
    14: {
      type: "enemy",
      index: 0,
      number: 1,
      chaser: true
    },
    15: {
      type: "enemy",
      index: 1,
      number: 2,
      chaser: false
    },
    16: {
      type: "box",
      content: "weapon"
    },
    20: {
      type: "enemy",
      index: 1,
      number: 2,
      chaser: true
    },
    27: {
      type: "enemy",
      index: 2,
      number: 3,
      chaser: false
    },
    28: {
      type: "box",
      content: "shield"
    },
    29: {
      type: "enemy",
      index: 1,
      number: 2,
      chaser: true
    },
    30: {
        type: "box",
        content: "weapon"
    },
    34: {
      type: "enemy",
      index: 0,
      number: 3,
      chaser: false
    },
    36: {
      type: "enemy",
      index: 0,
      number: 4,
      chaser: true
    },
    41: {
      type: "enemy",
      index: 1,
      number: 2,
      chaser: false
    },
    43: {
      type: "box",
      content: "weapon"
    },
    44: {
      type: "enemy",
      index: 1,
      number: 1,
      chaser: false
    },
    56: {
      type: "enemy",
      index: 2,
      number: 3,
      chaser: false
    },
    64: {
      type: "enemy",
      index: 0,
      number: 3,
      chaser: true
    },
    82: {
        type: "endGame"
    }
  };
  
  export default stage3;
  