$(document).on('input','.slider-covid',function() {
    var value = $(this).val()
    if (value <= 33) {
        $('.box-slider-list').attr('class','box-slider-list')
        $('#human1').attr('class','active')
        $('#human1').find('span').attr('class','active name-covid')
        $('#box-slider1').attr('class','box-slider-list active')
        $('#human2').attr('class','')
        $('#human2').find('span').attr('class','name-covid')
        $('#human3').attr('class','')
        $('#human3').find('span').attr('class','name-covid')
    } else if( value < 73 && value >33) {
        $('.box-slider-list').attr('class','box-slider-list')
        $('#human1').attr('class','')
        $('#human1').find('span').attr('class','name-covid')
        $('#human2').attr('class','active')
        $('#human2').find('span').attr('class','active name-covid')
        $('#box-slider2').attr('class','box-slider-list active')
        $('#human3').attr('class','')
        $('#human3').find('span').attr('class','name-covid')
    } else{
        $('.box-slider-list').attr('class','box-slider-list')
        $('#human1').attr('class','')
        $('#human1').find('span').attr('class','name-covid')
        $('#human2').attr('class','')
        $('#human2').find('span').attr('class','name-covid')
        $('#human3').attr('class','active')
        $('#human3').find('span').attr('class','active name-covid')
        $('#box-slider3').attr('class','box-slider-list active')
    }
})

$('.covid').on('click',function() {
    $('body').attr('class','')
    var url = $(this).attr('href')
    $('.main').attr('class','bounceOut main')
    setTimeout(function(){ $('.main').hide()}, 750);
    setTimeout(function(){ $(url).attr('class','slideInUp')}, 760);
})

$('#start').on('click',function() {
    $('.start-section').attr('class','bounceOut start-section')
    setTimeout(function(){ $('#game-1').attr('class','question bounceIn')}, 755);
})

$('.answer').on('click',function() {
    var data = $(this).data('value')
    console.log(data);
    
    var dataSplit = data.split("|");
    $('#'+dataSplit[1]).attr('class','question fadeOutLeftBig')
    setTimeout(function(){ $('#'+dataSplit[0]).attr('class','question fadeInRightBig')}, 500);
})

$('.repeat').on('click',function() {
    var data = $(this).data('value')
    $('#'+data).attr('class','hide question bounceOut')
    setTimeout(function(){ $('.start-section').attr('class','start-section bounceIn')}, 500);
})