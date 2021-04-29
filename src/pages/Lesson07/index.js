import React from "react";
import LessonPage from "../../components/LessonPage";
import Chart from "../../components/Chart07";
import instruction from "./instruction.md";

/*　模範
const convertData = (input) => {
  for (const item of input) {
    const d = new Date(`${item.createdAt} UTC`);
    const year = d.getFullYear();
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const date = `${d.getDate()}`.padStart(2, "0");
    item.createdAt = `${year}-${month}-${date}`;
  }
  const dates = Array.from(new Set(input.map(({ createdAt }) => createdAt)));
  dates.sort();
  const count = { tweet: {}, retweet: {} };
  for (const d of dates) {
    count.tweet[d] = 0;
    count.retweet[d] = 0;
  }
  for (const { createdAt, isRetweet } of input) {
    if (isRetweet) {
      count.retweet[createdAt] += 1;
    } else {
      count.tweet[createdAt] += 1;
    }
  }
  return ["tweet", "retweet"].map((key) => {
    return {
      id: key,
      data: dates.map((d) => {
        return {
          x: d,
          y: count[key][d],
        };
      }),
    };
  });
}; */

const convertData = (input) => {
  for (const item of input) {
    const d = new Date(`${item.createdAt} UTC`);
    const y = d.getFullYear();
    const m = `${d.getMonth() + 1}`.padStart(2, "0")
    const date = `${ d.getDate()}`.padStart(2, "0")
    item.createdAt = `${y}-${m}-${date}`
  }
  const date = Array.from(new Set(input.map((item)=>item.createdAt.slice(0, 10))));
  const count = {tweet:{}, retweet:{}}
  for(const d of date){
    count.tweet[d] = 0
    count.retweet[d] = 0
  }
  input.map((item)=>item.isRetweet===false?count.tweet[item.createdAt.slice(0, 10)]+=1 : count.retweet[item.createdAt.slice(0, 10)]+=1)
  const data = ["tweet", "retweet"].map((item) => { return ({ "id": item, "data":date.map((d)=> {return({"x":d, "y":count[item][d]})})}) })
  return data;
};

const Lesson = () => {
  return (
    <LessonPage
      answerUrl="/answer07"
      convertData={convertData}
      dataUrl="data/covid19-tweets.json"
      instruction={instruction}
      title="Lesson 07"
      Chart={Chart}
    />
  );
};

export default Lesson;
