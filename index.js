$(function () {
    var dateArrays = [
        "2015.2.3", "2015.2.4", "2015.2.5", "2015.2.6", "2015.2.7", "2015.2.8",
        "2015.2.9", "2015.2.10", "2015.2.11", "2015.2.12", "2015.2.13", "2015.2.14"
    ];

    datePicker(dateArrays);

    function datePicker(dateArrays) {
        // 添加文字
        var textWidth = 100;
        var itemsNum = dateArrays.length;

        var svg = d3.select("#timePicker").select("svg")
            .style("width", function () {
                return textWidth * itemsNum + "px";
            });

        d3.select("#timeLine").attr("width", function () {
            return textWidth * itemsNum + "px";
        });

        var timeLineTextGroup = svg.append("g");
        var timeLineRect = svg.append("g");

        timeLineTextGroup.selectAll("text")
            .data(dateArrays)
            .enter()
            .append("text")
            .attr({
                "x": function (d, i) {
                    return 100 * i + "px";
                },
                "y": "60px",
            })
            .style({
                "font-size": "10px",
                "stroke": "white"
            })
            .text(function (d, i) {
                return d;
            });

        timeLineRect.selectAll("rect")
            .data(dateArrays)
            .enter()
            .append("rect")
            .attr({
                "x": function (d, i) {
                    return 100 * i + "px";
                },
                "y": "10px",
                "width": "5px",
                "height": "40px",
                "transform": "translate(20,0)",
                "value": function (d, i) {
                    return d;
                }
            })
            .style({
                "fill": "#ff942b",
                "cursor": "pointer"
            })
            .on({
                "mouseover": function (d, i) {
                    // console.log(d);
                }
            });

        var drag = d3.behavior.drag()
            .origin(function () {
                return { x: d3.select(this).attr("x"), y: d3.select(this).attr("y") };
            })
            .on("dragstart", function () {

            })
            .on("drag", function () {
                var x = d3.event.x;
                if (x < 0 || x > 990)
                    return;
                d3.select(this).attr("x", x);
            })
            .on("dragend", function () {

                var max = d3.select("#startSlider").attr("x") > d3.select("#endSlider").attr("x") ? d3.select("#startSlider").attr("x") : d3.select("#endSlider").attr("x");
                var min = d3.select("#startSlider").attr("x") < d3.select("#endSlider").attr("x") ? d3.select("#startSlider").attr("x") : d3.select("#endSlider").attr("x");

                //选择的日期都会被保存在selectedDate里面
                var selectedDate = [];

                timeLineRect.selectAll("rect").each(function () {
                    if (d3.select(this).attr("x") > min && d3.select(this).attr("x") < max) {
                        selectedDate.push(d3.select(this).attr("value"));
                    }
                });

                console.log(selectedDate);
            });

        d3.select("#startSlider").call(drag);
        d3.select("#endSlider").call(drag);
    }
});