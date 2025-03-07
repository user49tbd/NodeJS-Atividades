export default function genENumbers(N){
    let arr =[]
    for(let i=1;i<=(N*2);i++){
        if(i%2==0){
            arr.push(i)
        }
    }
    return arr
}