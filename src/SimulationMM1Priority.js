import React, { useState, useEffect } from "react";
//
import RandomDataTab from "./Simulation/MM1Priority/RandomDataTabMM1";
import CalculatedDataTab from "./Simulation/MM1Priority/CalculatedDataTabMM1";
import GraphicalViewTab from "./Simulation/MM1Priority/GraphicalViewTabMM1";
import "./App.css";
import { factorialIterative } from "./App";
//

const SimulationMM1Priority = ({
  setMm1,
  mm1,
  arrivalMean,
  serviceMean,
  setArrivalMean,
  setServiceMean,
  onClick,
  // activeTab,
  // setActiveTab,
}) => {
  const [activeTab, setActiveTab] = useState("random");
  const [randomData, setRandomData] = useState([]);
  const [calculatedData, setCalculatedData] = useState([]);
  const [probility, setProbabilty] = useState(0);

  // const [arrivalMean, setArrivalMean] = useState(0);
  // const [serviceMean, setServiceMean] = useState(0);
  //

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  // console.log("annas");

  useEffect(() => {
    // console.log("useEffect ch");
    //
    const arrivalMeanParam = arrivalMean;
    const serviceMeanParam = serviceMean;

    if (!isNaN(arrivalMeanParam) && !isNaN(serviceMeanParam)) {
      setArrivalMean(arrivalMeanParam);
      setServiceMean(serviceMeanParam);

      const data = generateRandomData(50, arrivalMeanParam, serviceMeanParam);
      setRandomData(data);

      const calculatedData = calculateCalculatedData(data);
      setCalculatedData(calculatedData);
    }
  }, [mm1]);

  const generatePriority = (Z) => {
    const a = 3;
    const b = 1;
    const A = 55;
    const M = 1194;
    const C = 9;
    const R = (A * Z + C) % M;
    const priority = Math.round((b - a) * (R / M) + a);
    return [priority, R];
  };
  const generateRandomData = (count, arrivalMean, serviceMean) => {
    const data = [];
    let arrivalTime = 0;
    let val = 0;
    let Z = 10112166;
    for (let i = 1; i <= count; i++) {
      let interarrivalTime = Math.round(generateRandomTime(arrivalMean));
      if (i == 1) {
        console.log("chk passs");
        interarrivalTime = 0;
      }
      console.log(interarrivalTime);
      console.log(i == 1);
      const serviceTime = Math.round(generateRandomTime(serviceMean));

      const tempArr = generatePriority(Z);
      const priority = tempArr[0];
      Z = tempArr[1];
      arrivalTime += interarrivalTime;

      data?.push({
        customer: i,
        interarrivalTime,
        arrivalTime: arrivalTime,
        serviceTime: Math.max(1, Math.min(10, serviceTime)), // Ensure value is within 1 to 10 range
        priority,
      });

      const numerator = Math.exp(-arrivalMean) * Math.pow(arrivalMean, i - 1);
      const denominator = factorialIterative(i - 1);
      val = val + numerator / denominator;
      // console.log(data);
      if (val >= 0.99) {
        // break;
        return data.slice(0, -1);
        // return data;
      }
    }
    return data;
  };

  // const intialFunc = (mean) => {
  //   if (probility === 0) {
  //     generateRandomTime(mean);

  //     setProbabilty(1);
  //     return;
  //   }

  //   poisonGenetrate(mean, probility);
  //   setProbabilty(probility + 1);

  //   // do {
  //   //   generateRandomTime(mean);
  //   //   i = 1;
  //   // } while (poisonGenetrate(mean, i));
  // };
  // const poisonGenetrate = (mean, x) => {
  //   let fact = factorialIterative(x);
  //   let val = (Math.exp ** -mean * mean ** x) / fact;
  //   console.log(val);
  //   // if ((Math.exp ** -mean * mean ** x) / fact == 1) {
  //   //   console.log((Math.exp ** -mean * mean ** x) / fact);
  //   //   return false;
  //   // } else {
  //   //   setProbabilty(1);
  //   //   return true;
  //   // }
  // };

  const generateRandomTime = (mean) => {
    // Generate a random number between 0 and 1
    const randomNumber = Math.random();
    // Calculate the time based on the mean
    const time = Math.round(-Math.log(1 - randomNumber) * mean);
    return time;
  };

  const calculateCalculatedData = (data) => {
    const tempArr = [];
    data = data.map((obj) => ({
      ...obj,
      completed: false,
    }));
    let tempArray = [];
    for (let i = 0; i < data.length; i++) {
      tempArray.push({
        ...data[i],
        end: data[i].serviceTime + data[i].arrivalTime,
      });
    }
    data = [...tempArray];
    console.log(data, "daaatttaaa");
    if (data.length) {
      const calculatedData = [];
      let serverIdleTime = 0;
      let serverUtilizationTime = 0;
      console.log(data);
      const priority1Array = data.filter((e) => e.priority == 1);
      const priority2Array = data.filter((e) => e.priority == 2);
      const priority3Array = data.filter((e) => e.priority == 3);

      let startTime = 0;
      let totalWaitTime = 0;
      let totalTurnaroundTime = 0;
      console.log(data);
      console.log(priority1Array[0]);
      console.log(priority2Array[0]);
      console.log(priority3Array[0]);
      console.log(priority3Array[0]);
      let finalData = [];
      for (var i = 0; i < data.length; i++) {
        // console.log(data[i].end);
        if (data[i].priority == 3) {
          console.log("priority3");
          finalData.push(data[i]);
          startTime = startTime + data[i].end;
          priority3Array.shift();
        } else if (data[i].priority == 2) {
          console.log("priority2");
          
          if (data[i].end >= priority3Array[0]?.arrivalTime) {
            console.log("priority23");
            const temp = { ...data[i] };
            temp.end = priority3Array[0].arrivalTime;
            temp.service = temp.end - temp.arrivalTime;
            startTime = startTime + temp.end;
            console.log(temp, "temp priority23");
            finalData.push(temp);
            let lastinter;
            while (startTime >= priority3Array[0]?.arrivalTime) {
              finalData.push(priority3Array[0]);
              data = data.filter(
                (e) => e.customer != priority3Array[0].customer
              );
              lastinter = priority3Array[0]?.end;
              console.log(priority3Array, "priority3Array before 23");
              startTime = startTime + priority3Array[0]?.end;
              priority3Array.shift();
              console.log(priority3Array, "priority3Array after 23");
            }
            const temp2 = { ...data[i] };
            temp2.arrivalTime = lastinter;
            temp2.service = temp2.service - temp.service;
            temp2.end = temp2.arrivalTime + temp.service;
            startTime = startTime + temp2.end;
            console.log(temp2, "temp priority23");
            finalData.push(temp2);
            priority2Array.shift();
          } else {
            console.log("priority22");
            finalData.push(data[i]);
            startTime = startTime + data[i].end;
            console.log(priority2Array, "priority2Array after 22");
            priority2Array.shift();
            console.log(priority2Array, "priority2Array after 22");
          }
        } else if (data[i].priority == 1) {
          console.log("priority1");
          if (data[i].end >= priority3Array[0]?.arrivalTime) {
            console.log("priority13");
            const temp = { ...data[i] };
            temp.end = priority3Array[0].arrivalTime;
            temp.service = temp.end - temp.arrivalTime;
            console.log(temp, "temp priority13");
            finalData.push(temp);
            startTime = startTime + temp.end;
            let lastinter;
            while (
              startTime >= priority3Array[0]?.arrivalTime ||
              startTime >= priority2Array[0]?.arrivalTime
            ) {
              if (startTime >= priority3Array[0]?.arrivalTime) {
                finalData.push(priority3Array[0]);
                startTime = startTime + priority3Array[0].end;
                data = data.filter(
                  (e) => e.customer != priority3Array[0].customer
                );
                lastinter = priority3Array[0]?.end;
                priority3Array.shift();
              } else if (startTime >= priority2Array[0]?.arrivalTime) {
                finalData.push(priority2Array[0]);
                startTime = startTime + priority2Array[0].end;
                data = data.filter(
                  (e) => e.customer != priority2Array[0].customer
                );
                lastinter = priority2Array[0]?.end;
                console.log(priority2Array, "priority2Array before 12");
                priority2Array.shift();
                console.log(priority2Array, "priority2Array after 12");
              }
            }
            const temp2 = { ...data[i] };
            temp2.arrivalTime = lastinter;
            temp2.service = temp2.service - temp.service;
            temp2.end = temp2.arrivalTime + temp2.service;
            console.log(temp2, "temp2 priority23");
            finalData.push(temp2);
            startTime = startTime + temp2.end;
            console.log(priority2Array, "priority2Array before 13");
            priority1Array.shift();
            console.log(priority2Array, "priority2Array after 13");

            // }
          } else if (data[i].end >= priority2Array[0]?.arrivalTime) {
            console.log("priority12");
            let temp = { ...data[i] };
            temp.end = priority2Array[0]?.arrivalTime;
            temp.service = temp.end - temp.arrivalTime;
            console.log(temp, "temp priority121111");
            finalData.push(temp);
            startTime = startTime + temp.end;
            let lastinter;
            while (
              startTime >= priority3Array[0]?.arrivalTime ||
              startTime >= priority2Array[0]?.arrivalTime
            ) {
              if (startTime >= priority3Array[0]?.arrivalTime) {
                finalData.push(priority3Array[0]);
                startTime = startTime + priority3Array[0].end;
                data = data.filter(
                  (e) => e.customer != priority3Array[0].customer
                );
                lastinter = priority3Array[0]?.end;
                priority3Array.shift();
              } else if (startTime >= priority2Array[0]?.arrivalTime) {
                finalData.push(priority2Array[0]);
                startTime = startTime + priority2Array[0].end;
                data = data.filter(
                  (e) => e.customer != priority2Array[0].customer
                );
                lastinter = priority2Array[0]?.end;
                console.log(priority2Array, "priority2Array before 12");
                priority2Array.shift();
                console.log(priority2Array, "priority2Array after 12");
              }
            }
            const temp2 = { ...data[i] };
            temp2.arrivalTime = lastinter;
            temp2.service = temp2.service - temp.service;
            temp2.end = temp2.arrivalTime + temp2.service;
            console.log(temp2, "temp2 priority12");
            finalData.push(temp2);
            console.log(finalData);
            startTime = startTime + temp2.end;
          } else {
            console.log("priority11");
            finalData.push(data[i]);
            startTime = startTime + data[i].end;
            console.log(priority1Array, "priority1Array before 11");
            priority1Array.shift();
            console.log(priority1Array, "priority1Array after 11");
          }
        }
      }
      startTime = 0;
      // finalData = finalData.filter((v) => v.service >= 0);
      console.log(finalData, "11111");
      for (let i = 0; i < finalData.length; i++) {
        const { customer, interarrivalTime, arrivalTime, serviceTime } =
          finalData[i];
        const endTime = Math.max(arrivalTime, startTime) + serviceTime;
        console.log(startTime, 111111);
        const waitTime = Math.max(1, startTime - arrivalTime);
        // const waitTime =endTime-startTime-serviceTime;
        const turnaroundTime = waitTime + serviceTime;
        calculatedData.push({
          customer,
          interarrivalTime,
          arrivalTime,
          serviceTime,
          startTime: Math.max(arrivalTime, startTime),
          endTime,
          waitTime: waitTime - 1,
          turnaroundTime,
        });

        totalWaitTime += waitTime;
        totalTurnaroundTime += turnaroundTime;

        serverUtilizationTime += serviceTime;

        startTime = endTime;
      }

      const averageWaitTime = totalWaitTime / finalData.length;
      const averageTurnaroundTime = totalTurnaroundTime / finalData.length;
      const totalTime = startTime;
      const serverUtilization = serverUtilizationTime / totalTime;
      const serverIdle = 1 - serverUtilization;
      return {
        calculatedData,
        averageWaitTime,
        averageTurnaroundTime,
        serverUtilization,
        serverIdle,
      };
      // return {
      //   ...priority3CalculatedData(),
      //   ...priority2CalculatedData(),
      //   ...priority1CalculatedData(),
      // };
    }
  };

  return (
    <div className="flex flex-col items-center w-full  min-h-screen">
      <div className="w-full max-w-3xl/ flex justify-center gap-10 my-6 px-24">
        <button
          className={`tab-button bg-gray-50 border styled text-lg rounded-lg block w-full p-2.5 dark:bg-gray-700 border-black dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:bg-blue-400 dark:focus:border-blue-500 hover:bg-black hover:bg-border-white hover:text-white transition-all duration-500 ${
            activeTab === "random" ? "active" : ""
          }`}
          onClick={() => handleTabChange("random")}
        >
          Random Data
        </button>
        <button
          className={`tab-button bg-gray-50 border styled text-lg rounded-lg block w-full p-2.5 dark:bg-gray-700 border-black dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:bg-blue-400 dark:focus:border-blue-500 hover:bg-black hover:bg-border-white hover:text-white transition-all duration-500 ${
            activeTab === "calculated" ? "active" : ""
          }`}
          onClick={() => handleTabChange("calculated")}
        >
          Calculated Data
        </button>
        <button
          className={`tab-button bg-gray-50 border styled text-lg rounded-lg block w-full p-2.5 dark:bg-gray-700 border-black dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:bg-blue-400 dark:focus:border-blue-500 hover:bg-black hover:bg-border-white hover:text-white transition-all duration-500 ${
            activeTab === "graphical" ? "active" : ""
          }`}
          onClick={() => handleTabChange("graphical")}
        >
          Graphical View
        </button>
        <button
          className={`tab-button bg-gray-50 border styled text-lg rounded-lg block w-full p-2.5 dark:bg-gray-700 border-black dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:bg-blue-400 dark:focus:border-blue-500 hover:bg-black hover:bg-border-white hover:text-white transition-all duration-500`}
          onClick={onClick}
        >
          Reset
        </button>
      </div>

      <div className="w-full ">
        {activeTab === "random" && <RandomDataTab randomData={randomData} />}
        {activeTab === "calculated" && (
          <CalculatedDataTab calculatedData={calculatedData} />
        )}
        {activeTab === "graphical" && (
          <GraphicalViewTab calculatedData={calculatedData} />
        )}
      </div>
    </div>
  );
};

export default SimulationMM1Priority;
