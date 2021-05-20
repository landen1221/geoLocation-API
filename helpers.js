// for(let user of user) {
//     if not checkAge or not checkDistance or not checkGender --> continue
//     validUser.push()
// }

const checkUsers = (
  gender,
  dist = 0,
  origin = 0,
  min_age = 0,
  max_age = 125,
  users
) => {
  const validUsers = [];
  origin = origin ? origin.split(",") : false;

  for (let user of users) {
    if (min_age || max_age) {
      if (!checkAge(user, min_age, max_age)) continue;
    }

    if (!checkGender(user, gender)) continue;
    if (origin.length && dist > 0) {
      if (dist < checkDistance(origin[0], origin[1], user.lat, user.long)) {
        continue;
      }
    }
    validUsers.push(user);
  }

  return validUsers;
};

const checkAge = (user, min_age, max_age) => {
  let userAge = user.user_age;
  if (userAge >= min_age && userAge <= max_age) {
    return true;
  }
  return false;
};

const checkGender = (user, desiredGender) => {
  if (!desiredGender) return true;
  if (user.user_gender == desiredGender) return true;
  return false;
};

function checkDistance(lat1, lon1, lat2, lon2) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
}

function createMeta(gender, dist, origin, min_age, max_age) {
  return {
    metadata: {
      path: "/users",
      query: {
        gender,
        dist,
        origin,
        min_age,
        max_age,
      },
    },
  };
}

let users = [
  {
    user_id: "1",
    user_name: "Taylor Swift",
    user_age: "27",
    user_gender: "f",
    last_location: "San Francisco",
    lat: "37.774929",
    long: "-122.419416",
  },
  {
    user_id: "1",
    user_name: "Taylor Swift",
    user_age: "27",
    user_gender: "f",
    last_location: "San Francisco",
    lat: "37.774929",
    long: "-122.419416",
  },
  {
    user_id: "1",
    user_name: "Taylor Swift",
    user_age: "55",
    user_gender: "f",
    last_location: "San Francisco",
    lat: "37.774929",
    long: "-122.419416",
  },
];

module.exports = { checkUsers, createMeta };
