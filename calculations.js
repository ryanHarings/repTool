











function createList(effObject) {
  $('.switch').hide();
};

createList(fixEff);

var selection = {};
var clickCount = 0;

$('.lever').click(function() {
  $("#unitSwitch").prop("checked") === false) {
  var butUnit = selection.customUnit === 'Lumens' ? 'L' : 'W';
  $('.clButton').text('Add C' + butUnit);
});

$('button.clButton').click(function() {
  selection.customTarget = $('#customTarget').val();
  $('#customTarget').val([]);
  var unitMaxSelection = eval('selection.max' + selection.customUnit);

    $('.' + buttonNum + ' .customMessage span').text('');
    $('.temp').removeClass('selected');
});

$('.fixture').click(function(){
  selection = {};
  selection.customUnit = $("#unitSwitch").prop("checked") === true ? 'Watts' : 'Lumens';
  $('#customTarget').val([]);
  $('.shielding > .first').empty();
  $('.shielding').prepend('<p>Shielding</p>');
  $(this).addClass('selected');
  selection.boardType = $(this).attr('value');

  $('.lens').click(function() {
    // document.getElementById("unitSwitch").checked = false;

    $(this).siblings().removeClass('selected');

    $('.altLens').click(function() {

    });

    $('div.board').on('click', '.cri', function() {

      // document.getElementById("unitSwitch").checked = false;
      $('.color').append('<div class="temp hover" name="50k">50K</div>');

      $('.temp').click(function() {

        $('.switch').show();

        buttonNum = 'btn' + clickCount;

        $('.output').append('<div class="' + buttonNum + ' outputCard"></div>');

      });
    });
  });
});
