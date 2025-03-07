export default function invertArr(arr){
    let arrReverse=[]
    arr.map((res)=>{
        arrReverse.unshift(res)
    })
    return arrReverse;
}