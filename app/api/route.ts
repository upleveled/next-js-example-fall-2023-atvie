import { NextResponse } from 'next/server';

type NextExampleApiResponse = {
  animals: string;
};

// Export functions for each method to implement
export function GET(): NextResponse<NextExampleApiResponse> {
  // this is server code
  // if the process is async the function should be async
  // you can perform other request (for example. you want to communicate with stripe using your API key)

  return NextResponse.json({
    animals: '/api/animals',
  });
}
