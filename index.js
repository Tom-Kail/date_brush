$(function () {
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
            console.log(d3.select(this).attr("x"));
        });

    d3.select("#leftSlider").call(drag);
    d3.select("#rightSlider").call(drag);
});