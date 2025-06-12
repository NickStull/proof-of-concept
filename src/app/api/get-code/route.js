import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const code = cookieStore.get('scavenger_code')?.value;
  console.log('code1', code);
  
  if (code) {
    cookieStore.delete('scavenger_code');
    console.log('code', code);
    
    return Response.json({ code });
  }
  
  return Response.json({ code: null });
}
