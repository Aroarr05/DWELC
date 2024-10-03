
let str = "zZaAbBcC!";
let res = nextChar(str);


function nextChar(str){
    let res = '';
    for(let i = 0; i < str.length; i++){
        let char = str[i];
        if (char == 'z') {
            res += 'a';
        }else if (char == 'Z'){
            res += 'A';
        }else if (char >= 'a' && char <= 'y' || char >= 'A' && char <= 'Y'){
            res += String.fromCharCode(char.charCodeAt(0)+1);
        }else{
            res += char;
        }
    }    
    return res;
}

console.log(res); 