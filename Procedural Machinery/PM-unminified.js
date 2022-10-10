////////////////////////////////////////////////////////////
// Procedural Machinery by David G. Smith, January 2022
//
/*//////////////////////////////////////////////////////////
Hash-driven gear ratios and color schemes with 3 action 
buttons to start the machine, expand the parts for 
inspection, or rotate the whole machine (or all 3 at once).
Each mint is a unique hash-driven machine.
*///////////////////////////////////////////////////////////

let cntnr,
  cm,
  scn,
  rndrr,
  al,
  dl,
  sl,
  pl,
  topLt,
  wHx = window.innerWidth / 2,
  wHy = window.innerHeight / 2,
  prms = [];
let screenShotDone = false;
let rrk = [],
  grOrd = [],
  iR = [],
  rS = [];
let thk;
const rP = [
  6, 4, 0, -4, -7, 4, 0, -4, 3, -1, -5, 3, -1, -5, 4, 0, -4, 3, -1, -5, 4, 0,
  -4, 3, -1, -5, 5, 2, 1, -2, -3, -6,
];
let mvmt = !1,
  eChg = !1,
  expdd = !1,
  expFctr = 0,
  expLim = 2.5,
  rttn = !1,
  camRAng = 0,
  camRAngRt = 0.01,
  c = [];
const schm = [],
  cp5 = [
    [73547, 211308, 23446, 6592433, 11783648],
    [4869709, 957095, 4039851, 16174433, 16681585],
    [2772329, 4949684, 11389923, 15200246, 6532325],
    [16686223, 16691880, 16697537, 16439745, 16370343],
    [15614005, 15955766, 16643224, 8110147, 234191],
    [9883316, 16772781, 16740201, 16763996, 8968368],
    [3376582, 4356515, 4680842, 4810107, 8359582],
    [11069135, 14478785, 16765878, 16755365, 16747412],
    [15463670, 12446446, 7779517, 5793419, 6182486],
    [14056276, 5477502, 7449023, 13083797, 13408386],
    [12913266, 4784194, 2440751, 4654887, 3307655],
    [16116430, 15972130, 11850698, 7187606, 1007439],
    [4692696, 4619672, 8145739, 5651516, 0],
    [10124116, 14072971, 12823430, 13681563, 10584939],
    [14803415, 10208969, 7057561, 2258049, 12237498],
    [15919576, 16371313, 15428925, 8179904, 5206148],
    [11003357, 12181234, 13225714, 13813743, 14924006],
    [1250349, 4669551, 9937360, 11675195, 10099239],
    [5488548, 8241032, 10133624, 12553317, 14978881],
    [11426137, 11697755, 9086329, 7064007, 4189912],
    [16711748, 16743680, 16187136, 65393, 4915455],
    [2044732, 8008731, 6817553, 12294507, 401194],
    [14286840, 13107162, 12907719, 10203793, 5391922],
    [15580429, 12895428, 12880442, 9633792, 6118749],
    [13097699, 4278368, 8727316, 10442294, 12428930],
    [3160406, 9149891, 13421772, 7043198, 9707295],
  ];

function init() {
  (scn = new THREE.Scene()),
    cams(),
    lts(),
    bldRndrr(),
    document.body.appendChild(cntnr),
    window.addEventListener("resize", onWindowResize),
    parms(),
    setGrOrd(),
    setColorSchemes(),
    setClrs(),
    bldIt(),
    doBGBtns();
}

function animate() {
  requestAnimationFrame(animate), render();
}

function render() {
  updtScn(), rndrr.render(scn, cm);
}

function updtScn() {
  if (screenShotDone == false) {
    window.OneOfX.save({Hubs: 6, Stages: 3, Gears: 26, Rods: 29, Color_Schemes: 12, Palettes: 130});
    screenShotDone = true;
  }
  if (mvmt)
    for (i = 0; i < 32; i++) scn.getObjectByName("g" + i).rotation.z += rS[i];
  if (eChg && !expdd)
    for (expFctr += 0.1, i = 0; i < 32; i++) {
      expFctr > expLim && ((expFctr = expLim), (eChg = !1), (expdd = !0));
      let t = "g" + i;
      scn.getObjectByName(t).position.z += expFctr * rP[i];
    }
  if (eChg && expdd)
    for (expFctr -= 0.1, i = 0; i < 32; i++) {
      expFctr < 0 && ((expFctr = 0), (eChg = !1), (expdd = !1));
      let t = "g" + i;
      scn.getObjectByName(t).position.z -= (expFctr + 0.1) * rP[i];
    }
  if (rttn) {
    camRAng += camRAngRt;
    cm.position.x = 350 * Math.cos(camRAng);
    cm.position.z = 350 * Math.sin(camRAng);
    cm.lookAt(0, 0, 0);
  }
}

