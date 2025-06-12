import { cookies } from 'next/headers';

// Mapping of codes to locations
const locationMap = {
  'hellopeterrrrbejciwnbehcndehehwjdixhebwjdicuebwbwixidjwnwbdhxusiwidofbdbwjqjjwidixopxpxjdlemwnbbccxzaaqert': { locationId: 1, name: 'Rainbow Location' },
  'hellopeterrrrbejciwnbehcndehehwjdixhebwjdicuebwbwixidjwnwbdhxusiwidofbdbwjqjjwidixopxpxjdlemwnbbccxzaaqern': { locationId: 2, name: 'Bamboo Location' }
};

export async function GET() {
  const cookieStore = await cookies();
  const code = cookieStore.get('scavenger_code')?.value;
  console.log('code1', code);
  
  if (code) {
    cookieStore.delete('scavenger_code');
    console.log('code', code);
    
    // Look up the location based on the code
    const location = locationMap[code];
    
    if (location) {
      return Response.json({ 
        locationId: location.locationId,
        locationName: location.name,
        found: true 
      });
    } else {
      // Code exists but no matching location
      return Response.json({ 
        locationId: null,
        locationName: null,
        found: false 
      });
    }
  }
  
  return Response.json({ 
    locationId: null,
    locationName: null,
    found: false 
  });
}
