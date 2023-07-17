
import { User } from "../../types/User";

interface ChangeCityReq {
  userId: String ,
  cityId : String ,
  token : String ,
  name : String ,
  longitude : String ,
  latitude : String
}

export async function changeUserCity(changeCity :  ChangeCityReq): Promise<User> {
  const response = await fetch(`http://localhost:5000/api/weather/${changeCity.userId}?cityId=${changeCity.cityId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${changeCity.token}`
    },
    body: JSON.stringify({ name: changeCity.name, longitude: changeCity.longitude, latitude: changeCity.latitude }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch list');
  }

  const data: User = await response.json();
  return data;
}

