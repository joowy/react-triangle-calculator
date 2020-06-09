const pi = Math.PI;

//----------------CALCULATION FUNCTIONS-------------------------------
function toRad(degree) {
  return degree * (pi / 180);
}
function toDegree(rad) {
  if (rad === "") {
    return "";
  } else {
    return rad * (180 / pi);
  }
}
function roundAns(a) {
  for (let i = 0; i < a.length; i++) {
    const e = a[i];
    if (!isNaN(e)) {
      a[i] = +Number(e).toFixed(3);
    }
  }
  return a;
}

//AAAS works
function aaas(angleA, angleB, angleC, sideC) {
  let sideA = (sideC * Math.sin(angleA)) / Math.sin(angleC);
  let sideB = (sideC * Math.sin(angleB)) / Math.sin(angleC);
  return [sideA, sideB, sideC, angleA, angleB, angleC, "AAS"];
}
//SSS works
function sss(sideA, sideB, sideC) {
  if (
    (sideA + sideB > sideC &&
      sideB + sideC > sideA &&
      sideC + sideA > sideB) === false
  ) {
    throw Error("Sum of two must be sides  greater than the third");
  }
  let angleC = Math.acos(
    (sideA ** 2 + sideB ** 2 - sideC ** 2) / (2 * sideA * sideB)
  );
  let angleB = Math.acos(
    (sideA ** 2 + sideC ** 2 - sideB ** 2) / (2 * sideA * sideC)
  );
  let angleA = pi - angleC - angleB;
  return [sideA, sideB, sideC, angleA, angleB, angleC, "SSS"];
}
//SAS Works
function sas(sideA, sideB, angleC) {
  let sideC = Math.sqrt(
    sideA ** 2 + sideB ** 2 - 2 * sideA * sideB * Math.cos(angleC)
  );
  let sasOut = sss(sideA, sideB, sideC);
  return [
    sasOut[0],
    sasOut[1],
    sasOut[2],
    sasOut[3],
    sasOut[4],
    sasOut[5],
    "SAS",
  ];
}
//SSA Works (i think)
function ssa(sideA, sideB, angleA, obtuseCase = null) {
  let angleB, angleC, sideC;
  let sinOfAngleB = (Math.sin(angleA) * sideB) / sideA;
  if (Math.abs(sinOfAngleB - 1) < 100 * Number.MIN_VALUE) {
    angleB = pi / 2;
  } else if (sinOfAngleB > 1) {
    throw Error("impossible triangle");
  } else {
    angleB = Math.asin(sinOfAngleB);
    if (obtuseCase === true) {
      angleB = pi - angleB;
    }
  }
  angleC = pi - angleA - angleB;
  let temp = aaas(angleB, angleC, angleA, sideA);
  sideB = temp[0];
  sideC = temp[1];
  sideA = temp[2];
  angleB = temp[3];
  angleC = temp[4];
  angleA = temp[5];
  return [sideA, sideB, sideC, angleA, angleB, angleC, "SSA"];
}

