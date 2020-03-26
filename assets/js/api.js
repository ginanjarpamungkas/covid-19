// get api data from https://data.kemkes.go.id/
var USERNAME = 'covid19'
var PASSWORD = 'Covid19%'
//jumlah kasus
$.ajax
  ({
    type: "GET",
    url: "https://data.kemkes.go.id/data/api/analytics.json?dimension=dx:U7BaEXUa1Ii&dimension=pe:THIS_YEAR&filter=ou:amZZzlibrMp&skipData=false&skipMeta=false&includeNumDen=false&displayProperty=SHORTNAME",
    dataType: 'json',
    enctype: 'multipart/form-data',
    headers: {"Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)},
    success: function (data){
      $('#positif-count').html(data.rows[0][2])
    }
});
// jumlah kasus sembuh
$.ajax
  ({
    type: "GET",
    url: "https://data.kemkes.go.id/data/api/analytics.json?dimension=dx:UEBmmFH8OzT&dimension=pe:THIS_YEAR&filter=ou:amZZzlibrMp&skipData=false&skipMeta=false&includeNumDen=false&displayProperty=SHORTNAME",
    dataType: 'json',
    enctype: 'multipart/form-data',
    headers: {"Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)},
    success: function (data){
      $('#sembuh-count').html(data.rows[0][2])
    }
});
// jumlah kasus meninggal
$.ajax
  ({
    type: "GET",
    url: "https://data.kemkes.go.id/data/api/analytics.json?dimension=dx:TAqRuO1R1eI&dimension=pe:THIS_YEAR&filter=ou:amZZzlibrMp&skipData=false&skipMeta=false&includeNumDen=false&displayProperty=SHORTNAME",
    dataType: 'json',
    enctype: 'multipart/form-data',
    headers: {"Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD)},
    success: function (data){
      $('#mati-count').html(data.rows[0][2])
    }
});

