const geoJSONify = (geoJSON, validUsers) => {
  const userObj = createObj(validUsers);
  geoJSON["num_results"] = getCount(userObj);

  let results = [];

  for (let user in userObj) {
    results.push(addResults(userObj[user]));
  }

  geoJSON["results"] = results;

  return geoJSON;
};

const createObj = (validUsers) => {
  const userObj = {};
  for (let user of validUsers) {
    if (!userObj[user.user_id]) {
      userObj[user.user_id] = [user];
    } else {
      userObj[user.user_id].push(user);
    }
  }

  return userObj;
};

const getCount = (userObj) => {
  let count = 0;
  for (let val in userObj) count++;
  return count;
};

// input for addResults formatted as >>>
// [
//   {
//     user_id: '1',
//     user_name: 'Taylor Swift',
//     user_age: '27',
//     user_gender: 'f',
//     last_location: 'San Francisco',
//     lat: '37.774929',
//     long: '-122.419416'
//   },
//   {
//     user_id: '1',
//     user_name: 'Taylor Swift',
//     user_age: '27',
//     user_gender: 'f',
//     last_location: 'Oakland',
//     lat: '37.8044',
//     long: '-122.2711'
//   }
// ]
const addResults = (user) => {
  let userResult = {};
  userResult["type"] = "user";

  let locationHistory = { type: "FeatureCollection" };
  let features = [];

  for (let location of user) {
    let tempObj = {};
    tempObj["type"] = "Feature";
    tempObj["properties"] = { city: location.last_location };
    tempObj["geometry"] = {
      type: "Point",
      coordinates: [location.lat, location.long],
    };
    features.push(tempObj);
  }

  locationHistory["features"] = features;
  userResult["locationHistory"] = locationHistory;

  userResult["properties"] = {
    id: user[0].user_id,
    name: user[0].user_name,
    age: user[0].user_age,
    gender: user[0].user_gender,
  };

  console.log("User properties:");
  console.log(userResult["properties"]);

  console.log("user location history");
  console.log(userResult["locationHistory"]);

  return userResult;
};

module.exports = { geoJSONify };
