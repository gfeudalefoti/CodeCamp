
let CurrencyToValue = [
    ["PENNY", 0.01], 
    ["NICKEL", 0.05], 
    ["DIME", 0.1], 
    ["QUARTER", 0.25], 
    ["ONE", 1], 
    ["FIVE", 5], 
    ["TEN", 10], 
    ["TWENTY", 20], 
    ["ONE HUNDRED", 100]
];


function calculateValueInCashRegister(cid){
    let cidValue = 0;
    cid.forEach((elem) => cidValue += elem[1]);
    return cidValue;
}

function calculateChange(changeValue, cid){
    let isReturned = false;
    let cidRev = cid.reverse();

    let change = new Array();
    console.log("change: " + change);
    cidRev.forEach((elem) => 
            {
                let currencyIndex = CurrencyToValue.findIndex(arr => arr.includes(elem[0]));
                let currencyUnit = CurrencyToValue[currencyIndex][1];
                console.log("currencyUnit: " + currencyUnit);
                let desiredUnits = Math.floor(changeValue / currencyUnit);
                console.log("desiredUnits: " + desiredUnits);
                if(desiredUnits != 0 && elem[1] !== 0)
                {
                    let amountToTakeFromCash = 0;
                    if(desiredUnits * currencyUnit <= elem[1]){
                        amountToTakeFromCash = desiredUnits * currencyUnit;
                    }
                    else
                    {
                        amountToTakeFromCash = elem[1]
                    }
                    console.log("amountToTakeFromCash: " + amountToTakeFromCash);
                    changeValue -= amountToTakeFromCash;
                    changeValue = changeValue.toFixed(2);
                    console.log("changeValue: " + changeValue);

                    change.push([elem[0],amountToTakeFromCash]);
                    console.log("change after push: " + change);
                }
        }
    );

    console.log("Final changeValue: " + changeValue);
    if(parseFloat(changeValue) === 0.00){
        console.log("I enter here");
        isReturned = true;
    }

    console.log("isReturned: " + isReturned);

    return{
        IsReturned: isReturned,
        Change: change
    }
}

function checkCashRegister(price, cash, cid){
    let status = null;
    let changeValue = cash - price;
    console.log('changeValue: ' + changeValue);
    if(changeValue < 0){
        return {status: "INVALID INPUT", change: []};
    }
    else{
      let valueInCashRegister = calculateValueInCashRegister(cid);  
      //console.log('valueInCashRegister: ' + valueInCashRegister);
      if(valueInCashRegister < changeValue){
          return {status: "INSUFFICIENT_FUNDS", change: []}
      }
      else if(valueInCashRegister === changeValue){
          return {status: "CLOSED", change: cid}
      }
      else if(valueInCashRegister > changeValue){
          let changeRet = calculateChange(changeValue, cid);
          if(changeRet.IsReturned){
            return {status: "OPEN", change: changeRet.Change}
          }
          else{
            return {status: "INSUFFICIENT_FUNDS", change: []}
          }
      }
    }  
}

//console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))
//console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))
//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))
//console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]))
console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]));

