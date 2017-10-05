const ulW = {
  EV: 12,
  EX: 25,
  E1: 9.25,
  EW: 10,
  EWB: 20,
  EWG: 12.5,
  EWW: 10,
  EX1B: 36,
  EX12: 18,
  EVL: 10,
  EX33: 12.5,
  EX44: 12.5,
  L6: 25,
  F14: 25,
  F18: 36,
  F24: 71,
  F36: 169,
  F48: 249,
  F60: 251,
  F72: 380,
  AD11: 25, //guess
  AD22: 40,
  AD14: 40,
  AD24: 80,
  CJ11: 40, //guess
  CJ22: 40,
  CJ14: 40,
  CJ24: 80,
  LU11: 25, //guess
  LU22: 40,
  LU14: 40,
  LU24: 80,
  LF11: 20,
  LF12: 30,
  LF22: 60,
  LF14: 60,
  LF24: 120,
  LF44: 140
}

const fixEff = {
  LIN: {
    E2: {A:	0.5365},
    E4: {A:	0.6110},
    ET4: {
      A: 0.545,
      AL: 0.6547,
      C: 0.524,
      CG: 0.508,
      CL: 0.455,
      CM: 0.465,
      CR: 0.434,
      D: 0.603,
      DG: 0.586,
      DL: 0.529,
      DM: 0.54,
      DR: 0.51,
      H: 0.4815,
      HE: 0.6441,
      R: 0.5779,
      V: 0.5749
    },
    ET6: {
      A: 0.6689,
      AL: 0.7664,
      C: 0.646,
      CG: 0.628,
      CL: 0.562,
      CM: 0.577,
      CR: 0.516,
      D: 0.721,
      DG: 0.704,
      DL: 0.636,
      DM: 0.652,
      DR: 0.594,
      V: 0.6497,
      R: 0.6689
    },
    EV1: {
      HE: 0.6245,
      HED: 0.5721,
      BW: 0.4956,
      P: 0.4138,
      WHE: 0.5541
    },
    EV3: {
      A: 0.545,
      AL: 0.6547,
      C: 0.524,
      CG: 0.508,
      CL: 0.455,
      CM: 0.465,
      CR: 0.434,
      D: 0.603,
      DG: 0.586,
      DL: 0.529,
      DM: 0.54,
      DR: 0.51,
      H: 0.4815,
      HE: 0.6441,
      R: 0.5779,
      V: 0.5749,
      WG: 0.43,
      WW: 0.4613,
      WET: 0.5234
    },
    EV6: {
      A: 0.6689,
      AL: 0.7664,
      C: 0.646,
      CG: 0.628,
      CL: 0.562,
      CM: 0.577,
      CR: 0.516,
      D: 0.721,
      DG: 0.704,
      DL: 0.636,
      DM: 0.652,
      DR: 0.594,
      R: 0.6689,
      V: 0.6497,
      WET: 0.5995
    },
    EVL: {NA: 0.4525},
    EX1: {
      HE: 0.6245,
      HED: 0.5721,
      BW: 0.4956,
      P: 0.4138,
      WHE: 0.5541
    },
    EX12: {
      HE: 0.6245,
      HED: 0.5721,
      BW: 0.4956,
      P: 0.4138,
      WHE: 0.5541
    },
    EX12_IND: {
      HE: 0.7417,
      HEA: 0.6785,
      BW: 0.733,
      WHE: 0.5112
    },
    EX1B_DIR: {
      HE: 0.5818,
      HED: 0.575,
      BW: 0.4488,
      WHE: 0.5302,
      P: 0.4138
    },
    EX1B_IND: {
      HE: 0.7143,
      HEA: 0.6785,
      BW: 0.897,
      WHE: 0.5112
    },
    EX2: {
      A: 0.5365,
      O: 0.8092
    },
    EX2B_DIR: {A: 0.4745},
    EX2B_IND: {O: 0.8373},
    EX3: {
      A: 0.545,
      AL: 0.6547,
      C: 0.524,
      CG: 0.508,
      CL: 0.455,
      CM: 0.465,
      CR: 0.434,
      D: 0.603,
      DG: 0.586,
      DL: 0.529,
      DM: 0.54,
      DR: 0.51,
      H: 0.4815,
      HE: 0.6441,
      R: 0.5779,
      V: 0.5749,
      WET: 0.5234
    },
    EX33: {
      O: 0.8578
    },
    EX3B_DIR: {
      A: 0.5854,
      AL: 0.6547,
      C: 0.524,
      CG: 0.508,
      CL: 0.455,
      CM: 0.465,
      CR: 0.434,
      D: 0.603,
      DG: 0.586,
      DL: 0.529,
      DM: 0.54,
      DR: 0.51,
      H: 0.4815,
      HE: 0.685,
      R: 0.5779,
      V: 0.5749,
      WET: 0.5064
    },
    EX3B_IND: {
      O: 0.8842,
      WET: 0.8638
    },
    EX4: {
      A: 0.5731,
      O: 0.8865
    },
    EX44: {
      A: 0.5731
    },
    EX4B_DIR: {A: 0.5742},
    EX4B_IND: {O: 0.8943},
    EX6: {
      A: 0.6886,
      AL: 0.7664,
      C: 0.646,
      CG: 0.628,
      CL: 0.562,
      CM: 0.577,
      CR: 0.516,
      D: 0.721,
      DG: 0.704,
      DL: 0.636,
      DM: 0.652,
      DR: 0.594,
      R: 0.6689,
      V: 0.6497,
      WET: 0.5995
    },
    EX6B_DIR: {
      A: 0.6924,
      AL: 0.7664,
      CR: 0.646,
      CG: 0.628,
      CL: 0.562,
      CM: 0.577,
      CR: 0.516,
      D: 0.721,
      DG: 0.704,
      DL: 0.636,
      DM: 0.652,
      DR: 0.594,
      R: 0.6689,
      V: 0.6497,
      WET: 0.5922
    },
    EX6B_IND: {
      O: 0.9205,
      WET: 0.9371
    },
    L6A100: {NA: 0.6778},
    L6A35: {NA: 0.6726},
    L6A75: {NA: 0.7608}
  },
  TRO: {
    AD11:{
      A: 0.6901,
      L: 0.4099,
      R: 0.3506
    },
    AD14: {
      A: 0.8223,
      L: 0.4884,
      R: 0.4177
    },
    AD22: {
      A: 0.8196,
      L: 0.4868,
      R: 0.4164
    },
    AD24: {
      A: 0.8385,
      L: 0.4981,
      R: 0.4260
    },
    CJ11: {
      A: 0.642,
      L: 0.6089,
      R: 0.6089
    },
    CJ14: {
      A: 0.7556,
      L: 0.7324,
      R: 0.7324
    },
    CJ22: {
      A: 0.7603,
      L: 0.7643,
      R: 0.7643
    },
    CJ24: {
      A: 0.7879,
      L: 0.7916,
      R: 0.7916
    },
    F14: {A: 0.5725},
    F18: {
      A: 0.6325,
      U: 0.6425
    },
    F24: {
      A: 0.5988,
      U: 0.645
    },
    F24B_DIR: {A: 0.63},
    F24B_IND: {A: 0.6075},
    F36: {
      A: 0.6175,
      U: 0.6263
    },
    F36B_DIR: {A: 0.6325},
    F36B_IND: {A: 0.615},
    F48: {
      A: 0.5963,
      U: 0.6175
    },
    F48B_DIR: {A: 0.6175},
    F48B_IND: {A: 0.6125},
    F60: {A: 0.731},
    F72: {A: 0.71},
    LF11: {A: 0.6131},
    LF12: {A: 0.6582},
    LF14: {A: 0.677},
    LF22: {A: 0.7004},
    LF24: {A: 0.7125},
    LF44: {A: 0.6702},
    LU11: {
      A: 0.6409,
      S: 0.5460,
      W: 0.5775
    },
    LU14: {
      A: 0.7709,
      S: 0.6568,
      W: 0.6946
    },
    LU22: {
      A: 0.8045,
      S: 0.6854,
      W: 0.7249
    },
    LU24: {
      A: 0.8333,
      S: 0.7100,
      W: 0.7508
    }
  }
};