function doBGBtns() {
  let t = document.currentScript.parentNode.id,
    n = "#" + c[29].getHexString();
    document.getElementById(t).style.backgroundColor = "#000000";
    document.getElementById(t).style.backgroundImage =
    "linear-gradient(to top left,  #666666, " + n + ")";    "linear-gradient(to top left,  #666666, " + n + ")";
  let r = "#" + c[25].getHexString();
  const e = document.createElement("style");
  (e.innerHTML =
    "button {position: absolute;top: 91%;background: " +
    r +
    ";border:none;height:1%;padding:1%;border-radius:13%;}"),
    document.head.appendChild(e);
  let i = document.createElement("button");
  (i.style.left = "27%"),
    i.addEventListener("click", function () {
      mvmt = !mvmt;
    });
  let a = document.createElement("button");
  (a.style.left = "50%"),
    a.addEventListener("click", function () {
      eChg = !0;
    });
  let o = document.createElement("button");
  (o.style.left = "73%"),
    o.addEventListener("click", function () {
      rttn = !rttn;
    }),
    document.getElementById(t).appendChild(i),
    document.getElementById(t).appendChild(a),
    document.getElementById(t).appendChild(o);
}

function cams() {
  ((cm = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1e3
  )).position.x = 350),
    (cm.position.y = 350),
    (cm.position.z = 0),
    cm.lookAt(new THREE.Vector3(0, 0, 0)),
    scn.add(cm);
}

function lts() {
  let a = new THREE.DirectionalLight(0xffffff, 0.05);
  a.position.set(0, 175, 0);
  scn.add(a);
  (camLight = getSl(0.5)), cm.add(camLight);
  setPls(0.15);
}

function bldRndrr() {
  (rndrr = new THREE.WebGLRenderer({
    antialias: !0,
    alpha: !0,
  })).setPixelRatio(window.devicePixelRatio),
    rndrr.setSize(window.innerWidth, window.innerHeight),
    (rndrr.autoClear = !1),
    rndrr.setClearColor(0, 0),
    (cntnr = rndrr.domElement);
}

function onWindowResize() {
  (wHx = window.innerWidth / 2),
    (wHy = window.innerHeight / 2),
    (cm.aspect = window.innerWidth / window.innerHeight),
    cm.updateProjectionMatrix(),
    rndrr.setSize(window.innerWidth, window.innerHeight);
}

function getSl(t) {
  let n = new THREE.SpotLight(0xffffff, t);
  n.decay = 2.0;
  return n;
}

function setPls(intens) {
  let n = [7.5, 4.5, 0.5, -3.5, -6.5];
  for (t = 0; t < 5; t++) {
    let r = new THREE.PointLight(16777215, intens, 0, 2);
    r.position.set(150, 0, 25 * n[t]);
    let e = new THREE.PointLight(16777215, intens, 0, 2);
    e.position.set(-105, 105, 25 * n[t]);
    let i = new THREE.PointLight(16777215, intens, 0, 2);
    i.position.set(-105, -105, 25 * n[t]), scn.add(r), scn.add(e), scn.add(i);
  }
}

function parms() {
  for (let i = 0; i < 32; i++) {
    prms[i] = Math.floor(Math.random() * 255);
  }
}

function setGrOrd() {
  let t;
  for (i = 0; i < 32; i++) grOrd[i] = i;
  (t = grOrd[5]),
    (grOrd[5] = getMaxIdx([5, 14, 20, 8, 17, 23])),
    (grOrd[grOrd[5]] = t),
    reRack(),
    (t = grOrd[8]),
    (grOrd[8] = getMinIdx([5, 14, 20, , 8, 17, 23])),
    (grOrd[grOrd[8]] = t),
    reRack(),
    (t = grOrd[6]),
    (grOrd[6] = getMaxIdx([6, 15, 21, 9, 18, 24])),
    (grOrd[grOrd[6]] = t),
    reRack(),
    (t = grOrd[9]),
    (grOrd[9] = getMinIdx([6, 15, 21, 9, 18, 24])),
    (grOrd[grOrd[9]] = t),
    reRack(),
    (t = grOrd[7]),
    (grOrd[7] = getMaxIdx([7, 16, 22, 10, 19, 25])),
    (grOrd[grOrd[7]] = t),
    reRack(),
    (t = grOrd[10]),
    (grOrd[10] = getMinIdx([7, 16, 22, 10, 19, 25])),
    (grOrd[grOrd[10]] = t),
    reRack();
}

