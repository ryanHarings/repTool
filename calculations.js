function createList(effObject) {
  Object.keys(effObject.LIN).forEach(function(key) {
    var bID = 1;
    if (key === "L6A35") {
      bID = 2;
    } else if (key.slice(0,1) === "E" || key.slice(0,3) === "L6A" || key.slice(0,1) === "F") {
      bID = 1;
    };
    $('.linear').append('<div class="fixture hover" name="' + key + '"value="' + bID + '" data-family="LIN">' + key + '</div>');
  });
  Object.keys(effObject.TRO).forEach(function(key) {
    var bID = 1;
    if (key.slice(0,2) === "CJ" || key.slice(0,1) === "F" || key.slice(0,2) === "LF") {
      bID = 1;
    } else {
      bID = 3;
    };
    $('.trougher').append('<div class="fixture hover" name="' + key + '"value="' + bID + '" data-family="TRO">' + key + '</div>');
  });
};

createList(fixEff);

var selection = {};

var clickCount = 0;

$('.fixture').click(function(){
  $('.shielding').empty();
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
  console.log(selection);
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

  console.log(fixture);

  selection.ul = ulW[fixture];
  console.log(selection.ul);
};

function getOutput(fixObject) {
  if (fixObject.family === 'LIN') {
    var boardData = fixObject.boardType === "1" ? barLineArea : fixObject.boardType === "2" ? linero22 : line22;

    var boardMin = boardData[0];
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

    var fixEff = Number(fixObject.eff);

    var shieldCheck = fixObject.shielding === "NA" ? ' ' : fixObject.shielding;

    var criX = fixObject.cri === '80' ? 1 : fixObject.color === '30k' ? .921 : fixObject.color === '35k' ? .899 : fixObject.color === '40k' ? .892 : fixObject.color === '50k' ? .892 : 1;

    var outputObject = {};

    if (Number(fixObject.boardType) < 3) {
      outputObject.catolog = fixObject.fixture + ' ' + shieldCheck + ' ' + fixObject.cri + ' ' + fixObject.color;
      outputObject.maxLumen = Math.round10(fixEff * maxBoardLumen * criX, 1);
      outputObject.minLumen = Math.round10(fixEff * minBoardLumen * criX, 1);
      outputObject.maxWatt = Math.round10(boardMax["inputWattage"], -1);
      outputObject.minWatt = Math.round10(boardMin["inputWattage"], -1);
    } else {
      console.log('oops, not ready');
    }

    return outputObject;

  } else {

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
