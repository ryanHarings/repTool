var repInfo = {
  'Lighting & Power Solutions': {
    conglomerate: 'Hubbel',
    manufacturers: ['Focal Point','Wattstopper','Zumtobel'],
    rank: 1,
    market: 'Arkansas'
  },
  'Curtis Stout, Inc.': {
    conglomerate: 'Cree',
    manufacturers: ['Lutron','Prudential','Finelite','Lumenpulse'],
    rank: 2,
    market: 'Arkansas'
  },
  'Long Sales Agency': {
    conglomerate: 'Acuity',
    manufacturers: [],
    rank: 3,
    market: 'Arkansas'
  },
  'Malmstrom White Co.': {
    conglomerate: 'Eaton',
    manufacturers: [],
    rank: 4,
    market: 'Arkansas'
  },
  'Alaska Architectural Lighting': {
    conglomerate: 'Acuity',
    manufacturers: ['Prudential','Pinnacle','Zumtobel'],
    rank: 1,
    market: 'Alaska'
  },
  'Klondike Sales': {
    conglomerate: 'Eaton',
    manufacturers: [],
    rank: 2,
    market: 'Alaska'
  }
};

const marketRegionsList = [];
// const marketRegionsList = ['~'];
const repAgenciesList = [];
// const repAgenciesList = ['~'];
const manufacturersList = [];

var searchInputTracker;

function createLists() {
  var keys = Object.keys(repInfo);
  keys.forEach((key)=>{
    if (!marketRegionsList.includes(repInfo[key].market)) {
      marketRegionsList.push(repInfo[key].market);
    }
    if (!repAgenciesList.includes(key)) {
      repAgenciesList.push(key);
    }
    repInfo[key].manufacturers.forEach((mfg)=> {
      if (!manufacturersList.includes(mfg)) {
        manufacturersList.push(mfg);
      }
    })
  });
  marketRegionsList.sort();
  repAgenciesList.sort();
  manufacturersList.sort();
}
createLists();

// console.log(marketRegionsList);
// console.log(repAgenciesList);
// console.log(manufacturersList);

$('.marketMain').click(function() {
  $('.primaryUl').empty();
  marketRegionsList.forEach(primaryListAppend('mark'))
});

$('.repMain').click(function() {
  $('.primaryUl').empty();
  repAgenciesList.forEach(primaryListAppend('rep'))
});

$('.mfgMain').click(function() {
  $('.primaryUl').empty();
  manufacturersList.forEach(primaryListAppend('mfg'))
});

$('#search').keyup(() => {
  searchInputTracker = ($('#search').val());
  if (searchInputTracker.length > 0) {
    $('.primaryUl').empty();
    var searchMarketList = marketRegionsList.filter(searchFilter(searchInputTracker));
    var searchRepList = repAgenciesList.filter(searchFilter(searchInputTracker));
    var searchMfgList = manufacturersList.filter(searchFilter(searchInputTracker));

    // if (searchMarketList.length === 1) {
    //   searchMarketList.unshift('Zero markets match your search');
    // }
    // if (searchRepList.length === 1) {
    //   searchRepList.unshift('Zero reps match your search');
    // }
    // if (searchMfgList.length === 0) {
    //   searchMfgList.unshift('Zero manufacturers match your search');
    // }

    searchMarketList.forEach(primaryListAppend('mark'));
    searchRepList.forEach(primaryListAppend('rep'));
    searchMfgList.forEach(primaryListAppend('mfg'));
  }

});

function searchFilter(input) {
  return function(list) {
    if ((list.toLowerCase()).includes(input.toLowerCase()) || list.includes('~')) {
      return list;
    }
  }
};

function primaryListAppend(type) {
  return function(value) {
    $('.primaryUl').append('<li class="' + type + ' primaryLi" id="' + value + '">' + value + '</li>');
  }
};

$('.primaryUl').on('click', '.primaryLi', function() {
  $('.primaryUl').empty();
  if (this.classList.contains('rep')) {
    repCard($(this).attr('id'));
  } else {
    var keys = Object.keys(repInfo);
    keys.forEach((key)=>{
      if (repInfo[key].market.includes($(this).attr('id'))) {
        repCard(key);
      } else if (repInfo[key].manufacturers.includes($(this).attr('id'))) {
        console.log($(this).attr('id'));
        repCard(key);
        $('.header.secondaryLi').text($(this).attr('id'));
        $('.lines.secondaryLi').hide();
      }
    });
  }
});

function repCard(selectionOutput) {
  $('.primaryUl').append('<li class="header secondaryLi">'+ selectionOutput + ' - '+ repInfo[selectionOutput].rank +'</li>');
  $('.primaryUl').append('<li class="subHeader secondaryLi">'+ repInfo[selectionOutput].market +'</li>');
  $('.primaryUl').append('<li class="conglomerate secondaryLi">'+ repInfo[selectionOutput].conglomerate +'</li>');
  $('.primaryUl').append('<li class="lines secondaryLi"><ul class="lineCard"></ul></li>');
  repInfo[selectionOutput].manufacturers.forEach(function(manu) {
    $('.lineCard').append('<li class="lines secondaryLi">'+ manu +'</li>');
  })
};

//
//
// function createList(effObject) {
//   $('.switch').hide();
// };
//
// createList(fixEff);
//
// var selection = {};
// var clickCount = 0;
//
// $('.lever').click(function() {
//   $("#unitSwitch").prop("checked") === false) {
//   var butUnit = selection.customUnit === 'Lumens' ? 'L' : 'W';
//   $('.clButton').text('Add C' + butUnit);
// });
//
// $('button.clButton').click(function() {
//   selection.customTarget = $('#customTarget').val();
//   $('#customTarget').val([]);
//   var unitMaxSelection = eval('selection.max' + selection.customUnit);
//
//     $('.' + buttonNum + ' .customMessage span').text('');
//     $('.temp').removeClass('selected');
// });
//
// $('.fixture').click(function(){
//   selection = {};
//   selection.customUnit = $("#unitSwitch").prop("checked") === true ? 'Watts' : 'Lumens';
//   $('#customTarget').val([]);
//   $('.shielding > .first').empty();
//   $('.shielding').prepend('<p>Shielding</p>');
//   $(this).addClass('selected');
//   selection.boardType = $(this).attr('value');
//
//   $('.lens').click(function() {
//     // document.getElementById("unitSwitch").checked = false;
//
//     $(this).siblings().removeClass('selected');
//
//     $('.altLens').click(function() {
//
//     });
//
//     $('div.board').on('click', '.cri', function() {
//
//       // document.getElementById("unitSwitch").checked = false;
//       $('.color').append('<div class="temp hover" name="50k">50K</div>');
//
//       $('.temp').click(function() {
//
//         $('.switch').show();
//
//         buttonNum = 'btn' + clickCount;
//
//         $('.output').append('<div class="' + buttonNum + ' outputCard"></div>');
//
//       });
//     });
//   });
// });