function reRack() {
  for (i = 0; i < 32; i++) rrk[i] = prms[grOrd[i]];
}

function getMaxIdx(t) {
  for (mx = prms[t[0]], mxIdx = t[0], i = 0; i < 6; i++)
    prms[t[i]] > mx && ((mx = prms[t[i]]), (mxIdx = t[i]));
  return mxIdx;
}

function getMinIdx(t) {
  for (mn = prms[t[0]], mnIdx = t[0], i = 0; i < 6; i++)
    prms[t[i]] < mn && ((mn = prms[t[i]]), (mnIdx = t[i]));
  return mnIdx;
}

function dgtrd(t) {
  return t * (3.1415927 / 180);
}

function dist(t, n, r, e) {
  return Math.sqrt(
    Math.abs(t - r) * Math.abs(t - r) + Math.abs(n - e) * Math.abs(n - e)
  );
}

function map(t, n, r, e, i) {
  return (t / (r - n)) * (i - e) + e;
}

function setClrs() {
  let t = Math.round(map(prms[3], 0, 255, 0, 719)),
    n = Math.round(map(prms[4], 0, 255, 1, cp5.length) - 1);
  for (i = 0; i < 32; i++) c[i] = new THREE.Color(cp5[n][schm[t][i]]);
}

function setColorSchemes() {
  let look = [
    [
      0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 3, 3, 3,
      3, 2, 2, 2, 2, 1, 0,
    ],
    [
      0, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 2, 4, 4, 4, 4, 4, 4, 4, 4, 2, 3, 4, 4, 4,
      4, 4, 4, 4, 4, 3, 0,
    ],
    [
      0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 1, 1, 2, 2, 2,
      2, 3, 3, 3, 3, 1, 0,
    ],
    [
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3,
      3, 3, 3, 3, 3, 3, 0,
    ],
    [
      0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2, 2, 2,
      2, 2, 2, 2, 2, 1, 0,
    ],
    [
      0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 0,
    ],
    [
      0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 4, 4, 4, 4, 4, 4, 4, 4, 3, 1, 2, 2, 2,
      2, 2, 2, 2, 2, 1, 0,
    ],
    [
      0, 2, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 4, 4, 4,
      4, 4, 4, 4, 4, 2, 0,
    ],
    [
      0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0,
      0, 0, 0, 0, 0, 1, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3,
      3, 4, 4, 4, 4, 4, 4,
    ],
    [
      0, 1, 2, 2, 2, 2, 3, 3, 3, 3, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 3, 3, 3,
      3, 2, 2, 2, 2, 1, 0,
    ],
  ];
  let counter = 0;
  let theMap = [
    0, 2, 12, 22, 31, 3, 13, 23, 6, 16, 26, 7, 17, 27, 4, 14, 24, 8, 18, 28, 5,
    15, 25, 9, 19, 29, 1, 10, 11, 20, 21, 30,
  ];
  //             {0, 26 1, 5, 14, 20, 8, 11, 17, 23, 27, 28, 2, 6, 15, 21, 9, 12, 18, 24, 29, 30, 3, 7, 16, 22, 10, 13, 19, 25, 31, 4};
  //             {0, 1, 2, 3, 4,  5,  6, 7,  8,  9,  10, 11, 12,13,14, 15, 16,17, 18, 19, 20, 21, 22,23,24, 25, 26, 27, 28, 29, 30, 31};
  for (m = 0; m < 5; m++) {
    for (k = 0; k < look.length; k++) {
      for (i = 0; i < look.length; i++) {
        let smallS = [];
        for (j = 0; j < 32; j++) {
          smallS[j] = look[i][theMap[j]];
          //	        schm[counter][j] = look[i][theMap[j]];
        }
        schm[counter] = smallS;
        counter++;
      }
      for (l = 0; l < 32; l++) {
        look[k][l]++;
        if (look[k][l] == 5) {
          look[k][l] = 0;
        }
      }
    }
  }
}

