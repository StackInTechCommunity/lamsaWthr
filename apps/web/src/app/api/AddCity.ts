
import { User } from "../../types/User";

interface AddCityReq {
  userId: String ,
  token : String ,
  name : String ,
  longitude : String ,
  latitude : String
}

export async function addUserCity(addCity :  AddCityReq): Promise<User> {
  const response = await fetch(`http://localhost:5000/api/weather/${addCity.userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${addCity.token}`
    },
    body: JSON.stringify({ name: addCity.name, longitude: addCity.longitude, latitude: addCity.latitude }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch list');
  }

  const data: User = await response.json();
  return data;
}

