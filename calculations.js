function createList(effObject) {
  Object.keys(effObject.LIN).forEach(function(key) {
    var bID = 1;
    if (key === "L6A35") {
      bID = 2;
    }
    // else if (key.slice(0,1) === "E" || key.slice(0,3) === "L6A" || key.slice(0,1) === "F") {
    //   bID = 1;
    // };
    $('.linear').append('<div class="fixture hover" name="' + key + '"value="' + bID + '" data-family="LIN">' + key + '</div>');
  });
  Object.keys(effObject.TRO).forEach(function(key) {
    var bID = 1;
    if (key === "AD14" || key === "AD22" || key === "AD24" || key === "CJ14" || key === "CJ22" || key === "CJ24" || key === "LU14" || key === "LU22" || key === "LU24") {
      bID = 3;
    }
    $('.trougher').append('<div class="fixture hover" name="' + key + '"value="' + bID + '" data-family="TRO">' + key + '</div>');
  });
};

createList(fixEff);

var selection = {};

var clickCount = 0;

$('.fixture').click(function(){
  $('.shielding').empty();
  $('.board').empty();
  $('.color').empty();
  $('.shielding').append('<p>Shielding</p>');
  $('div').removeClass('selected');
  $(this).addClass('selected');
  selection.fixture = $(this).attr('name');
  selection.boardType = $(this).attr('value');
  selection.family = $(this).attr('data-family');
  Object.keys(fixEff[selection.family][selection.fixture]).forEach(function(key) {
    $('.shielding').append('<div class="lens hover" name="' + key + '" value="' + fixEff[selection.family][selection.fixture][key] + '">' + key + '</div>')
  });

  $('.lens').click(function() {
    $('.board').empty();
    $('.color').empty();
    $('.board').prepend('<p>CRI</p>');
    $(this).siblings().removeClass('selected');
    $(this).addClass('selected');
    selection.shielding = $(this).attr('name');
    selection.eff = $(this).attr('value');
    getUL();
    $('.board').append('<div class="cri hover" name="80">80</div>');
    $('.board').append('<div class="cri hover" name="90">90</div>');

    $('.cri').click(function() {
      $('.color').empty();
      $('.color').append('<p>Color</p>');
      $(this).siblings().removeClass('selected');
      $(this).addClass('selected');
      selection.cri = $(this).attr('name');
      if (selection.cri === '90') {
        $('.color').append('<div class="temp hover" name="27k">27K</div>');
      }
      $('.color').append('<div class="temp hover" name="30k">30K</div>');
      $('.color').append('<div class="temp hover" name="35k">35K</div>');
      $('.color').append('<div class="temp hover" name="40k">40K</div>');
      $('.color').append('<div class="temp hover" name="50k">50K</div>');

      $('.temp').click(function() {
        console.log('Well, hello there!');
        clickCount++;
        $(this).siblings().removeClass('selected');
        $(this).addClass('selected');
        selection.color = $(this).attr('name');
        var outputData = getOutput(selection);
        $('.output').append('<div class="btn' + clickCount + '">Catolog #: ' + outputData.catolog + '</div>');
        $('.output').append('<div class="btn' + clickCount + '">Max Lumen: ' + outputData.maxLumen + '</div>');
        $('.output').append('<div class="btn' + clickCount + '">Min Lumen: ' + outputData.minLumen + '</div>');
        $('.output').append('<div class="btn' + clickCount + '">Max Watt: ' + outputData.maxWatt + '</div>');
        $('.output').append('<div class="btn' + clickCount + '">Min Watt: ' + outputData.minWatt + '</div>');
        $('.output').append('<button class="btn' + clickCount + '">X</button>');

        $('button').click(function() {
          var group = $(this).attr('class');
          $('.' + group).remove();
        });
      });
    });
  });
});

function getUL() {
  var fixture = selection.fixture;

  if (fixture.split('A')[0] !== fixture && selection.family === 'LIN') {
    fixture = fixture.split('A')[0];
  } else if (selection.shielding === 'WW') {
      fixture = 'EWW';
  } else if (selection.shielding === 'WG') {
      fixture = 'EWG';
  } else if (fixture === 'EVL' || fixture === 'EX33' || fixture === 'EX44') {
      fixture = fixture.split('_')[0];
  } else if (!fixture.includes('12') && !fixture.includes('B') && fixture.includes('1') && selection.family === 'LIN') {
      fixture = 'E1';
  } else if (fixture.includes('1') && fixture !== fixture.split('_')[0]) {
    fixture = fixture.split('_')[0];
  } else if (fixture.includes('B') && !fixture.includes('1') || selection.family === 'TRO') {
    if (selection.shielding === 'WET') {
      fixture = 'EWB'
    } else if (selection.family === 'TRO') {
      fixture = fixture.split('B')[0];
    } else {
      fixture = 'EX';
    }
  } else if (selection.shielding === 'WET') {
    fixture = 'EW';
  } else if (fixture !== fixture.split('_')[0]) {
      fixture = fixture.split('_')[0];
  } else if (!fixture.includes('12')) {
    if (fixture.includes('X')) {
      fixture = 'EX';
    } else if (fixture.slice(0,1)[0] === 'E' && !fixture.includes('12')) {
        fixture = 'EV';
    }
  };

  selection.ul = ulW[fixture];
  console.log(selection.ul);
};