function bldIt() {
  let t = [];
  for (thk = map(prms[27], 0, 255, 13, 15), i = 0; i < 32; i++)
    t[i] = map(rrk[i], 0, 255, 30, 75);
  for (j = 0; j < 5; j++)
    bldGr(
      "g" + j,
      t[j],
      t[j] / 2,
      Math.trunc(t[j]),
      6.2831855 / Math.trunc(t[j]),
      new THREE.Vector3(0, 0, 25 * rP[j]),
      c[j]
    );
  let r,
    e = [1, 2, 3, 1, 2, 3];
  for (k = 5; k < 11; k++)
    bldGr(
      "g" + k,
      t[k],
      t[k] / 2,
      Math.trunc(t[k]),
      6.2831855 / Math.trunc(t[k]),
      new THREE.Vector3(
        1 * (t[e[k - 5]] / 2 + t[e[k - 5] + 4] / 2),
        0 * (t[e[k - 5]] / 2 + t[e[k - 5] + 4] / 2),
        25 * rP[k]
      ),
      c[k]
    );
  for (l = 11; l < 14; l++)
    (r =
      2 *
      (dist(
        0,
        0,
        ((t[l - 10] + t[l - 6]) / 2) * 1,
        ((t[l - 10] + t[l - 6]) / 2) * 0
      ) -
        t[l - 3] / 2)),
      (t[l] = r),
      bldGr(
        "g" + l,
        r,
        r / 2,
        Math.trunc(r),
        6.2831855 / Math.trunc(r),
        new THREE.Vector3(0, 0, 25 * rP[l]),
        c[l]
      );
  let a = [1, 2, 3, 11, 12, 13];
  for (m = 14; m < 20; m++)
    bldGr(
      "g" + m,
      t[m],
      t[m] / 2,
      Math.trunc(t[m]),
      6.2831855 / Math.trunc(t[m]),
      new THREE.Vector3(
        Math.cos(2.0943952) * ((t[a[m - 14]] + t[m]) / 2),
        Math.sin(2.0943952) * ((t[a[m - 14]] + t[m]) / 2),
        25 * rP[m]
      ),
      c[m]
    );
  for (n = 20; n < 26; n++)
    bldGr(
      "g" + n,
      t[n],
      t[n] / 2,
      Math.trunc(t[n]),
      6.2831855 / Math.trunc(t[n]),
      new THREE.Vector3(
        Math.cos(4.1887903) * ((t[a[n - 20]] + t[n]) / 2),
        Math.sin(4.1887903) * ((t[a[n - 20]] + t[n]) / 2),
        25 * rP[n]
      ),
      c[n]
    );
  let d = getHubSz(t) + 25;
  for (o = 26; o < 32; o++)
    bldGr(
      "g" + o,
      d,
      d / 2,
      Math.trunc(d),
      6.2831855 / Math.trunc(d),
      new THREE.Vector3(0, 0, 25 * rP[o]),
      c[o]
    );
  let h = [
    1, 2, 2, 2, 2, 3, 3, 3, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 1,
    1, 4, 4, 1, 4, 1, 4,
  ];
  for (p = 0; p < 32; p++) {
    let t = "g" + p;
    switch (h[p]) {
      case 1:
        scn.getObjectByName(t).add(getRod(25, thk, -1));
        break;
      case 2:
        scn.getObjectByName(t).add(getRod(25, thk, 0));
        break;
      case 3:
        scn.getObjectByName(t).add(getRod(25, thk, -1)),
          scn.getObjectByName(t).add(getRod(25, thk, 0));
    }
  }
  for (calcIRs(t), i = 0; i < 32; i++) {
    let t = "g" + i;
    scn.getObjectByName(t).rotation.z += iR[i];
  }
  calcRSs(t);
}

function getHubSz(t) {
  return Math.max(
    t[11] + t[17],
    t[11] + t[23],
    t[12] + t[18],
    t[12] + t[24],
    t[13] + t[19],
    t[14] + t[25],
    151
  );
}

