import { NextResponse } from 'next/server'


export function middleware (request) {
    // next() frowards incoming request to actual destination
    console.log(request);
    return NextResponse.next()
}

export const config ={
    matcher:"/news"
}