function getOutput(fixObject) {

  console.log(fixObject);

  var boardData = fixObject.boardType === "1" ? barLineArea : fixObject.boardType === "2" ? linero22 : line22;
  var shieldCheck = fixObject.shielding === "NA" ? ' ' : fixObject.shielding;
  var fixEff = Number(fixObject.eff);
  var criX = fixObject.cri === '80' ? 1 : fixObject.color === '30k' ? .921 : fixObject.color === '35k' ? .899 : fixObject.color === '40k' ? .892 : fixObject.color === '50k' ? .892 : 1;

  var boardMin = boardData[0];

  var outputObject = {};

  if (fixObject.family === 'LIN') {

    var boardMax;
    var maxBoardLumen;
    var minBoardLumen;

    Object.keys(boardData).forEach(function(key) {
      if (Number(boardData[key].inputWattage) < Number(fixObject.ul)) {
        boardMax = boardData[key];
        maxBoardLumen = Number(boardMax[fixObject.color]);
        minBoardLumen = Number(boardMin[fixObject.color]);
      }
    });

    outputObject.catolog = fixObject.fixture + ' ' + shieldCheck + ' ' + fixObject.cri + ' ' + fixObject.color;
    outputObject.maxLumen = Math.round10(fixEff * maxBoardLumen * criX, 1);
    outputObject.minLumen = Math.round10(fixEff * minBoardLumen * criX, 1);
    outputObject.maxWatt = Math.round10(boardMax["inputWattage"], -1);
    outputObject.minWatt = Math.round10(boardMin["inputWattage"], -1);

    return outputObject;

  } else {
    var boardCount = fixBoardCounts[fixObject.fixture];
    var boardMax;
    var maxBoardLumen;
    var minBoardLumen;
    var driverEff;
    var fixWatt;
    var totalmA;

    Object.keys(boardData).forEach(function(key) {

      var tempmA = boardCount * Number(boardData[key].mA);
      var tempDrivEff;

      if (fixObject.boardType === '3') {

        if (tempmA < 2300 && tempmA >= 1458) {
          tempDrivEff = .8425;
        } else if (tempmA < 1458 && tempmA >= 1219) {
          tempDrivEff = .8225;
        } else if (tempmA < 1219 && tempmA >= 1145) {
          tempDrivEff = .835;
        } else if (tempmA < 1145 && tempmA >= 813) {
          tempDrivEff = .8625;
        } else if (tempmA < 813 && tempmA >= 673) {
          tempDrivEff = .845;
        } else if (tempmA < 673 && tempmA >= 549) {
          tempDrivEff = .815;
        } else if (tempmA < 549 && tempmA >= 372) {
          tempDrivEff = .785;
        } else if (tempmA < 372 && tempmA >= 279) {
          tempDrivEff = .7575;
        } else if (tempmA < 279 && tempmA >= 219) {
          tempDrivEff = .695;
        } else if (tempmA < 219 && tempmA >= 189) {
          tempDrivEff = .6425;
        } else if (tempmA < 189 && tempmA >= 151) {
          tempDrivEff = .6025;
        } else if (tempmA < 151) {
          tempDrivEff = .568;
        };
      } else {
        if (tempmA > 2300) {
          tempmA = tempmA / Math.ceil(fixObject.ul / 50);
        };

        if (tempmA < 2300 && tempmA >= 1675) {
          tempDrivEff = .8365;
        } else if (tempmA < 1675 && tempmA >= 1450) {
          tempDrivEff = .825;
        } else if (tempmA < 1450 && tempmA >= 1384) {
          tempDrivEff = .8175;
        } else if (tempmA < 1384 && tempmA >= 940) {
          tempDrivEff = .85;
        } else if (tempmA < 940 && tempmA >= 751) {
          tempDrivEff = .828;
        } else if (tempmA < 751 && tempmA >= 600) {
          tempDrivEff = .808;
        } else if (tempmA < 600 && tempmA >= 400) {
          tempDrivEff = .79;
        } else if (tempmA < 400 && tempmA >= 350) {
          tempDrivEff = .76;
        } else if (tempmA < 350 && tempmA >= 270) {
          tempDrivEff = .725;
        } else if (tempmA < 270 && tempmA >= 234) {
          tempDrivEff = .685;
        } else if (tempmA < 234 && tempmA >= 199) {
          tempDrivEff = .65;
        } else if (tempmA < 199) {
          tempDrivEff = .60;
        }
      }

      var totalWatts = Number(boardData[key].boardWattage) / tempDrivEff * boardCount;

      if (totalWatts < Number(fixObject.ul)) {
        driverEff = tempDrivEff
        fixWatt = totalWatts;
        boardMax = boardData[key];
        totalmA = Number(boardData[key].mA) * boardCount;

        maxBoardLumen = Number(boardMax[fixObject.color]);
        minBoardLumen = Number(boardMin[fixObject.color]);
      }
    });

    console.log(driverEff);
    console.log(boardMax);
    console.log(totalmA);

    outputObject.catolog = fixObject.fixture + ' ' + shieldCheck + ' ' + fixObject.cri + ' ' + fixObject.color;
    outputObject.maxLumen = fixObject.fixture.slice(0,1) === 'F' ? 'Please see spec sheet for max lumens' : Math.round10(maxBoardLumen * boardCount * criX * fixEff, 1);
    outputObject.minLumen = Math.round10(fixEff * minBoardLumen * boardCount * criX, 1);
    outputObject.maxWatt = Math.round10(fixWatt, -1);
    outputObject.minWatt = Math.round10(boardMin["inputWattage"] * boardCount, -1);

    return outputObject;

  };
};

(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (value === null || isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // If the value is negative...
    if (value < 0) {
      return -decimalAdjust(type, -value, exp);
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  // Decimal round
  if (!Math.round10) {
    Math.round10 = function(value, exp) {
      return decimalAdjust('round', value, exp);
    };
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
  // Decimal ceil
  if (!Math.ceil10) {
    Math.ceil10 = function(value, exp) {
      return decimalAdjust('ceil', value, exp);
    };
  }
})();
