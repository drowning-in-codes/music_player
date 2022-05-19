const BASE_URL = "http://localhost:3000";
export default function Ajax({
    method = "GET",
    url,
    data = {}
}){
    return new Promise((resolve)=>{
        const xhr = new XMLHttpRequest();
        xhr.open(method,BASE_URL+url);
        xhr.onload = function ()
        {
            resolve(JSON.parse(xhr.response));
        };
        xhr.onerror = function (){
            if(xhr.status == 0)
            {

            }
            xhr.send(JSON.stringify(data))
        };
    });
}

export async function getBannerList(){
    const result = Ajax({
        url: `/homepage/block/page`,
    });
    return result;
}