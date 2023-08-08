const express = require('express');
const ExpressError = require("./expressError")
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use(morgan('dev'));


app.get('/mean', function (req, res) {
        if (!req.query.numbers) throw new ExpressError('Numbers are required', 400)
        const nums = req.query.numbers;
        // console.log(nums)

        // create new array with map
        const numsArray = nums.split(',').map(Number);
        // check if any value is NaN
        if (numsArray.some(isNaN)) {
            return res.status(400).json({
                operation: 'mean',
                error: 'Invalid numbers provided'
            });
        }

        let sum = 0;
        for (num of numsArray) {
            sum += num;
        }
        const mean = sum / numsArray.length;

        return res.json({
            response: {
                operation: 'mean',
                value: mean
            }
        });
    });

app.get('/median', function (req, res) {
    if (!req.query.numbers) throw new ExpressError('Numbers are required', 400)
    const nums = req.query.numbers;
    // console.log(nums)
    const numsArray = nums.split(',').map(Number);
    if (numsArray.some(isNaN)) {
        return res.status(400).json({
            operation: 'median',
            error: 'Invalid numbers provided'
        });
    }

    // sorts array in ascending
    numsArray.sort((a, b) => a - b);

    let median;

    const middleIndex = Math.floor(numsArray.length / 2);

    if (numsArray.length % 2 === 0) {
        median = (numsArray[middleIndex - 1] + numsArray[middleIndex]) / 2;
    } else {
        median = numsArray[middleIndex];
    }

    return res.json({
        response: {
            operation: 'median',
            value: median
        }
    });
});

app.get('/mode', function (req, res) {
    if (!req.query.numbers) throw new ExpressError('Numbers are required', 400)
    const nums = req.query.numbers;
    // console.log(nums)
    const numsArray = nums.split(',').map(Number);
    if (numsArray.some(isNaN)) {
        return res.status(400).json({
            operation: 'mode',
            error: 'Invalid numbers provided'
        });
    }

    const frequencyMap = new Map();
    numsArray.forEach(num => {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
    });

    let mode;
    let maxFrequency = 0;

    frequencyMap.forEach((frequency, num) => {
        if (frequency > maxFrequency) {
            maxFrequency = frequency;
            mode = [num];
        } else if (frequency === maxFrequency) {
            mode.push(num);
        }
    });

    return res.json({
        response: {
            operation: 'mode',
            value: mode
        }
    });
});




// 404 handler
app.use(function (req, res, next) {
    return new ExpressError("Not Found", 404);
});

// generic error handler
app.use(function (err, req, res, next) {
    // the default status is 500 Internal Server Error

    console.error(err)
    res.status(err.status || 500);

    // set the status and alert the user
    return res.json({
        error: err.msg,
    });
});
// end generic handler


module.exports = app;