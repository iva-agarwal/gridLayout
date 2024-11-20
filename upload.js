const admin = require('firebase-admin');
const serviceAccount = require('./key.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
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

const jsonData ={
  data:[{
    componentData:{
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: ["Mon", "Tue", "Wed"] },
      series: [
        { name: "Data", type: "line", smooth: true, data: [20, 30, 40] }
      ],
      yAxis: { type: "value" }
    },
    coordinates:{w: 4, y: 0, h: 4, x: 0}
  },{
    componentData:{
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      color: [
          '#20477A', 
          '#1B3C64',
          '#265D84',
          '#3A729F',
          '#4176A3',
          '#4A84A7',
          '#A0C4D6', 
      ],
      series: [
        {
          name: 'Random Data',
          type: 'pie',
          radius: '50%', 
          data: [10.20,30,6,8,3,10],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    },
    coordinates:{ w: 4, y: 0, h: 4, x: 4},
  },
  {
    componentData:{
      tooltip: { trigger: "axis" },
      xAxis: { type: "category", data: ["Mon", "Tue", "Wed"] },
      series: [
        { name: "Data", type: "line", smooth: true, data: [20, 30, 40] }
      ],
      yAxis: { type: "value" }
    },
    coordinates:{w: 4, y: 0, h: 4, x: 8}
  
  },

]
}
async function uploadData() {
  try {
    await db.collection('components').doc('charts').set(jsonData);
    console.log("Data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading data: ", error);
  }
}

uploadData();
