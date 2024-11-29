const admin = require("firebase-admin");
const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// const jsonData = {
//   components: {
//     componentData: [
//       {
//         tooltip: { trigger: "axis" },
//         xAxis: { type: "category", data: ["Mon", "Tue", "Wed"] },
//         series: [
//           { name: "Data", type: "line", smooth: true, data: [20, 30, 40] }
//         ],
//         yAxis: { type: "value" }
//       },
//       {
//         tooltip: {
//           trigger: 'item',
//           formatter: '{a} <br/>{b}: {c} ({d}%)',
//         },
//         legend: {
//           orient: 'vertical',
//           left: 'left',
//         },
//         color: [
//             '#20477A',
//             '#1B3C64',
//             '#265D84',
//             '#3A729F',
//             '#4176A3',
//             '#4A84A7',
//             '#A0C4D6',
//         ],
//         series: [
//           {
//             name: 'Random Data',
//             type: 'pie',
//             radius: '50%',
//             data: [10.20,30,6,8,3,10],
//             emphasis: {
//               itemStyle: {
//                 shadowBlur: 10,
//                 shadowOffsetX: 0,
//                 shadowColor: 'rgba(0, 0, 0, 0.5)',
//               },
//             },
//           },
//         ],
//       }
//     ],
//     coordinates: [
//       { w: 4, y: 0, h: 4, x: 0 },
//       { w: 4, y: 0, h: 4, x: 4 }
//     ]
//   }
// };

const jsonData = {
  data: [
    {
      componentData: {
        tooltip: { trigger: "axis" },
        xAxis: { type: "category", data: ["a", "b", "c","d", "e", "f"] },
        series: [
          { name: "Data", type: "line", smooth: true, data: [20, 30, 40,10,5,15] ,  itemStyle: { color: "#FF7F02" }},
        ],
        yAxis: { type: "value" },
      },
      coordinates: {
        desktop: { x: 0, y: 0, w: 6, h: 4 },
        mobile: { x: 2, y: 5, w: 3, h: 4 }
      }
    },
    {
      componentData: {
        tooltip: { trigger: "item" },
        series: [
          {
            name: "Sales Distribution",
            type: "pie",
            radius: ["50%", "70%"],
            data: [
              { value: 335, name: "Mon", itemStyle: { color: "#274C82" } },
              { value: 234, name: "Tue", itemStyle: { color: "#FF7F02" } },
              { value: 154, name: "Wed", itemStyle: { color: "#FF7F02" } },
              { value: 134, name: "Thu", itemStyle: { color: "#274C82" } },
            ],
          },
        ],
      }
      ,
      coordinates: {
        desktop: { x: 6, y: 0, w: 6, h: 4 },
        mobile: { x: 1, y: 0, w: 6, h: 4 }
      }    },
      {
        componentData: {
          tooltip: { trigger: "axis" },
          xAxis: { type: "category", data: ["Mon", "Tue", "Wed"] },
          series: [
            { name: "Data", type: "bar", smooth: true,  data: [150, 200, 250, 300, 350],
            itemStyle: { color: "#FF7F02" },},
          ],
          yAxis: { type: "value" },
        },
        coordinates: {
          desktop: { x: 0, y: 0, w: 6, h: 4 },
          mobile: { x: 2, y: 5, w: 3, h: 4 }
        }
      },

      {
        componentData: {
          tooltip: { trigger: "item" },
          radar: {
            indicator: [
              { name: "Sales", max: 100 },
              { name: "Marketing", max: 100 },
              { name: "Development", max: 100 },
              { name: "Customer Support", max: 100 },
              { name: "HR", max: 100 },
            ],
          },
          series: [
            {
              name: "Department Performance",
              type: "radar",
              data: [
                {
                  value: [60, 80, 70, 90, 65],
                  name: "2024",
                  itemStyle: { color: "#274C82" },
                },
              ],
            },
          ],
        }
        
        ,
        coordinates: {
          desktop: { x: 0, y: 0, w: 6, h: 4 },
          mobile: { x: 2, y: 5, w: 3, h: 4 }
        }
      },
  
  ],
};
async function uploadData() {
  try {
    await db.collection("components").doc("charts").set(jsonData);
    console.log("Data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading data: ", error);
  }
}

uploadData();
