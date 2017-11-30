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
  $('.mainMenu').children().removeClass('selected');
  $('.marketMain').addClass('selected');
  $('.primaryUl').empty();
  marketRegionsList.forEach(primaryListAppend('mark'))
});

$('.repMain').click(function() {
  $('.mainMenu').children().removeClass('selected');
  $('.repMain').addClass('selected');
  $('.primaryUl').empty();
  repAgenciesList.forEach(primaryListAppend('rep'))
});

$('.mfgMain').click(function() {
  $('.mainMenu').children().removeClass('selected');
  $('.mfgMain').addClass('selected');
  $('.primaryUl').empty();
  manufacturersList.forEach(primaryListAppend('mfg'))
});

$('#search').keyup(() => {
  $('.mainMenu').children().removeClass('selected');
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

$('.clear').click(function() {
  $('#search').val('');
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
  $('.primaryUl').append('<li class="conglomerate secondaryLi">Conglomerate: '+ repInfo[selectionOutput].conglomerate +'</li>');
  $('.primaryUl').append('<li class="lines secondaryLi"><ul class="lineCard secondaryUl"></ul></li>');
  repInfo[selectionOutput].manufacturers.forEach(function(manu) {
    $('.lineCard').append('<li class="lines secondaryLi">'+ manu +'</li>');
  })
};
