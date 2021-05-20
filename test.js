const csv = require("csv-parser");
const fs = require("fs");
const Papa = require("papaparse");

// /users?gender=f&dist=100&origin=37.774929,-122.419416&min_age=21&max_age=29

(async () => {
  let users = [];
  await fs
    .createReadStream("users.csv")
    .pipe(csv({}))
    .on("data", (data) => users.push(data))
    .on("end", () => {
      // call whatever function here
      handleUsers(users);
    });
})();

function handleUsers(users) {
  console.log(users);
}

// Data store = in-memory cache

// {
//     "metadata": {
//       "path": "/users",
//       "query": {
//         "gender": "f",
//         "dist": 100,
//         "origin": "37.774929,-122.419416",
//         "min_age": 21,
//         "max_age": 29
//       }
//     },
//     "num_results": 1,
//     "results": [
//       {
//         "type": "user",
//         "locationHistory": {
//           "type": "FeatureCollection",
//           "features": [
//             {
//               "type": "Feature",
//               "properties": {
//                 "city": "Oakland"
//               },
//               "geometry": {
//                 "type": "Point",
//                 "coordinates": [-122.08007812499999, 37.78808138412046]
//               }
//             },
//           ]
//         },
//         "properties": {
//           "id": 1,
//           "name": "Taylor Swift",
//           "age": 27,
//           "gender": "f"
//         }
//       }
//     ]
//   }
