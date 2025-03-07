export default function dividir(num1,num2){
    if (num2 === 0) {
        throw new Error("Divisão por zero não é permitida.");
    }
    return (num1/num2);
}