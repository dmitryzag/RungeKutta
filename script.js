
let action = document.querySelector("#action");
let output = document.querySelector("#output");

const rFun = (x,y) => {
    return (1 + x * y) + 0.7 * (x ** 2 + y);
};

const methodRungeCutte = (b,xi,y,n) => {
    let k1,k2,k3,k4;
    let dy;
    const h = Math.abs(b / (n - 1));

    let [xArray, yArray] = [[],[]];

    for(let i = 0; i < n; i++){
      xArray.push(xi);
      yArray.push(y);
        k1 = rFun(xi,y);
        k2 = rFun(xi + h / 2, y + (h / 2) * k1);
        k3 = rFun(xi + h / 2, y + (h / 2) * k2);
        k4 = rFun(xi + h, y + h * k3);

        dy = (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
        y = Number((y + dy).toFixed(6));
        xi = Number((h + xi).toFixed(6));
    }
    // console.log(xArray,yArray);
    console.log(h);
    return [xArray, yArray];
};

const methodAdams = (array, b, n) => {

  let dy;
  const h = Math.abs(b / (n - 1));
  let x = [...array[0].slice(0,4)];
  let y = [...array[1].slice(0,4)];

  for(let i = 0; i < n - 4; i++){
    let [f1, f2, f3, f4] = [[rFun(x[i+3], y[i+3])], [rFun(x[i+2], y[i+2])], [rFun(x[i+1], y[i+1])], [rFun(x[i],y[i])]];
    dy = (h / 24) * (55 * f1 - 59 * f2 + 37 * f3 - 9 * f4);
    y.push(dy + y[i+3]);
    x.push(x[i+3] + h);
  };
  return [x,y];
};

const dRgA = (array1,array2) => {
  let diff = [];
  for(let i = 0; i < array1.length; i++){
    diff[i] = Math.abs(array1[i] - array2[i]);
  }
  return diff;
};

let xI, yI;

action.addEventListener('click', () => {

    let funcInput = Number(document.querySelector("#fun").value);
    let nodeInput = Number(document.querySelector("#node").value);
    let isEmptyFun = document.querySelector("#fun").value === '';
    let isEmptyNode = document.querySelector("#node").value === '';



    let latestValues = [...methodRungeCutte(funcInput, 0, 0, nodeInput)];

    console.log(latestValues);
    


    if(funcInput <= 0 || nodeInput < 2 || isEmptyFun || isEmptyNode){
      alert("ОШИБКА!");
    } else{

      let mRG = [...methodRungeCutte(funcInput,0,0,nodeInput)];
      let fAd = methodAdams(mRG, funcInput, nodeInput);
      let [ , yI2] = fAd;
      console.log(fAd);
      let diff = dRgA(fAd[1], methodRungeCutte(funcInput, 0, 0, nodeInput)[1]);

      [xI,yI] = methodRungeCutte(funcInput, 0, 0, nodeInput);

      new Chartist.Line('.ct-chart', {
          labels: xI,
          series: [
            yI,yI2, diff
          ]
        }, {
          fullWidth: true,
          chartPadding: {
            right: 100
          },
          high: Math.max(yI) ,
          low: Math.min(yI),
          showArea: true,
          fullWidth: true,
          axisY: {
            onlyInteger: false,
            offset: 70,
          }
          
        });
    }



    // output.innerHTML = `Массив x = ${latestValues[0].slice(0,4)}<br>Массив y = ${latestValues[1].slice(0,4)}`;
      
});


