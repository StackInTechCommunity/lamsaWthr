
import { User } from "../../types/User";

export async function fetchUser(userId : String ): Promise<User> {
    const response = await fetch(`http://localhost:5000/api/weather/${userId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch list');
    }
    
    const data: User = await response.json();
    return data;
  }