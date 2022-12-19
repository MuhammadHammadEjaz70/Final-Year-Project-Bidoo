import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { getProduct, p_bidStatus } from "../../../functions/product.functions";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { userBidCart } from "../../../functions/user";

export function getRemainingTimeUntilMsTimestamp(
  timestampMs,
  slug,
  productBidStatus,
  product
) {
  const timestampDayjs = dayjs(timestampMs);
  const nowDayjs = dayjs();
  if (timestampDayjs.isBefore(nowDayjs)) {
    // const bidCart = [];
    // bidCart.push(product);
    userBidCart(product, product.bidPostedBy).then((res) => {
      // console.log(bidCart);
    });

    p_bidStatus(slug, productBidStatus)
      .then((res) => {
        toast.success("Bid is Comepleted");
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });

    return {
      seconds: "00",
      minutes: "00",
      hours: "00",
      days: "00",
      time: 0,
    };
  }
  return {
    seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
    minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
    hours: getRemainingHours(nowDayjs, timestampDayjs),
    days: getRemainingDays(nowDayjs, timestampDayjs),
  };
}

function getRemainingSeconds(nowDayjs, timestampDayjs) {
  const seconds = timestampDayjs.diff(nowDayjs, "seconds") % 60;
  return padWithZeros(seconds, 2);
}

function getRemainingMinutes(nowDayjs, timestampDayjs) {
  const minutes = timestampDayjs.diff(nowDayjs, "minutes") % 60;
  return padWithZeros(minutes, 2);
}

function getRemainingHours(nowDayjs, timestampDayjs) {
  const hours = timestampDayjs.diff(nowDayjs, "hours") % 24;
  return padWithZeros(hours, 2);
}

function getRemainingDays(nowDayjs, timestampDayjs) {
  const days = timestampDayjs.diff(nowDayjs, "days");
  return days.toString();
}

function padWithZeros(number, minLength) {
  const numberString = number.toString();
  if (numberString.length >= minLength) return numberString;
  return "0".repeat(minLength - numberString.length) + numberString;
}
