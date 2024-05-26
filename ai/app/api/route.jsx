
export function GET(request){
console.log(request);
//returning response to client which be either json resp or just plain text
return new Response("Hello!")
}

