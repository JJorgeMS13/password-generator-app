const spanShowPassword = document.getElementById('showPassword');
const btnGenerate =  document.getElementById('generate');
const range = document.getElementById('range');
const numRangElement = document.getElementById('numRange');
const inputcheckbox = document.querySelectorAll('input[type="checkbox"]');
const elementBar = document.querySelectorAll('.bar');
const elementTextSecurity = document.getElementById('textSecurity');
const elementbtnCopy = document.getElementById('btnCopy');

function changeColorBar (element) {
    const value = element.value;
    /* Se agrega el valor que tiene la barra al span */
    numRangElement.textContent = value;
    const porcentage = (value - element.min) / (element.max - element.min) * 100;
    element.style.background = `linear-gradient(to right, #A4FFAF ${porcentage}%, #18171F ${porcentage}%)`;
}
function getSetting() {
    const obj = Array.from(inputcheckbox).reduce((acc,checkBox) => {
        if (checkBox.checked === true) {
            acc[checkBox.id] = checkBox.checked;
        }
        return acc;
    }, { lengthCharacter: range.value, }); 
    return obj;
}
function changeSegurityPass() {
    const divColor = { 
        '1': '#F64A4A',
        '2': '#FB7C58',
        '3': '#F8CD65',
        '4': '#A4FFAF',
        '5': '#18171F'
    };
    const divText = { 
        '1': 'Took Weak!',
        '2': 'Weak',
        '3': 'Medium',
        '4': 'Strong',
        '5': ''
    };    
    const objCheck = getSetting();
    const numSelected = Object.keys(objCheck).length - 1;
    elementTextSecurity.textContent = numSelected ? divText[numSelected]: divText[5];

    for (let index = 0; index < elementBar.length; index++) { 
        elementBar[index].style.backgroundColor = index < numSelected ? divColor[numSelected]: divColor[5];
    }
}
function upperCaseLetter() {
    const codigoAscii = Math.floor(Math.random () * (90 - 65 + 1)) + 65;
    return String.fromCharCode(codigoAscii);
}
function lowerCaseLetter() {
    const codigoAscii = Math.floor(Math.random () *  (122 - 97 + 1)) + 97;
    return String.fromCharCode(codigoAscii);
}
function getSymbol() {

    const rangeAscci = [
        { min: 33, max: 47 },  // ! " # $ % & ' ( ) * + , - . /
        { min: 58, max: 64 },  // : ; < = > ? @
        { min: 91, max: 96 },  // [ \ ] ^ _ `
        { min: 123, max: 126 } // { | } ~
    ];
    
    const rangeSelected = rangeAscci[Math.floor(Math.random() * rangeAscci.length)];

    const codigAscii = Math.floor(Math.random() * (rangeSelected.max - rangeSelected.min + 1)) + rangeSelected.min;

    return String.fromCharCode(codigAscii);
}
function combineArrayToString(maxCharacter, ...arrays) {
    let password = '';
    let counterCharacter = 1;
    
    for (const array of arrays) {
        for (const element of array) {         
            password += element;
            if (counterCharacter >= maxCharacter) {
                return password;
            }
            counterCharacter += 1;  
        }
    }
}
function generatePassword(params) {
    const numCharacter = params['lengthCharacter'];
    const passwordArray = [];
    const numcheckBoxChosen = Object.keys(params).length - 1;
    let numIteration = 0;

    numcheckBoxChosen !== 0 ? numIteration = Math.ceil(numCharacter / numcheckBoxChosen) : numIteration = 0;
    
    if(numIteration === 0) return false;
    for (let index = 0; index < numIteration; index++) {
        if (params['uppercaseLetter']) {
            passwordArray.push(upperCaseLetter());
        }
        if (params['lowercaseLetter']) {
            passwordArray.push(lowerCaseLetter());   
        }
        if (params['numbers']) {
            passwordArray.push(Math.floor(Math.random() * 9) + 1);   
        }
        if (params['symbols']) {
            passwordArray.push(getSymbol()); 
        }      
    }
    
    let pass = '';
    if (params['uppercaseLetter'] || params['lowercaseLetter'] || params['numbers'] || params['symbols']) {
        pass = combineArrayToString(numCharacter, passwordArray);
    }
    return pass;
}
function handlerGenerate(){
    const objSettings = getSetting();
    const passworGenerada = generatePassword(objSettings);  

    if (passworGenerada) {
        spanShowPassword.classList.remove('error');
        spanShowPassword.textContent = passworGenerada; 
    }else {
        spanShowPassword.classList.add('error');
        spanShowPassword.textContent =  "Error: Debe elejir al menos 1.";
    }
}
function  handlerCheckBox(e) {
    e.addEventListener('click', changeSegurityPass);
}

btnGenerate.addEventListener('click', handlerGenerate);
inputcheckbox.forEach( checkBox => {
    handlerCheckBox(checkBox);
});
elementbtnCopy.addEventListener('click', function () {
    const textCopy = spanShowPassword.textContent;
    navigator.clipboard.writeText(textCopy).then(function () {
        alert('Texto copiado!');
    }).catch(function () {
        alert('Error al copiar texto.');
    })
    
});
changeColorBar(range);