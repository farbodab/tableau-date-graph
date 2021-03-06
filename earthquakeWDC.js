(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
      var cols = [{
        id: "country",
        alias: "country",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "date",
        alias: "date",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "cases",
        alias: "cases",
        dataType: tableau.dataTypeEnum.string
    },];

    var tableSchema = {
        id: "growth",
        alias: "Case Growth",
        columns: cols
    };

    schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
      $.getJSON("https://flatteningthecurve.herokuapp.com/covid/results/date", function(resp) {
          var feat = resp,
              tableData = [];

          var countries = Object.keys(feat)
          var dates = null
          var country = countries[1]
          var date = null
          var clen = countries.length

          for (var i = 0; i < clen; i++) {
            country = countries[i]
            dates = Object.keys(feat[country])
            for (var j = 0, len = dates.length; j < len; j++) {
                date = dates[j]
                tableData.push({
                    "country": countries[i],
                    "date": dates[j],
                    "cases": feat[country][date]
                });
            }
          }

          table.appendRows(tableData);
          doneCallback();
      });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "USGS Earthquake Feed";
        tableau.submit();
    });
});

})();