function calcIRs(t) {
  for (i = 0; i < 32; i++) iR[i] = 0;
  (iR[5] = 3.1415927 - 6.2831855 / Math.trunc(t[5]) / 2),
    (iR[14] =
      (Math.trunc(t[1]) / 3 + 0.5) * (6.2831855 / Math.trunc(t[14])) -
      1.0471976),
    (iR[20] =
      1.0471976 -
      (Math.trunc(t[1]) / 3 + 0.5) * (6.2831855 / Math.trunc(t[20]))),
    (iR[8] = 3.1415927 - 6.2831855 / Math.trunc(t[8]) / 2),
    (iR[17] =
      (Math.trunc(t[11]) / 3 + 0.5) * (6.2831855 / Math.trunc(t[17])) -
      1.0471976),
    (iR[23] =
      1.0471976 -
      (Math.trunc(t[11]) / 3 + 0.5) * (6.2831855 / Math.trunc(t[23]))),
    (iR[6] = 3.1415927 - 6.2831855 / Math.trunc(t[6]) / 2),
    (iR[15] =
      (Math.trunc(t[2]) / 3 + 0.5) * (6.2831855 / Math.trunc(t[15])) -
      1.0471976),
    (iR[21] =
      1.0471976 -
      (Math.trunc(t[2]) / 3 + 0.5) * (6.2831855 / Math.trunc(t[21]))),
    (iR[9] = 3.1415927 - 6.2831855 / Math.trunc(t[9]) / 2),
    (iR[18] =
      (Math.trunc(t[12]) / 3 + 0.5) * (6.2831855 / Math.trunc(t[18])) -
      1.0471976),
    (iR[24] =
      1.0471976 -
      (Math.trunc(t[12]) / 3 + 0.5) * (6.2831855 / Math.trunc(t[24]))),
    (iR[7] = 3.1415927 - 6.2831855 / Math.trunc(t[7]) / 2),
    (iR[16] =
      (Math.trunc(t[3]) / 3 + 0.5) * (6.2831855 / Math.trunc(t[16])) -
      1.0471976),
    (iR[22] =
      1.0471976 -
      (Math.trunc(t[3]) / 3 + 0.5) * (6.2831855 / Math.trunc(t[22]))),
    (iR[10] = 3.1415927 - 6.2831855 / Math.trunc(t[10]) / 2),
    (iR[19] =
      (Math.trunc(t[13]) / 3 + 0.5) * (6.2831855 / Math.trunc(t[19])) -
      1.0471976),
    (iR[25] =
      1.0471976 -
      (Math.trunc(t[13]) / 3 + 0.5) * (6.2831855 / Math.trunc(t[25])));
}

function calcRSs(t) {
  for (i = 0; i < 32; i++) rS[i] = 0;
  (rS[0] = 0.1),
    (rS[1] = rS[0]),
    (rS[5] = -rS[1] * (Math.trunc(t[1]) / Math.trunc(t[5]))),
    (rS[14] = -rS[1] * (Math.trunc(t[1]) / Math.trunc(t[14]))),
    (rS[20] = -rS[1] * (Math.trunc(t[1]) / Math.trunc(t[20]))),
    (rS[8] = rS[5]),
    (rS[11] = -rS[8] * (Math.trunc(t[8]) / Math.trunc(t[11]))),
    (rS[17] = rS[8] * (Math.trunc(t[8]) / Math.trunc(t[17]))),
    (rS[23] = rS[8] * (Math.trunc(t[8]) / Math.trunc(t[23]))),
    (rS[2] = rS[11]),
    (rS[6] = -rS[2] * (Math.trunc(t[2]) / Math.trunc(t[6]))),
    (rS[15] = -rS[2] * (Math.trunc(t[2]) / Math.trunc(t[15]))),
    (rS[21] = -rS[2] * (Math.trunc(t[2]) / Math.trunc(t[21]))),
    (rS[9] = rS[6]),
    (rS[12] = -rS[9] * (Math.trunc(t[9]) / Math.trunc(t[12]))),
    (rS[18] = rS[9] * (Math.trunc(t[9]) / Math.trunc(t[18]))),
    (rS[24] = rS[9] * (Math.trunc(t[9]) / Math.trunc(t[24]))),
    (rS[3] = rS[12]),
    (rS[7] = -rS[3] * (Math.trunc(t[3]) / Math.trunc(t[7]))),
    (rS[16] = -rS[3] * (Math.trunc(t[3]) / Math.trunc(t[16]))),
    (rS[22] = -rS[3] * (Math.trunc(t[3]) / Math.trunc(t[22]))),
    (rS[10] = rS[7]),
    (rS[13] = -rS[10] * (Math.trunc(t[10]) / Math.trunc(t[13]))),
    (rS[19] = rS[10] * (Math.trunc(t[10]) / Math.trunc(t[19]))),
    (rS[25] = rS[10] * (Math.trunc(t[10]) / Math.trunc(t[25]))),
    (rS[4] = rS[13]);
}

