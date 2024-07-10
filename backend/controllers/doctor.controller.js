import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Visited_Patient_Details } from "../models/visited_patient_details.model.js"
import { Bill_Info } from "../models/bill_info.model.js"
import { Appointment } from "../models/appointment.model.js"
// get daily patient count
// Get:- /api/v1/users/doctor/dailyPatientCountAndRevenue
const dailyWeeklyMonthlyPatientCount = asyncHandler(async (req, res) => {
    let currentDate = new Date();
    let previousDate = new Date(currentDate - 24 * 60 * 60 * 1000);
    let nextPreviousDate = new Date(previousDate - 24 * 60 * 60 * 1000);
    const PreviousDailyPatientsInfo = await Visited_Patient_Details.find({
        last_visited: {
            $gte: nextPreviousDate,
            $lte: previousDate
        }
    })

    const dailyPatientsInfo = await Visited_Patient_Details.find({
        last_visited: {
            $gte: previousDate,
            $lte: currentDate
        }
    })

    let dailyPatientCountDifference = PreviousDailyPatientsInfo.length - dailyPatientsInfo.length;
    currentDate = new Date();
    previousDate = new Date(currentDate - 6 * 24 * 60 * 60 * 1000);
    nextPreviousDate = new Date(previousDate - 6 * 24 * 60 * 60 * 1000);
    const PreviousWeeklyPatientsInfo = await Visited_Patient_Details.find({
        last_visited: {
            $gte: nextPreviousDate,
            $lte: previousDate
        }
    })
    const weeklyPatientsInfo = await Visited_Patient_Details.find({
        last_visited: {
            $gte: previousDate,
            $lte: currentDate
        }
    })
    let weeklyPatientCountDifference = PreviousWeeklyPatientsInfo.length - weeklyPatientsInfo.length;


    currentDate = new Date();
    if (currentDate.getMonth() + 1 === 1 || currentDate.getMonth() + 1 === 3 || currentDate.getMonth() + 1 === 5 || currentDate.getMonth() + 1 === 7 || currentDate.getMonth() + 1 === 8 || currentDate.getMonth() + 1 === 10 || currentDate.getMonth() + 1 === 12) {
        previousDate = new Date(currentDate - 30 * 24 * 60 * 60 * 1000);
        nextPreviousDate = new Date(previousDate - 30 * 24 * 60 * 60 * 1000);
    }

    else if (currentDate.getMonth() + 1 === 4 || currentDate.getMonth() + 1 === 6 || currentDate.getMonth() + 1 === 8 || currentDate.getMonth() + 1 === 11) {
        previousDate = new Date(currentDate - 29 * 24 * 60 * 60 * 1000);
        nextPreviousDate = new Date(previousDate - 29 * 24 * 60 * 60 * 1000);
    }

    else {
        if (currentDate.getFullYear() % 4 === 0) {
            previousDate = new Date(currentDate - 28 * 24 * 60 * 60 * 1000);
            nextPreviousDate = new Date(previousDate - 28 * 24 * 60 * 60 * 1000);
        }
        else {
            previousDate = new Date(currentDate - 27 * 24 * 60 * 60 * 1000);
            nextPreviousDate = new Date(previousDate - 28 * 24 * 60 * 60 * 1000);
        }
    }

    const previousMonthlyPatientsInfo = await Visited_Patient_Details.find({
        last_visited: {
            $gte: nextPreviousDate,
            $lte: previousDate
        }
    })

    const monthlyPatientsInfo = await Visited_Patient_Details.find({
        last_visited: {
            $gte: previousDate,
            $lte: currentDate
        }
    })

    let monthlyPatientCountDifference = previousMonthlyPatientsInfo.length - monthlyPatientsInfo.length;
    const responseData = [];
    responseData.push({ title: "Daily Patient Count", count: dailyPatientsInfo.length, "difference": dailyPatientCountDifference })
    responseData.push({ title: "Weekly Patient Count", count: weeklyPatientsInfo.length, "difference": weeklyPatientCountDifference })
    responseData.push({ title: "Monthly Patient Count", count: monthlyPatientsInfo.length, "difference": monthlyPatientCountDifference })

    return res.status(200).json(new ApiResponse(200, responseData, "Daily, Weekly and monthly patient countfetched sucessfully"))
})

