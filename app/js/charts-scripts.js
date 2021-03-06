$(document).ready(function(){

    var theme = Highcharts.theme = {
        colors:["#2AB6F6", "#DA5023", "#66BB6A"],
    }
    Highcharts.setOptions(Highcharts.theme);
    var highcharts = Highcharts.chart('js-statistics-chart', {
        title: false,

        subtitle: false,

        yAxis: {
            title: false
        },

          xAxis: {
            categories: [
                'Mar 1',
                'Mar 2',
                'Mar 3',
                'Mar 4',
                'Mar 5',
                'Mar 6',
                'Mar 7',
                'Mar 8',
                'Mar 9',
                'Mar 10',
                'Mar 11',
                'Mar 12',
            ]
          },

        legend: {
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'top',
            symbolWidth: 0
        },
        tooltip: {
            backgroundColor: '#FCFCFC',
            borderRadius: 3,
            borderWidth: 1,
        },
        plotOptions: {
            series: {
                showCheckbox: true,
                marker: {
                    enabled: true,
                    radius: 4
                },
                dashStyle: 'longdash',
                lineWidth: 1,
                events: {
                    checkboxClick: function (event) {
                        if (event.checked) {
                            this.show();
                        } else {
                            this.hide();
                        }
                    }
                }
            }
        },

        yAxis: {
            min: 0,
            reversed: false,
            title: {
                enabled: false
            },
            labels: {
                format: '{value}'
            },
            maxPadding: 0.05,
            showLastLabel: true
        },

        series: [{
            name: 'Redeems',
            data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
        }, {
            name: 'App launch',
            data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
        }, {
            name: 'New users',
            data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
        }]                 
    });
    var left_1 = '56px';

    $('#js-statistics-chart input[type=checkbox]').each(function(i){
        var style = $(this).attr('style'),
            index = $(this).index(),
            text = $('.highcharts-legend-item text *').eq(i).text();

        $(this).removeAttr('style');
        $(this).trigger('click');
        $(this).wrapAll("<div class='highcharts-point-legend'></div>");
        $(this).parent().addClass('highcharts-point-legend-'+index);
        $(this).after('<span>'+text+'</span>');
    });

    $('.highcharts-point-legend').wrapAll('<div class="highcharts-point-legend_wrap"></div>');

})