function bldGr(t, n, r, e, c, a, o) {
  let d,
    h = 0.75,
    s = new THREE.Shape();
  if (n <= 150) {
    for (s.moveTo(r + 0.95 * h, 0), i = 0; i < e; i++)
      s.lineTo(
        Math.cos(i * c + 0.15 * c) * (r + 0.95 * h),
        Math.sin(i * c + 0.15 * c) * (r + 0.95 * h)
      ),
        s.lineTo(
          Math.cos(i * c + 0.25 * c) * r,
          Math.sin(i * c + 0.25 * c) * r
        ),
        s.lineTo(
          Math.cos(i * c + 0.28 * c) * (r - h),
          Math.sin(i * c + 0.28 * c) * (r - h)
        ),
        s.lineTo(
          Math.cos(i * c + 0.72 * c) * (r - h),
          Math.sin(i * c + 0.72 * c) * (r - h)
        ),
        s.lineTo(
          Math.cos(i * c + 0.75 * c) * r,
          Math.sin(i * c + 0.75 * c) * r
        ),
        s.lineTo(
          Math.cos(i * c + 0.85 * c) * (r + 0.95 * h),
          Math.sin(i * c + 0.85 * c) * (r + 0.95 * h)
        ),
        s.lineTo(
          Math.cos(i * c + 1 * c) * (r + 0.95 * h),
          Math.sin(i * c + 1 * c) * (r + 0.95 * h)
        );
    s.lineTo(r + 0.95 * h, 0);
  } else {
    for (s.moveTo(r, 0), i = 0; i < 360; i++)
      s.lineTo(Math.cos(dgtrd(i)) * r, Math.sin(dgtrd(i)) * r);
    s.lineTo(r, 0);
  }
  let u = new THREE.Path()
    .moveTo(0.9 * r * 0.9986295, 0.9 * r * 0.05233596)
    .absarc(0, 0, 0.9 * r, 0.05235988, 2.042035, !1)
    .lineTo(0.2 * r * -0.224951, 0.2 * r * 0.97437006)
    .absarc(0, 0, 0.2 * r, 1.7453293, 0.34906584, !0)
    .lineTo(0.9 * r * 0.9986295, 0.9 * r * 0.05233596);
  s.holes.push(u);
  let l = new THREE.Path()
    .moveTo(0.9 * r * -0.54463905, 0.9 * r * 0.83867055)
    .absarc(0, 0, 0.9 * r, 2.146755, 4.1364303, !1)
    .lineTo(0.2 * r * -0.73135376, 0.2 * r * -0.68199825)
    .absarc(0, 0, 0.2 * r, 3.8397243, 2.443461, !0)
    .lineTo(0.9 * r * -0.54463905, 0.9 * r * 0.83867055);
  s.holes.push(l);
  let m = new THREE.Path()
    .moveTo(0.9 * r * -0.45399067, 0.9 * r * -0.89100647)
    .absarc(0, 0, 0.9 * r, 4.24115, 6.2308254, !1)
    .lineTo(0.2 * r * 0.9563047, 0.2 * r * -0.29237175)
    .absarc(0, 0, 0.2 * r, 5.934119, 4.537856, !0)
    .lineTo(0.9 * r * -0.45399067, 0.9 * r * -0.89100647);
  s.holes.push(m);
  let M = {
      steps: 2,
      depth: thk,
      bevelEnabled: !0,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 1,
    },
    g = new THREE.ExtrudeGeometry(s, M);
  const p = new THREE.MeshPhongMaterial({
    color: o,
    shininess: 150.0,
    side: THREE.DoubleSide,
  });
  return (
    ((d = new THREE.Mesh(g, p)).name = t),
    (d.position.x = a.x),
    (d.position.y = a.y),
    (d.position.z = a.z),
    scn.add(d),
    d
  );
}

function getRod(t, n, r) {
  let e = new THREE.CylinderGeometry(3, 3, t + n, 50),
    i = new THREE.MeshPhongMaterial({
      color: "silver",
      shininess: 1.0,
      side: THREE.DoubleSide,
    }),
    c = new THREE.Mesh(e, i);
  return (c.rotation.x = 1.5707964), (c.position.z = (t + n) / 2 + r * t), c;
}
init(), animate();