//----------------MAIN FUNCTION----------------------------
function solve(angleA, angleB, angleC, sideA, sideB, sideC, radianMode) {
  if (!radianMode) {
    if (angleA) {
      angleA = toRad(angleA);
    }
    if (angleB) {
      angleB = toRad(angleB);
    }
    if (angleC) {
      angleC = toRad(angleC);
    }
  }

  let out, outObtuse;

  //check if there are only 3 inputs
  if (
    [sideA, sideB, sideC, angleA, angleB, angleC].filter((x) => x !== "")
      .length !== 3
  ) {
    throw Error("Enter EXACTLY 3 inputs!");
  }

  //Make sure the angles are less than pi
  if ([angleA, angleB, angleC].every((x) => x < pi) === false) {
    throw Error("Input angles are not less than 180");
  }
  // Inputs must be greater than 0
  const notNullAndGreaterThanZero = (VInput) => VInput !== "" && VInput > 0;
  if (
    [sideA, sideB, sideC, angleA, angleB, angleC].every(
      notNullAndGreaterThanZero
    ) === true
  ) {
    throw Error("The inputs must be greater than 0.");
  }

  //check if there are at least 1 side
  if ([sideA, sideB, sideC].filter((x) => x === "").length === 3) {
    throw Error("At lease 1 side!");
  }
  // sss case
  if ([sideA, sideB, sideC].filter((x) => x !== "").length === 3) {
    out = sss(sideA, sideB, sideC);
    if (!radianMode) {
      out[3] = toDegree(out[3]);
      out[4] = toDegree(out[4]);
      out[5] = toDegree(out[5]);
    }
    out = roundAns(out);

    return [out];
  }

  //two side one angle
  if ([sideA, sideB, sideC].filter((x) => x !== "").length === 2) {
    //ssa
    if ([sideA, angleA, sideB].every((x) => x !== "")) {
      out = ssa(sideA, sideB, angleA);
      let tempOutObtuse = ssa(sideA, sideB, angleA, true);
      if (tempOutObtuse.slice(0, 6).every((x) => x > 0)) {
        outObtuse = tempOutObtuse;
      }
    } else if ([sideA, angleA, sideC].every((x) => x !== "")) {
      out = ssa(sideA, sideC, angleA);
      let tempOutObtuse = ssa(sideA, sideC, angleA, true);
      if (tempOutObtuse.slice(0, 6).every((x) => x > 0)) {
        outObtuse = [
          tempOutObtuse[0],
          tempOutObtuse[2],
          tempOutObtuse[1],
          tempOutObtuse[3],
          tempOutObtuse[5],
          tempOutObtuse[4],
        ];
      }
      out = [out[0], out[2], out[1], out[3], out[5], out[4], out[6]];
    } else if ([sideB, angleB, sideA].every((x) => x !== "")) {
      out = ssa(sideB, sideA, angleB);
      let tempOutObtuse = ssa(sideB, sideA, angleB, true);
      if (tempOutObtuse.slice(0, 6).every((x) => x > 0)) {
        outObtuse = [
          tempOutObtuse[1],
          tempOutObtuse[0],
          tempOutObtuse[2],
          tempOutObtuse[4],
          tempOutObtuse[3],
          tempOutObtuse[5],
        ];
      }
      out = [out[1], out[0], out[2], out[4], out[3], out[5], out[6]];
    } else if ([sideB, angleB, sideC].every((x) => x !== "")) {
      out = ssa(sideB, sideC, angleB);
      let tempOutObtuse = ssa(sideB, sideC, angleB, true);
      if (tempOutObtuse.slice(0, 6).every((x) => x > 0)) {
        outObtuse = [
          tempOutObtuse[1],
          tempOutObtuse[2],
          tempOutObtuse[0],
          tempOutObtuse[4],
          tempOutObtuse[5],
          tempOutObtuse[3],
        ];
      }
      out = [out[1], out[2], out[0], out[4], out[5], out[3], out[6]];
    } else if ([sideC, angleC, sideA].every((x) => x !== "")) {
      out = ssa(sideC, sideA, angleC);
      let tempOutObtuse = ssa(sideC, sideA, angleC, true);
      if (tempOutObtuse.slice(0, 6).every((x) => x > 0)) {
        outObtuse = [
          tempOutObtuse[2],
          tempOutObtuse[0],
          tempOutObtuse[1],
          tempOutObtuse[5],
          tempOutObtuse[3],
          tempOutObtuse[4],
        ];
      }
      out = [out[2], out[0], out[1], out[5], out[3], out[4], out[6]];
    }

    // sideC, angleC, sideB
    else if ([sideC, angleC, sideB].every((x) => x !== "")) {
      out = ssa(sideC, sideB, angleC);
      let tempOutObtuse = ssa(sideC, sideB, angleC, true);
      if (tempOutObtuse.slice(0, 6).every((x) => x > 0)) {
        outObtuse = [
          tempOutObtuse[2],
          tempOutObtuse[1],
          tempOutObtuse[0],
          tempOutObtuse[5],
          tempOutObtuse[4],
          tempOutObtuse[3],
        ];
      }
      out = [out[2], out[1], out[0], out[5], out[4], out[3], out[6]];
    }
    //sas
    else if ([sideA, sideB, angleC].every((x) => x !== "")) {
      out = sas(sideA, sideB, angleC);
    } else if ([sideB, sideC, angleA].every((x) => x !== "")) {
      out = sas(sideB, sideC, angleA);
      out = [out[1], out[2], out[0], out[4], out[5], out[3], out[6]];
    } else if ([sideC, sideA, angleB].every((x) => x !== "")) {
      out = sas(sideC, sideA, angleB);
      out = [out[2], out[0], out[1], out[5], out[3], out[4], out[6]];
    }

    if (!radianMode) {
      out[3] = toDegree(out[3]);
      out[4] = toDegree(out[4]);
      out[5] = toDegree(out[5]);
      if (outObtuse) {
        outObtuse[3] = toDegree(outObtuse[3]);
        outObtuse[4] = toDegree(outObtuse[4]);
        outObtuse[5] = toDegree(outObtuse[5]);
      }
    }
    out = roundAns(out);
    outObtuse = roundAns(out);
    return [out, outObtuse];
  }
  // one side and two angles
  if ([sideA, sideB, sideC].filter((x) => x !== "").length === 1) {
    if (angleA === "") {
      //have two angles
      //find the third
      angleA = pi - angleB - angleC;
    } else if (angleB === "") {
      angleB = pi - angleA - angleC;
    } else if (angleC === "") {
      angleC = pi - angleA - angleB;
    }
    if ((angleA > 0 && angleB > 0 && angleC > 0) === false) {
      throw Error("ERROR??");
    }
    if (sideC !== "") {
      out = aaas(angleA, angleB, angleC, sideC);
    } else if (sideA !== "") {
      out = aaas(angleB, angleC, angleA, sideA);
      out = [out[2], out[0], out[1], out[5], out[3], out[4], out[6]];
    } else {
      out = aaas(angleC, angleA, angleB, sideB);
      out = [out[1], out[2], out[0], out[4], out[5], out[3], out[6]];
    }

    if (!radianMode) {
      out[3] = toDegree(out[3]);
      out[4] = toDegree(out[4]);
      out[5] = toDegree(out[5]);
    }

    out = roundAns(out);
    return [out];
  }
}

// let angleA = 30;
// let angleB = "";
// let angleC = "";
// let sideA = 20;
// let sideB = "";
// let sideC = 16;
// let a = solve(angleA, angleB, angleC, sideA, sideB, sideC, false);
// console.log(a);

// //   let angleA = toRad(30);
// //   let angleB = "";
// //   let angleC = "";
// //   let sideA = 20;
// //   let sideB = 16;
// //   let sideC = "";

export { solve, toDegree, toRad };
