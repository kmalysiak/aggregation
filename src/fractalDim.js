'use strict'

import {Point} from './commonClasses';

export {fractalDim}
function fractalDim(seedX, seedY, maxR,  canvasData, isAggregate) {
    if (maxR < 15)
        return 0;
    var minR = 5
    maxR = Math.floor(maxR / 2);

    var aggregateSize = [];
    var aggregateMass = [];
    for (var rad = minR; rad <= maxR; rad++) {

        var ilecz = 0;

        for (var i = seedX - rad; i <= seedX + rad; i++)
            for (var j = seedY - rad; j <= seedY + rad; j++) {
                var squaredDistFromCenter = (i - seedX) * (i - seedX) + (j - seedY) * (j - seedY);
                let pt = new Point(i,j);
                if (squaredDistFromCenter <= (rad * rad) && isAggregate(pt, canvasData))
                    ilecz++;
            }

        aggregateSize.push(Math.log10(rad));
        aggregateMass.push(Math.log10(ilecz));
    }

    var ans = linearRegression(aggregateMass, aggregateSize);
    document.getElementById("fdim").innerHTML = Math.round(ans.slope * 1000) / 1000;
}


var linearRegression = function (y, x) {
    var lr = {};
    var n = y.length;
    var sum_x = 0;
    var sum_y = 0;
    var sum_xy = 0;
    var sum_xx = 0;
    var sum_yy = 0;

    for (var i = 0; i < y.length; i++) {

        sum_x += x[i];
        sum_y += y[i];
        sum_xy += (x[i] * y[i]);
        sum_xx += (x[i] * x[i]);
        sum_yy += (y[i] * y[i]);
    }

    lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n * sum_xx - sum_x * sum_x);
    lr['intercept'] = (sum_y - lr.slope * sum_x) / n;
    lr['r2'] = Math.pow((n * sum_xy - sum_x * sum_y) / Math.sqrt((n * sum_xx - sum_x * sum_x) * (n * sum_yy - sum_y * sum_y)), 2);

    return lr
}