const dailyWeeklyMonthlyRevenue = asyncHandler(async (req, res) => {
    let currentDate = new Date();
    let previousDate = new Date(currentDate - 24 * 60 * 60 * 1000);
    let nextPreviousDate = new Date(previousDate - 24 * 60 * 60 * 1000);
    const dailyRevenueInfo = await Bill_Info.find({
        createdAt: {
            $gte: previousDate,
            $lte: currentDate
        }
    })
    const previousDailyRevenueInfo = await Bill_Info.find({
        createdAt: {
            $gte: nextPreviousDate,
            $lte: previousDate
        }
    })

    currentDate = new Date();
    previousDate = new Date(currentDate - 6 * 24 * 60 * 60 * 1000);
    nextPreviousDate = new Date(previousDate - 6 * 24 * 60 * 60 * 1000);
    const weeklyRevenueInfo = await Bill_Info.find({
        createdAt: {
            $gte: previousDate,
            $lte: currentDate
        }
    })

    const previousWeeklyRevenueInfo = await Bill_Info.find({
        createdAt: {
            $gte: nextPreviousDate,
            $lte: previousDate
        }
    })


    currentDate = new Date();
    if (currentDate.getMonth() + 1 === 1 || currentDate.getMonth() + 1 === 3 || currentDate.getMonth() + 1 === 5 || currentDate.getMonth() + 1 === 7 || currentDate.getMonth() + 1 === 8 || currentDate.getMonth() + 1 === 10 || currentDate.getMonth() + 1 === 12) {
        previousDate = new Date(currentDate - 30 * 24 * 60 * 60 * 1000);
        nextPreviousDate = new Date(previousDate - 30 * 24 * 60 * 60 * 1000);
    }

    else if (currentDate.getMonth() + 1 === 4 || currentDate.getMonth() + 1 === 6 || currentDate.getMonth() + 1 === 8 || currentDate.getMonth() + 1 === 11) {
        previousDate = new Date(currentDate - 29 * 24 * 60 * 60 * 1000);
        nextPreviousDate = new Date(previousDate - 29 * 24 * 60 * 60 * 1000);
    }

    else {
        if (currentDate.getFullYear() % 4 === 0) {
            previousDate = new Date(currentDate - 28 * 24 * 60 * 60 * 1000);
            nextPreviousDate = new Date(previousDate - 28 * 24 * 60 * 60 * 1000);
        }
        else {
            previousDate = new Date(currentDate - 27 * 24 * 60 * 60 * 1000);
            nextPreviousDate = new Date(previousDate - 28 * 24 * 60 * 60 * 1000);
        }
    }

    const monthlyRevenueInfo = await Bill_Info.find({
        createdAt: {
            $gte: previousDate,
            $lte: currentDate
        }
    })

    const previousMonthlyRevenueInfo = await Bill_Info.find({
        createdAt: {
            $gte: nextPreviousDate,
            $lte: previousDate
        }
    })

    let dailyRevenue = 0;
    let previousDailyRevenue = 0;
    for (let i = 0; i < dailyRevenueInfo.length; ++i) {
        dailyRevenue += dailyRevenueInfo[i].amount;
        if (previousDailyRevenueInfo.length > 0) previousDailyRevenue += previousDailyRevenueInfo[i].amount;
    }

    let weeklyRevenue = 0;
    let previousWeeklyRevenue = 0;
    for (let i = 0; i < weeklyRevenueInfo.length; ++i) {
        weeklyRevenue += weeklyRevenueInfo[i].amount;
        if (previousWeeklyRevenueInfo.length > 0) previousWeeklyRevenue += previousWeeklyRevenueInfo[i].amount;
    }

    let monthlyRevenue = 0;
    let previousMonthlyRevenue = 0;
    for (let i = 0; i < monthlyRevenueInfo.length; ++i) {
        monthlyRevenue += monthlyRevenueInfo[i].amount;
        if (previousMonthlyRevenueInfo.length > 0) previousMonthlyRevenue += previousMonthlyRevenueInfo[i].amount;
    }
    let dailyDiff = dailyRevenue - previousDailyRevenue;
    let weeklyDiff = weeklyRevenue - previousWeeklyRevenue;
    let monthlyDiff = monthlyRevenue - previousMonthlyRevenue;
    const responseData = [];
    responseData.push({ title: "Daily Revenue", count: dailyRevenue, difference: dailyDiff })
    responseData.push({ title: "Weekly Revenue", count: weeklyRevenue, difference: weeklyDiff })
    responseData.push({ title: "Monthly Revenue", count: monthlyRevenue, difference: monthlyDiff })
    return res.status(200).json(new ApiResponse(200, responseData, "Daily, Weekly and monthly patient count fetched sucessfully"))
})

// Average Appointments per day
// Get :- /api/v1/users/doctor/averageAppointments
const averageAppointmentsPerDay = asyncHandler(async (req, res) => {
    const currentDate = new Date();
    const previousDate = new Date(currentDate - 6 * 24 * 60 * 60 * 1000);
    const nextPreviousDate = new Date(previousDate - 6 * 24 * 60 * 60 * 1000);
    const lastMonthsTotalApp = await Appointment.find({
        date_of_app: {
            $gte: previousDate,
            $lte: currentDate
        }
    })
    const previousLastMonthsTotalApp = await Appointment.find({
        date_of_app: {
            $gte: nextPreviousDate,
            $lte: previousDate
        }
    })
    const avgAppointments = Math.ceil(lastMonthsTotalApp?.length / 7);
    const previousAvgAppointments = Math.ceil(previousLastMonthsTotalApp?.length / 7);
    return res.status(200).json(new ApiResponse(200, { "Average_Appointments": avgAppointments, difference: avgAppointments - previousAvgAppointments }, "Average appointments per day fetched sucessfully"))
})
export {
    dailyWeeklyMonthlyPatientCount,
    dailyWeeklyMonthlyRevenue,
    averageAppointmentsPerDay
}