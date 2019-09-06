let convertedJsonData = new Array();
const  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
let config = {
    stepLength: 0.762,
    calPerStep: 0.05,
    stepTime: 0.5
};
let totalSteps = 0;
var params = {
    totalSteps: 0,
    totalDistance: 0,
    totalCal: 0,
    totalTime: 0
};

getData("*");
function getData(date)
{
    params = {
        totalSteps: 0,
        totalDistance: 0,
        totalCal: 0,
        totalTime: 0
    };
    totalSteps = 0;
    if (date === "*")
    {
        $.get("https://api.myjson.com/bins/1gwnal", function (response) {
            $.each(response, function (key, value) {
                totalSteps += value.steps;
                convertedJsonData.push({dateInfo: convertToDateTime(value.timestamp), steps: value.steps});
            });
            calculateParams(totalSteps);
            console.log(convertedJsonData);
            $("#weeklyTotalSteps").text(params.totalSteps);
            $("#weeklyTotalDistance").text(Math.round(params.totalDistance * 100) / 100);
            $("#weeklyTotalCal").text(Math.round(params.totalCal * 100) / 100);
            $("#weeklyTotalTime").text(Math.round(params.totalTime * 100) / 100);

        });
    } else
    {
        if (dateValidation(date))
        {
            $.get("https://api.myjson.com/bins/1gwnal", function (response) {
                $.each(response, function (key, value) {
                    let tempDate = convertToDateTime(value.timestamp);
                    console.log(tempDate.date + date);
                    console.log(tempDate.date == date);
                    if (tempDate.date == date)
                    {
                        totalSteps += value.steps;
                        var dateInfo = convertToDateTime(value.timestamp);
                        $("#currentDay").text(dateInfo.day);
                    }

                });

                calculateParams(totalSteps);
                $("#dailySteps").text(params.totalSteps);
                $("#dailyKm").text(Math.round(params.totalDistance * 100) / 100);
                $("#dailyCal").text(Math.round(params.totalCal * 100) / 100);
                $("#dailyHours").text(Math.round(params.totalTime * 100) / 100);

            });
        }
    }

}


function dateValidation(date)
{
    let re = /^\d{1,2}\ \d{1,2}\, \d{4}$/;

    if (date != '' && !date.match(re)) {
        return false;
    }

    return true;
}
function calculateParams(totalSteps)
{
    params.totalSteps = totalSteps;
    params.totalDistance = params.totalSteps * config.stepLength / 1000;
    params.totalCal = params.totalSteps * config.calPerStep;
    params.totalTime = params.totalSteps * config.stepTime / 3600;
}

function convertToDateTime(timestamp)
{
    let date = new Date(timestamp);
    let convertedDateTime = {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        day: days[date.getDay() - 1],
        date: date.getMonth() + " " + date.getDay() + ", " + date.getFullYear()
    };
    return convertedDateTime;
}




$(document).ready(function () {
    $("#day").hide();
    $(".day").on("click", function () {
        $("#week").hide();
        $("#day").show();
    });
    $("#back").on("click", function () {
        $("#day").hide();
        $("#week").show();
    });



    $('.day').on('click', function () {
        $('.day').removeClass("active-button");
        $(this).addClass("active-button");
    });
});